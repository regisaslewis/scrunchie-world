#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Product, Group, Brand, Review


# Views go here!

@app.route('/')
def index():
    return '<h1>Scrunchie World Server</h1>'

@app.route("/users", methods=["GET"])
def users():
    if request.method == "GET":
        users = User.query.all()

        return make_response(jsonify([n.to_dict() for n in users]), 200,)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/users/<int:id>", methods=["GET"])
def show_user(id):
    if request.method == "GET":
        user = User.query.filter(User.id == id).first()
        if user:
            return make_response(jsonify(user.to_dict()), 200,)
        else:
            return make_response(jsonify({"Error": f"User #{id} not found."}), 404,)
        
@app.route("/products", methods=["GET"])
def product():
    if request.method == "GET":
        products = Product.query.all()

        return make_response(jsonify([n.to_dict() for n in products]), 200,)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/products/<int:id>", methods=["GET"])
def show_product(id):
    if request.method == "GET":
        product = Product.query.filter(Product.id == id).first()
        if product:
            return make_response(jsonify(product.to_dict()), 200,)
        else:
            return make_response(jsonify({"Error": f"Product #{id} not found."}), 404,)
        
@app.route("/groups", methods=["GET"])
def groups():
    if request.method == "GET":
        groups = Group.query.all()

        return make_response(jsonify([n.to_dict() for n in groups]), 200,)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/groups/<int:id>", methods=["GET"])
def show_group(id):
    if request.method == "GET":
        group = Group.query.filter(Group.id == id).first()
        if group:
            return make_response(jsonify(group.to_dict()), 200,)
        else:
            return make_response(jsonify({"Error": f"Group #{id} not found."}), 404,)

@app.route("/brands", methods=["GET"])
def brands():
    if request.method == "GET":
        brands = Brand.query.all()

        return make_response(jsonify([n.to_dict() for n in brands]), 200,)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/brands/<int:id>", methods=["GET"])
def show_brand(id):
    if request.method == "GET":
        brand = Brand.query.filter(Brand.id == id).first()
        if brand:
            return make_response(jsonify(brand.to_dict()), 200,)
        else:
            return make_response(jsonify({"Error": f"Brand #{id} not found."}), 404)
        
@app.route("/reviews", methods=["GET", "POST"])
def reviews():
    if request.method == "GET":
        reviews = Review.query.all()

        return make_response(jsonify([n.to_dict() for n in reviews]), 200)
    elif request.method == "POST":
        new_review = Review(
            rating = request.form.get("rating"),
            comment = request.form.get("comment"),
            user_id = request.form.get("user_id"),
            product_id = request.form.get("product_id"),        
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)

@app.route("/reviews/<int:id>", methods=["GET", "PATCH", "DELETE"])
def show_review(id):
    review = Review.query.filter(Review.id == id).first()
    if review:
        if request.method == "GET":
                return make_response(jsonify(review.to_dict()), 200,)
        elif request.method == "PATCH":
            for attr in request.form:
                setattr(review, attr, request.form.get(attr))
            db.session.add(review)
            db.session.commit()
            return make_response(review.to_dict(), 200) 
        elif request.method == "DELETE":
            db.session.delete(review)
            db.session.commit()
            return make_response({"message": f"Review #{id} deleted."}, 200)
    else:
        return make_response(jsonify({"Error": f"Review #{id} not found."}), 404)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

