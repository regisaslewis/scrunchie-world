#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
import copy

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Product, Group, Brand, Review


# Views go here!

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
        for attr in request.form:
            setattr(item, attr, request.form.get(attr))
        db.session.add(item)
        db.session.commit()
        return make_response(item.to_dict(), 200)

def get_group(group):
    items = group.query.all()
    return make_response(jsonify([n.to_dict() for n in items]), 200)

def get_item(item):
    return make_response(jsonify(item.to_dict()), 200)


@app.route('/')
def index():
    return '<h1>Scrunchie World Server</h1>'

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        return get_group(User)
    elif request.method == "POST":
        new_user = User(
            username = request.form.get("username"),
            age = request.form.get("age"),
            hairstyle = request.form.get("hairstyle"),
            group_id = request.form.get("group_id")
        )
        return post_item(new_user)
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
        
@app.route("/products", methods=["GET", "POST"])
def product():
    if request.method == "GET":
        return get_group(Product)
    if request.method == "POST":
        new_product = Product(
            name = request.form.get("name"),
            cost = request.form.get("cost"),
            brand_id = request.form.get("brand_id")
        )
        return post_item(new_product)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/products/<int:id>", methods=["GET"])
def show_product(id):
    product = Product.query.filter(Product.id == id).first()
    if product:
        if request.method == "GET":
            return get_item(product)
    else:
        return make_response(jsonify({"Error": f"Product #{id} not found."}), 404,)
        
@app.route("/groups", methods=["GET", "POST"])
def groups():
    if request.method == "GET":
        return get_group(Group)
    if request.method == "POST":
        new_group = Group(
            name = request.form.get("name"),
            description = request.form.get("description")
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
            name = request.form.get("name"),
            description = request.form.get("description")
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
            rating = request.form.get("rating"),
            comment = request.form.get("comment"),
            user_id = request.form.get("user_id"),
            product_id = request.form.get("product_id"),        
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)

