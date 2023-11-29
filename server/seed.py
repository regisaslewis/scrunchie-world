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

        ted = User(username="Ted", age=45, hairstyle="wavy, long", group=go_squad)
        marla = User(username="Marla", age=33, hairstyle="straight, mid-length", group=all_business)
        frannie = User(username="Frannie", age=24, hairstyle="curly, short", group=chic_cheeky)
        debra = User(username="Debra", age=35, hairstyle="bald", group=fans)
        users = [ted, marla, frannie, debra]

        red_deluxe = Product(name="Red Deluxe", condition=3, is_new=False, brand=palace)
        unbreakable = Product(name="Unbreakable", condition=5, is_new=True, brand=astro)
        old_reliable = Product(name="Old Reliable", condition=1, is_new=False, brand=retro)
        gorrilla_grip = Product(name="Gorrilla Grip", condition=4, is_new=False, brand=active)
        products = [red_deluxe, unbreakable, old_reliable, gorrilla_grip]

        db.session.add_all(groups)
        db.session.add_all(brands)
        db.session.add_all(users)
        db.session.add_all(products)

        db.session.commit()
        print("Seeding Complete.")
