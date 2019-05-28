from app import db
from pony.orm import Required
from marshmallow import Schema, fields

class CartItem(db.Entity):
    quantity = Required(int)
    user = Required('User')
    item = Required('Listing')

class CartItemSchema(Schema):
    id = fields.Int(dump_only=True)
    quantity = fields.Int()
    user = fields.Nested('UserSchema')
    item = fields.Nested('Listing')
