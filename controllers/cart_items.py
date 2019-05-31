from pony.orm import db_session
from flask import Blueprint, request, g, jsonify, abort
from models.CartItem import CartItem, CartItemSchema
from marshmallow import ValidationError
from app import db
from lib.secure_route import secure_route

router = Blueprint(__name__, 'cart_items')

# GET ALL LISTINGS =====================================
@router.route('/cart_items', methods=['GET'])
@db_session
def index():
    schema = CartItemSchema(many=True)
    cart_items = CartItem.select()
    return schema.dumps(cart_items)


# CREATE A CART ITEM ====================================

@router.route('/cart_items', methods=['POST'])
@db_session
@secure_route
def create():
    schema = CartItemSchema()
    print(g.current_user)
    try:
        data = schema.load(request.get_json())
        cart_item = CartItem(**data, user=g.current_user)
        db.commit()

    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(cart_item), 201

# GET USER CART ITEMS ======================================

@router.route('/cart', methods=['GET'])
@db_session
@secure_route
def get_cart():

    schema = CartItemSchema(many=True)
    usercart = CartItem.select(lambda user: user.user == g.current_user)

    return schema.dumps(usercart)

# DELETE CART ITEM =========================================

@router.route('/cart_items/<int:item_id>', methods=['DELETE'])
@db_session
@secure_route
def delete(item_id):
    item = CartItem.get(id=item_id)

    if not item:
        abort(404)

    item.delete()
    db.commit()

    return '', 204

# CHECKOUT AND EMPTY CART ===================================
@router.route('/cart_checkout', methods=['DELETE'])
@db_session
@secure_route
def clear_cart():

    delete(item for item in CartItem if item.user == g.current_user)
    return '', 204
