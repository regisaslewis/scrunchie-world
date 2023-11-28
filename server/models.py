from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer)
    hairstyle = db.Column(db.String)

    def __repr__(self):
        return f"User# {self.id}: {self.username}"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    condition = db.Column(db.Integer)
    is_new = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"Product# {self.id}: {self.name}"
    
class Group(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    description = db.Column(db.String)

    members = []

    def __repr__(self):
        return f"Group #{self.id}: {self.name} | {('Members: ', self.members) if self.members else 'No current members'}"
    
class Brand(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    description = db.Column(db.String)

    products = []

    def __repr__(self):
        return f"Brand #{self.id}: {self.name}{(' | Products: ', self.products) if self.products else ''}"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment = db.Column(db.String)