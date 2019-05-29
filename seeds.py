from pony.orm import db_session
from app import db
from models.Category import Category
from models.Listing import Listing
from models.User import User, UserSchema
from models.CartItem import CartItem

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

    user_schema = UserSchema()

    user1 = User(
        username='Richie',
        email='richie@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user2 = User(
        username='Joanie',
        email='joanie@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user3 = User(
        username='Fonzy',
        email='fonzy@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    household = Category(name='Household')
    toys = Category(name='Toys')
    garden = Category(name='Garden')
    furniture = Category(name='Furniture')
    clothing = Category(name='clothing')
    electrical = Category(name='electrical')
    bags = Category(name='Bags')
    pets = Category(name='Pets')
    books = Category(name='Books')
    bicycles = Category(name='Bicycles')
    furniture = Category(name='Furniture')

    flower_vase = Listing(
        title='Flower vase',
        image='https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        description='A vase made from an old water bottle and painted white.',
        price=10,
        postage=3.51,
        num_available=10,
        categories=[household],
        user=user1

    )

    armchairs = Listing(
        title='Two modern style armchairs',
        image='https://images.unsplash.com/photo-1493150134366-cacb0bdc03fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        description='Two 1960s armchairs reupholstered in a modern yellow fabric. Perfect for any living room.',
        price=60,
        postage=20.00,
        num_available=1,
        categories=[household, furniture],
        user=user2,
    )

    item = CartItem(
        quantity=1,
        user=user1,
        item=flower_vase
    )

    item1 = CartItem(
        quantity=10,
        user=user2,
        item=armchairs
    )

    db.commit()
