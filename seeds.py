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
        description='A vase made from an old water bottle and painted white.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. Justo eget magna fermentum iaculis. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Odio tempor orci dapibus ultrices in iaculis nunc. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Adipiscing at in tellus integer feugiat scelerisque varius. Fermentum dui faucibus in ornare quam. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus id interdum velit laoreet id donec. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. At elementum eu facilisis sed odio morbi quis commodo. \n Dictum sit amet justo donec enim diam vulputate ut. Lacus sed viverra tellus in hac habitasse. Aliquam faucibus purus in massa tempor nec feugiat nisl. Ut sem nulla pharetra diam sit amet nisl. Mi in nulla posuere sollicitudin. Pharetra convallis posuere morbi leo urna molestie at. Mauris ultrices eros in cursus turpis. Eget nulla facilisi etiam dignissim diam. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nisl suscipit adipiscing bibendum est ultricies integer. Elit sed vulputate mi sit. Consequat id porta nibh venenatis cras sed. Luctus venenatis lectus magna fringilla urna porttitor. Eget est lorem ipsum dolor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. In arcu cursus euismod quis viverra nibh. Mi eget mauris pharetra et ultrices neque ornare. In ornare quam viverra orci sagittis eu. Non diam phasellus vestibulum lorem sed risus ultricies. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar.',
        price=10.00,
        postage=3.51,
        num_available=10,
        categories=[household],
        user=user1

    )

    armchairs = Listing(
        title='Two modern style armchairs',
        image='https://images.unsplash.com/photo-1493150134366-cacb0bdc03fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        description='Two 1960s armchairs reupholstered in a modern yellow fabric. Perfect for any living room.A vase made from an old water bottle and painted white.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. Justo eget magna fermentum iaculis. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Odio tempor orci dapibus ultrices in iaculis nunc. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Adipiscing at in tellus integer feugiat scelerisque varius. Fermentum dui faucibus in ornare quam. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus id interdum velit laoreet id donec. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. At elementum eu facilisis sed odio morbi quis commodo. \n Dictum sit amet justo donec enim diam vulputate ut. Lacus sed viverra tellus in hac habitasse. Aliquam faucibus purus in massa tempor nec feugiat nisl. Ut sem nulla pharetra diam sit amet nisl. Mi in nulla posuere sollicitudin. Pharetra convallis posuere morbi leo urna molestie at. Mauris ultrices eros in cursus turpis. Eget nulla facilisi etiam dignissim diam. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nisl suscipit adipiscing bibendum est ultricies integer. Elit sed vulputate mi sit. Consequat id porta nibh venenatis cras sed. Luctus venenatis lectus magna fringilla urna porttitor. Eget est lorem ipsum dolor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. In arcu cursus euismod quis viverra nibh. Mi eget mauris pharetra et ultrices neque ornare. In ornare quam viverra orci sagittis eu. Non diam phasellus vestibulum lorem sed risus ultricies. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar.',
        price=60.00,
        postage=20.00,
        num_available=1,
        categories=[household, furniture],
        user=user2,
    )

    CartItem(
        quantity=1,
        user=user1,
        item=flower_vase
    )

    CartItem(
        quantity=1,
        user=user1,
        item=armchairs
    )

    CartItem(
        quantity=10,
        user=user2,
        item=armchairs
    )

    db.commit()
