from pony.orm import db_session
from flask import Blueprint, request, g, jsonify, abort
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

# GET SINGLE LISTING ==================================

@router.route('listings/<int:listing_id>', methods=['GET'])
@db_session
def show(listing_id):
    schema = ListingSchema()
    listing = Listing.get(id=listing_id)

    if not listing:
        abort(404)

    return schema.dumps(listing)

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

# UPDATE A LISTING ==========================================
@router.route('listings/<int:listing_id>', methods=['PUT'])
@db_session
@secure_route
def update(listing_id):
    schema = ListingSchema()
    listing = Listing.get(id=listing_id)

    if not listing:
        abort(404)

    try:
        data = schema.load(request.get_json())
        listing.set(**data)
        db.commit()

    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(listing)

#  DELETE A LISTING ============================================
@router.route('listings/<int:listing_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(listing_id):
    listing = Listing.get(id=listing_id)

    if not listing:
        abort(404)

    listing.delete()
    db.commit()

    return '', 204
