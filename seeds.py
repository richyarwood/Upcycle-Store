from pony.orm import db_session
from app import db
from models.Category import Category
from models.Listing import Listing

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

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

    Listing(
        title='Flower vase',
        image='https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        description='A vase made from an old water bottle and painted white.',
        price=10,
        postage=3.51,
        num_available=10,
        num_sold=0,
        categories=[household]
    )

db.commit()
