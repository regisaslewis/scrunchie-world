#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Product, Review, Group, Brand, product_owners

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting old info...")
        db.session.query(product_owners).delete()
        db.session.commit()
        Group.query.delete()
        Brand.query.delete()
        User.query.delete()
        Product.query.delete()
        Review.query.delete()

        print("Starting seed...")
        all_business = Group(name="All Business", description="Function is everything.")
        chic_cheeky = Group(name="Chic and Cheeky", description="Stylish but playful.")
        go_squad = Group(name="The Go Squad", description="On the move.")
        fans = Group(name="Just Admiring", description="Afficiandos from afar.")
        groups = [all_business, chic_cheeky, go_squad, fans]

        palace = Brand(name="The Palace", description="Elegance in form.")
        retro = Brand(name="Vintagity", description="Remember when...")
        astro = Brand(name="Zodiac", description="Guided by the stars.")
        active = Brand(name="Momentum", description="Stopping is death.")
        brands =[palace, retro, astro, active]

        ted = User(username="Ted", age=45, hairstyle="wavy, long", group=go_squad)
        marla = User(username="Marla", age=33, hairstyle="straight, mid-length", group=all_business)
        frannie = User(username="Frannie", age=24, hairstyle="curly, short", group=chic_cheeky)
        debra = User(username="Debra", age=35, hairstyle="bald", group=fans)
        users = [ted, marla, frannie, debra]

        red_deluxe = Product(name="Red Deluxe", cost=3, brand=palace, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcA81AbRZncLsmKmLGvNFmNMhKEQ6a-rowrg&usqp=CAU")
        unbreakable = Product(name="Unbreakable", cost=5, brand=astro, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4oajaoKRjcAQaIa5gmdf0W9jDAtLKwqg0Jw&usqp=CAU")
        old_reliable = Product(name="Old Reliable", cost=1, brand=retro, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcH_fF91sTD3RmAoLVMdI4XE53NJ-Qfv3mA&usqp=CAU")
        gorilla_grip = Product(name="Gorilla Grip", cost=4, brand=active, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYJw4TszVUzrmW4E607pLY34fU_z9u9dLlw&usqp=CAU")
        madame = Product(name="Madame Elastique", cost=5, brand=palace, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGycaamWdpMF90rmaiQA9y_7gtQk-5Rq_cA&usqp=CAU")
        products = [red_deluxe, unbreakable, old_reliable, gorilla_grip, madame]

        ted.products.append(old_reliable)
        ted.products.append(gorilla_grip)
        unbreakable.owners.append(marla)
        old_reliable.owners.append(debra)
        frannie.products.append(old_reliable)
        frannie.products.append(unbreakable)
        red_deluxe.owners.append(frannie)
        marla.products.append(gorilla_grip)

        r1 = Review(id=1, user=ted, product=old_reliable, rating=5, comment="Always there when I need it.")
        r2 = Review(id=2, user=ted, product=gorilla_grip, rating=4, comment="Not a strand loose by the day's end.  Causes mild headache.")
        r3 = Review(id=3, product=unbreakable, user=frannie, rating=1, comment="Exploded in my hydraulic press, not 'unbreakable'.")
        r4 = Review(id=4, product=old_reliable, user=debra, rating=3, comment="I lost mine.")
        reviews = [r1, r2, r3, r4]
        r5 = Review(id=5, product=red_deluxe, user=frannie, rating=2, comment="A little too red for my tastes.")
        r6 = Review(id=6, product=gorilla_grip, user=marla, rating=3, comment="AVERAGE ACROSS THE BOARD")

        db.session.add_all(groups)
        db.session.add_all(brands)
        db.session.add_all(users)
        db.session.add_all(products)
        db.session.add_all(reviews)

        db.session.commit()
        print("Seeding Complete.")
