#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Product, Review, Group, Brand

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting old info...")
        Review.query.delete()
        Group.query.delete()
        Brand.query.delete()
        User.query.delete()
        Product.query.delete()

        print("Starting seed...")
        # Seed code goes here!
        all_business = Group(name="All Business", description="Function is everything.")
        chic_cheeky = Group(name="Chic and Cheeky", description="Stylish but playful.")
        go_squad = Group(name="The Go Squad", description="On the move.")
        fans = Group(name="Just Admiring", description="Afficiandos from afar.")
        groups = [all_business, chic_cheeky, go_squad, fans]

        palace = Brand(name="The Palace", description="Elegance in form.")
        retro = Brand(name="Vintagity", description="Remember when...")
        astro = Brand(name="Zodiac", description="Guided by the stars.")
        active = Brand(name="EnMotion", description="Stopping is death.")
        brands =[palace, retro, astro, active]

        ted = User(username="Ted", age=45, hairstyle="wavy, long", group_id=3)
        marla = User(username="Marla", age=33, hairstyle="straight, mid-length", group_id=1)
        frannie = User(username="Frannie", age=24, hairstyle="curly, short", group_id=2)
        debra = User(username="Debra", age=35, hairstyle="bald", group_id=4)
        users = [ted, marla, frannie, debra]

        red_deluxe = Product(name="Red Deluxe", condition=3, is_new=False, brand_id=1)
        unbreakable = Product(name="Unbreakable", condition=5, is_new=True, brand_id=3)
        old_reliable = Product(name="Old Reliable", condition=1, is_new=False, brand_id=2)
        gorrilla_grip = Product(name="Gorrilla Grip", condition=4, is_new=False, brand_id=4)
        products = [red_deluxe, unbreakable, old_reliable, gorrilla_grip]

        db.session.add_all(groups)
        db.session.add_all(brands)
        db.session.add_all(users)
        db.session.add_all(products)

        db.session.commit()
        print("Seeding Complete.")
