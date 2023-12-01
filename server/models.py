from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import emoji

from config import db, metadata

product_owners = db.Table(
    "products_owners",
    metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ("-group.members", "-products", "-reviews",)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    age = db.Column(db.Integer)
    hairstyle = db.Column(db.String)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))

    group = db.relationship("Group", back_populates="members")
    products = db.relationship("Product", secondary=product_owners, back_populates="owners")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"User# {self.id}: {self.username}"

class Product(db.Model, SerializerMixin):
    __tablename__ = "products"
    serialize_rules = ("-brand.products", "-owners", "-reviews",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    cost = db.Column(db.Integer)
    brand_id = db.Column(db.Integer, db.ForeignKey("brands.id"))

    brand = db.relationship("Brand", back_populates="products")
    owners = db.relationship("User", secondary=product_owners, back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete-orphan")


    def __repr__(self):
        return f"Product# {self.id}: {self.name}"
    
class Group(db.Model, SerializerMixin):
    __tablename__ = "groups"

    serialize_rules = ("-members.group",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    members = db.relationship("User", back_populates="group", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Group #{self.id}: {self.name} | Members: {[n.username for n in self.members] if self.members else 'No current members'}"
    
class Brand(db.Model, SerializerMixin):
    __tablename__ = "brands"

    serialize_rules = ("-products.brand",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    products = db.relationship("Product", back_populates="brand", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Brand #{self.id}: {self.name} | Products: {[n.name for n in self.products] if self.products else 'None'}"


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    serialize_rules = ("-user.reviews", "-product.reviews",)

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))

    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def __repr__(self):
        return f"{self.user.username}'s Review of {self.product.name}: {self.rating * (emoji.emojize(':star:'))} {self.comment}"
    
    