#!/usr/bin/env python3
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Resource
import copy

from config import app, db, api
from models import User, Product, Group, Brand, Review

def delete_item(tag, id):
    class_name = copy.copy(tag.__class__.__name__)
    db.session.delete(tag)
    db.session.commit()
    return make_response({"message": f"{class_name} #{id} deleted."})

def post_item(item):
    db.session.add(item)
    db.session.commit()
    return make_response(jsonify(item.to_dict(), 201))

def patch_item(item):
        for attr in request.get_json():
            setattr(item, attr, request.get_json().get(attr))
        db.session.add(item)
        db.session.commit()
        return make_response(item.to_dict(), 200)

def get_group(group):
    items = group.query.all()
    return make_response(jsonify([n.to_dict() for n in items]), 200)

def get_item(item):
    return make_response(jsonify(item.to_dict()), 200)

def data(key):
    return request.get_json()[key]

@app.route('/')
def index():
    return '<h1>Scrunchie World Server</h1>'
    
@app.route("/check_session", methods=["GET"])
def check_session():
    if request.method == "GET":
        user = User.query.filter(User.id == session.get("user_id")).first()
        if user:
            return user.to_dict()
        else:
            return {"message": "401: Not Logged in"}, 401

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = data("username")
        password_hash = data("password")

        if username and password_hash:
            user = User.query.filter_by(username=username).first()
            if user.authenticate(password_hash):
                session["user_id"] = user.id
                return jsonify(user.to_dict())
            if user is None:
                return jsonify({"Error": "Not a valid user."}), 401

@app.route("/logout", methods=["DELETE"])
def logout():
    if request.method == "DELETE":
        session["user_id"] = None
        return {"message": "Not Logged In"}, 204

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        return get_group(User)
    elif request.method == "POST":
        new_user = User(
            username = data("username"),
            age = data("age"),
            hairstyle = data("hairstyle"),
            password_hash = data("password")
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return make_response(jsonify(new_user.to_dict(), 201))
    return make_response(jsonify({"text": "Method Not Allowed"}), 405)

@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
def show_user(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == "GET":
            return get_item(user)
        elif request.method == "PATCH":
            return patch_item(user)
        elif request.method == "DELETE":
            return delete_item(user, id)
    else:
        return make_response(jsonify({"Error": f"User #{id} not found."}), 404)
    
@app.route("/allproducts", methods=["GET", "POST"])
def allproducts():
    if request.method == "GET":
        return get_group(Product)
    if request.method == "POST":
        new_product = Product(
            name = data("name"),
            cost = data("cost"),
            brand_id = data("brand_id"),
            image = data("image")
        )
        return post_item(new_product)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/allproducts/<int:id>", methods=["GET", "PATCH"])
def show_all_product(id):
    product = Product.query.filter(Product.id == id).first()
    if product:
        if request.method == "GET":
            return get_item(product)
        elif request.method == "PATCH":
            return patch_item(product)
        return make_response(product.to_dict(), 200)
    else:
        return make_response(jsonify({"Error": f"Product #{id} not found."}), 404,)
        
@app.route("/products", methods=["GET"])
def product():
    if request.method == "GET":
        return get_group(Product)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/products/<int:id>", methods=["GET", "POST", "DELETE"])
def show_product(id):
    product = Product.query.filter(Product.id == id).first()
    if product:
        if request.method == "GET":
            return get_item(product)
        elif request.method == "POST":
            product.owners.append(User.query.filter_by(id = session["user_id"]).first())
            db.session.add(product)
            db.session.commit()
        elif request.method == "DELETE":
            product.owners.remove(User.query.filter_by(id = session["user_id"]).first())
            db.session.add(product)
            db.session.commit()
        return make_response(product.to_dict(), 200)
    else:
        return make_response(jsonify({"Error": f"Product #{id} not found."}), 404,)
        
@app.route("/groups", methods=["GET", "POST"])
def groups():
    if request.method == "GET":
        return get_group(Group)
    if request.method == "POST":
        new_group = Group(
            name = data("name"),
            description = data("description")
        )
        return post_item(new_group)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/groups/<int:id>", methods=["GET"])
def show_group(id):
    group = Group.query.filter(Group.id == id).first()
    if group:
        if request.method == "GET":
            return get_item(group)
    else:
        return make_response(jsonify({"Error": f"Group #{id} not found."}), 404,)

@app.route("/brands", methods=["GET", "POST"])
def brands():
    if request.method == "GET":
        return get_group(Brand)
    if request.method == "POST":
        new_brand = Brand(
            name = data("name"),
            description = data("description")
        )
        return post_item(new_brand)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/brands/<int:id>", methods=["GET"])
def show_brand(id):
    brand = Brand.query.filter(Brand.id == id).first()
    if brand:
        if request.method == "GET":
            return get_item(brand)
    else:
        return make_response(jsonify({"Error": f"Brand #{id} not found."}), 404)
        
@app.route("/reviews", methods=["GET", "POST"])
def reviews():
    if request.method == "GET":
        return get_group(Review)
    elif request.method == "POST":
        new_review = Review(
            rating = data("rating"),
            comment = data("comment"),
            user_id = data("user_id"),
            product_id = data("product_id"),        
        )
        return post_item(new_review)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/reviews/<int:id>", methods=["GET", "PATCH", "DELETE"])
def show_review(id):
    review = Review.query.filter(Review.id == id).first()
    if review:
        if request.method == "GET":
                return get_item(review)
        elif request.method == "PATCH":
            return patch_item(review)
        elif request.method == "DELETE":
            return delete_item(review, id)
    else:
        return make_response(jsonify({"Error": f"Review #{id} not found."}), 404)

# @app.route("/five_star_reviews", methods=["GET"])
# def five_stars():
#     reviews = Review.query.all()
#     if request.method == "GET":
#         return make_response(jsonify([n.to_dict() for n in reviews if n.rating == 5]))

# @app.route("/most_reviewed", methods=["GET"])
# def get_most_reviewed():
#     if request.method == "GET":
#         items = Product.query.all()
#         def sort_by_review_count(e):
#             return len(e.reviews)
#         items.sort(key=sort_by_review_count)

#         return make_response({"most reviewed": items[-1].name}, 200)
    
# @app.route("/search_product/<product_name>", methods=["GET"])
# def search_prod(product_name):
#     if request.method == "GET":
#         items = Product.query.all()

#         return make_response(jsonify([n.to_dict() for n in items if product_name.lower() in n.name.lower()]))

if __name__ == '__main__':
    app.run(port=5555, debug=True)

