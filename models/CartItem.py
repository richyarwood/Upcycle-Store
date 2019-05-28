from app import db
from pony.orm import Required
from marshmallow import Schema, fields

class CartItem(db.Entity):
    quantity = Required(int)
    customer = Required('User')
    item = Required('Listing')

class CartItemSchema(Schema):
    id = fields.Int(dump_only=True)
    quantity = fields.Int()
    customer = fields.Nested('UserSchema', exclude=('cart_items', ))
    item = fields.Nested('ListingSchema', many=True, exclude=('cart_items', ))
