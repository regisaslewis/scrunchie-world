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

    # products_owned = db.relationship("Product", back_populates="user")

    def __repr__(self):
        return f"User# {self.id}: {self.username}"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    condition = db.Column(db.Integer)
    is_new = db.Column(db.Boolean, default=False, nullable=False)

    # owners = db.relationship("User", back_populates="products")

    def __repr__(self):
        return f"Product# {self.id}: {self.name}"