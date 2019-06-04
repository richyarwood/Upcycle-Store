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

    user4 = User(
        username='Mr Cunnigham',
        email='mr@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user5 = User(
        username='Laverne',
        email='laverne@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user6 = User(
        username='Tony',
        email='tony@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user7 = User(
        username='Adam',
        email='adam@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user8 = User(
        username='Mike',
        email='mike@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user9 = User(
        username='Peter',
        email='peter@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    user10 = User(
        username='Charlotte',
        email='charlotte@email.com',
        password_hash=user_schema.generate_hash('pass')
    )

    household = Category(name='Household')
    toys = Category(name='Toys')
    garden = Category(name='Garden')
    furniture = Category(name='Furniture')
    clothing = Category(name='Clothing')
    electrical = Category(name='Electrical')
    bags = Category(name='Bags')
    pets = Category(name='Pets')
    books = Category(name='Books')
    bicycles = Category(name='Bicycles')
    kitchen = Category(name='Kitchen')

    flower_vase = Listing(
        title='Flower vase',
        image='https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        description='A vase made from an old water bottle and painted white.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. Justo eget magna fermentum iaculis. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Odio tempor orci dapibus ultrices in iaculis nunc. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Adipiscing at in tellus integer feugiat scelerisque varius. Fermentum dui faucibus in ornare quam. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus id interdum velit laoreet id donec. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. At elementum eu facilisis sed odio morbi quis commodo',
        price=10.00,
        postage=3.51,
        num_available=10,
        categories=[household],
        user=user1
    )

    armchairs = Listing(
        title='Two modern style armchairs',
        image='https://images.unsplash.com/photo-1493150134366-cacb0bdc03fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
        description='Two 1960s armchairs reupholstered in a modern yellow fabric. Perfect for any living room.A vase made from an old water bottle and painted white.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. Justo eget magna fermentum iaculis. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Odio tempor orci dapibus ultrices in iaculis nunc. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Adipiscing at in tellus integer feugiat scelerisque varius. Fermentum dui faucibus in ornare quam. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus id interdum velit laoreet id donec. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum.',
        price=60.00,
        postage=20.00,
        num_available=1,
        categories=[household, furniture],
        user=user2,
    )

    Listing(
        title='Car front sofa',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/20b9c7db-e2a9-4e65-b39b-9077ab3c745e-smithers-of-stamford-car-upcycle.jpg',
        description='Converted morris minor bonnet and headlights converted in to a stylish sofa. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. Justo eget magna fermentum iaculis. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Odio tempor orci dapibus ultrices in iaculis nunc. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Adipiscing at in tellus integer feugiat scelerisque varius. Fermentum dui faucibus in ornare quam. Pharetra vel turpis nunc eget lorem dolor sed viverra ipsum. Tellus id interdum velit laoreet id donec. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. At elementum eu facilisis sed odio morbi quis commodo. \n Dictum sit amet justo donec enim diam vulputate ut. Lacus sed viverra tellus in hac habitasse. Aliquam faucibus purus in massa tempor nec feugiat nisl. Ut sem nulla pharetra diam sit amet nisl. Mi in nulla posuere sollicitudin. Pharetra convallis posuere morbi leo urna molestie at. Mauris ultrices eros in cursus turpis. Eget nulla facilisi etiam dignissim diam. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Nisl suscipit adipiscing bibendum est ultricies integer. Elit sed vulputate mi sit. Consequat id porta nibh venenatis cras sed. Luctus venenatis lectus magna fringilla urna porttitor. Eget est lorem ipsum dolor. Mauris pellentesque pulvinar pellentesque habitant morbi tristique. In arcu cursus euismod quis viverra nibh. Mi eget mauris pharetra et ultrices neque ornare. In ornare quam viverra orci sagittis eu. Non diam phasellus vestibulum lorem sed risus ultricies. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar.',
        price=250.00,
        postage=50.00,
        num_available=1,
        categories=[household, furniture],
        user=user4,
    )

    Listing(
        title='Knife block made from old books',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/9dce83f5-088d-4357-976f-69458ac9143d-DIY-Knife-Holder-town-n-country-living.jpg',
        description='Give old books a new purpose on the kitchen counter as quirky storage. Pick out four or five neglected volumes and transform them into a knife block by binding them with a piece of rope. Leave a little space so that you can comfortably slip a knife between the pages.',
        price=10.00,
        postage=5.00,
        num_available=10,
        categories=[household, kitchen, books],
        user=user2,
    )

    Listing(
        title='Women\'s purple heart shirt',
        image='https://static.wixstatic.com/media/a753cd_9c22553934c0460fb5c856bdb835e8e7~mv2_d_2002_1428_s_2.jpg/v1/fit/w_498,h_355,q_90/file.jpg',
        description='This one of a kind top has a loose fitting style in a mix of cotton fabrics. There\'s a peace sign heart on one shoulder.',
        price=40.00,
        postage=5.00,
        num_available=1,
        categories=[clothing],
        user=user8,
    )

    Listing(
        title='Books spine rug',
        image='https://i.pinimg.com/originals/be/bd/12/bebd125f0470f736049742fb5e791163.jpg',
        description='Curl up to read a good book on this amazing rug made from book spines.',
        price=40.00,
        postage=12.00,
        num_available=1,
        categories=[household, books],
        user=user8,
    )

    Listing(
        title='Painted floral coffee table',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/0e983017-d1cf-4637-b14b-bdee60689fef-JD-Williams-floral-sideboard-upcycle.jpg',
        description='If you\'ve fallen out of love with an old coffee table, give it a spruce up with some decorative paintwork. Sketch on a design in pencil before you commit to the pattern or use a ready-made stencil that you can pick up from an art shop. Use oil-based paints for a durable finish that\'ll stand the test of time.',
        price=60.00,
        postage=15.00,
        num_available=10,
        categories=[household, furniture],
        user=user4,
    )

    Listing(
        title='Old books desk tidy',
        image='https://earth911.com/wp-content/uploads/2015/07/desktorganizer.jpg',
        description='One of the easiest and most efficient ways to upcycle a stack of books is to turn it into an organizer. All you have to do is take a stack of book page, cut two circles, insert cardboard tubes, and use the circular spaces you have created to organize your desk. This is the perfect option for the bibliophile in your life, as they will still be able to enjoy their precious books without them taking up too much space on the shelf.',
        price=5.00,
        postage=1.00,
        num_available=10,
        categories=[books, household],
        user=user4,
    )

    Listing(
        title='Ship bulkhead lights',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/ccc1a3f7-054e-4d2e-811d-5d1e39d4d385-Upcycled-Vintage-Ship-Bulkhead-Light-Scaramanga.jpg',
        description='If you scour scrapyards and auctions houses, chances are you\'ll come across a few worse-for-wear ship bulkhead lights. For a quirky light fixture, fit a new bulb and light cord behind the cage. Mount onto a distressed piece of wood for the perfect vintage lighting solution.',
        price=25.00,
        postage=8.00,
        num_available=20,
        categories=[household, furniture],
        user=user4,
    )

    Listing(
        title='Wall-mounted storage box',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/9203fc74-6e07-42aa-8b2a-3c2bc1c1caf5-upcycled-shelving-unit.jpg',
        description='An easy way to add budget-friendly storage to your bedroom is by upcycling an old wooden box divider. Their square shelves are ideal for displaying small ceramics and plants – plus they make a great addition to a vintage-inspired bedroom.',
        price=45.00,
        postage=12.00,
        num_available=3,
        categories=[household, furniture],
        user=user5,
    )

    Listing(
        title='Woven bag made from plastic bread bags',
        image='https://i.pinimg.com/originals/66/58/68/6658688c868f2aa72f760b45208ad661.jpg',
        description='Diane Paquette is a highly skilled artisan and textile artist. She comes from a line of weavers originating in Quebec. At a recent Environment Hamilton event people of all ages gathered together to learn the skill of weaving with plastic bags.',
        price=5.00,
        postage=1.00,
        num_available=10,
        categories=[bags],
        user=user10,
    )

    Listing(
        title='Bathroom washbasin',
        image='http://rustikmagazine.com/wordpress/wp-content/uploads/2013/11/Benjamin-bullins-BikeVanity011.jpg',
        description='A one-off creation using an old bike as a bathroom washbasin and store.',
        price=50.00,
        postage=20.00,
        num_available=1,
        categories=[bicycles, household],
        user=user9,
    )

    Listing(
        title='Malt Tote bag',
        image='https://alchemistbeer.com/wp-content/uploads/2017/07/malt_tote_01.jpg',
        description='Oversized tote made from our malt bags by Vermont Artist Recycle Moe. Boxy bottom, sturdy straps, Alchemist logo patch. Approximate dimensions: 16″ W x 12″ H x 10″ D',
        price=8.00,
        postage=2.50,
        num_available=20,
        categories=[bags],
        user=user10,
    )

    Listing(
        title='Bed flower bed',
        image='https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2015/06/FlowerPlantersandPots_01-870x600.jpg',
        description='Don\'t have any soil in your garden. This old bed make a perfect replacement and you don\'t have to bend down',
        price=20.00,
        postage=12.50,
        num_available=1,
        categories=[garden],
        user=user7,
    )

    Listing(
        title='Bike handlebar bike rack',
        image='https://cdn.blessthisstuff.com/imagens/stuff/upcycle-fetish-bike-racks-4.jpg',
        description='Austrian designer Andreas Scheiger creates these very cool "Hunting Trophies" made from recycled bicycle parts that can then be used as hanging racks for your bicycle. "Upcycle Fetish" combines old parts like bike saddles and handlebars to create bull head shapes that are both functional and quirky racks. Very creative!',
        price=15.00,
        postage=7.50,
        num_available=20,
        categories=[bicycles, household],
        user=user7,
    )

    Listing(
        title='Ladder shelving unit',
        image='https://loveincorporated.blob.core.windows.net/contentimages/gallery/e80065c4-11b4-44b7-b770-3dcc0b1553e4--vintage-rope-ladder-shelf-scaramanga.jpg',
        description='If you have a few old wooden ladders gathering dust in your garage, this next upcycle is a nifty way to repurpose them into extra storage. Decide how many shelves you need and cut between the rungs of the ladder accordingly. For extra stability, frame the shelving with some old wood and attach a smaller length of rope or string at the top of the unit for hanging.',
        price=10.00,
        postage=5.50,
        num_available=1,
        categories=[household, furniture],
        user=user5,
    )

    Listing(
        title='Car tyre planters',
        image='https://hips.hearstapps.com/clv.h-cdn.co/assets/15/13/980x490/landscape-1427318516-framed-close-up-with-blog-address.jpg',
        description='A classic garden upcycle with these colorful planters made from car tyres. Price is per planter.',
        price=20.00,
        postage=15.00,
        num_available=20,
        categories=[garden],
        user=user5,
    )

    Listing(
        title='Crossbody purse, recycled denim bag',
        image='https://i.pinimg.com/originals/91/f1/e0/91f1e070815cb7af910b0fe14b2e9528.jpg',
        description='This cross body bag is made out of a jean pant. It has a V-shape opening, and wider base with pleating. This bag is fully lined with a pale yellow and green cotton print. It features 2 exterior pockets on the front side ,and 2 interior pockets. Metal button and fabric loop keep the opening closed. Metal slider provides different options for strap length.',
        price=15.00,
        postage=4.50,
        num_available=2,
        categories=[bags],
        user=user6,
    )

    Listing(
        title='Pet food and water holders',
        image='https://www.styletails.com/wp-content/uploads/2012/05/IMG_2552-825x1024.jpg',
        description='A old vanity case ingeniously reimagined as a duel food and water holder for your dog. Perfect for a small to medium dog.',
        price=25.00,
        postage=6.50,
        num_available=1,
        categories=[pets],
        user=user9,
    )

    Listing(
        title='Wine box kitchen cupboards',
        image='http://www.palletsideas.com/wp-content/uploads/2016/04/pallet-upcycled-kitchen-storage.jpg',
        description='One-off kitchen units made from vintage wine boxes and pallets.',
        price=300.00,
        postage=50.00,
        num_available=1,
        categories=[kitchen],
        user=user10,
    )

    Listing(
        title='Women\'s boho sun dress',
        image='https://static.wixstatic.com/media/a753cd_fc6718e02ec449b384da4c962ffe4f8e~mv2_d_2316_1541_s_2.jpg/v1/fill/w_1960,h_1102,al_c,q_85,usm_0.66_1.00_0.01/a753cd_fc6718e02ec449b384da4c962ffe4f8e~mv2_d_2316_1541_s_2.webp',
        description='This one of a kind dress is made from soft, cotton fabrics and has some stretch to it. There\'s a tribal bear image on the front and denim, triangle accents. The bottom and side are patchwork style and there\'s one hip pocket with a feather patch on it.',
        price=50.00,
        postage=4.50,
        num_available=1,
        categories=[clothing],
        user=user9,
    )

    Listing(
        title='Owl and sock monster toy set',
        image='https://shabbyshe.files.wordpress.com/2014/05/upcycled-clothing-tooth-pillows.jpg',
        description='They’re made from two pairs of woolly tights which were otherwise due for the fabric scrap heap. There’s also a small amount of felt, some toy stuffing, embroidery thread and a recycled cloth nappy liner (which looks just like white felt).',
        price=12.00,
        postage=2.50,
        num_available=10,
        categories=[toys],
        user=user8,
    )

    Listing(
        title='Briefcase cat bed',
        image='https://www.styletails.com/wp-content/uploads/2012/05/IMG_2598.jpg',
        description='Vintage Upcycled Suitcase Bed with Wooden Retro Legs- Made from a Vintage Pearl Light suitcase – Argyle print slipcover and egg-blue wooden legs',
        price=25.00,
        postage=4.50,
        num_available=5,
        categories=[pets],
        user=user5,
    )


    Listing(
        title='Bike wheel light display',
        image='http://www.homelysmart.com/wp-content/uploads/2018/01/th-bike-wheel-lamp-homelysmart.jpg',
        description='Colourful lighting display or living room lamp made from a bike wheel and christmas lights.',
        price=50.00,
        postage=20.00,
        num_available=1,
        categories=[bicycles, household, electrical],
        user=user5,
    )

    Listing(
        title='Knitwear toys',
        image='https://www.upcyclist.co.uk/wp-content/uploads/2012/11/il_fullxfull.388691920_of9f.jpg',
        description='Jumper sleeves converted in to cuddly toys. Suitable for ages 3+',
        price=5.00,
        postage=1.00,
        num_available=20,
        categories=[toys],
        user=user3,
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
