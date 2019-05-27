from pony.orm import db_session
from flask import Blueprint, request, g, jsonify
from marshmallow import ValidationError
from app import db
from models.Listing import Listing, ListingSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'listings', url_prefix='/api')

# GET ALL LISTINGS =====================================
@router.route('/listings', methods=['GET'])
@db_session
def index():
    schema = ListingSchema(many=True)
    listings = Listing.select()
    return schema.dumps(listings)

#  CREATE A LISTING ====================================

@router.route('/listings', methods=['POST'])
@db_session
@secure_route
def create():
    schema = ListingSchema()

    try:
        data = schema.load(request.get_json())
        data['user'] = g.current_user
        listing = Listing(**data)
        db.commit()

    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(listing), 201
