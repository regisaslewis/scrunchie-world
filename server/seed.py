#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Product

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Starting seed...")
        # Seed code goes here!
        ted = User(username="Ted", age=45, hairstyle="wavy, long")
        marla = User(username="Marla", age=33, hairstyle="straight, mid-length")
        frannie = User(username="Frannie", age=24, hairstyle="curly, short")
        users = [ted, marla, frannie]

        red_rover = Product(name="Red Rover", condition=3, is_new=False)
        new_unbreakable = Product(name="Unbreakable", condition=5, is_new=True)
        old_reliable = Product(name="Old Reliable", condition=1, is_new=False)
        products = [red_rover, new_unbreakable, old_reliable]

        db.session.add_all(users)
        db.session.add_all(products)

        db.session.commit()
        print("Seeding Complete.")
