from pony.orm import db_session
from flask import Blueprint
from models.Listing import Listing, ListingSchema

router = Blueprint(__name__, 'listings')

# GET ALL LISTINGS =====================================
@router.route('/listings', methods=['GET'])
@db_session
def index():
    schema = ListingSchema(many=True)
    listings = Listing.select()
    return schema.dumps(listings)
