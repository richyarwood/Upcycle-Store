from pony.orm import db_session
from flask import Blueprint
from models.CartItem import CartItem, CartItemSchema

router = Blueprint(__name__, 'cart_items')

# GET ALL LISTINGS =====================================
@router.route('/cart_items', methods=['GET'])
@db_session
def index():
    schema = CartItemSchema(many=True)
    cart_items = CartItem.select()
    return schema.dumps(cart_items)
