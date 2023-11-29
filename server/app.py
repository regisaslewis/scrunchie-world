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
    return '<h1>Project Server</h1>'

@app.route("/users", methods=["GET"])
def users():
    if request.method == "GET":
        users = User.query.all()

        return make_response(jsonify([n.to_dict() for n in users]), 200,)
    return make_response(jsonify({"text": "Method Not Allowed"}), 405,)



if __name__ == '__main__':
    app.run(port=5555, debug=True)

