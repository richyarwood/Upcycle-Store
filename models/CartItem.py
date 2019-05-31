from app import db
from pony.orm import Required
from marshmallow import Schema, fields, post_load
from models.Listing import Listing

class CartItem(db.Entity):
    quantity = Required(int)
    user = Required('User')
    item = Required('Listing')

class CartItemSchema(Schema):
    id = fields.Int(dump_only=True)
    quantity = fields.Int()
    user = fields.Nested('UserSchema', exclude=('cart_items', 'email', 'listings'))
    item = fields.Nested('ListingSchema', exclude=('user', 'categories', 'description', 'num_available'), dump_only=True)
    item_id = fields.Int(load_only=True)

    @post_load
    def load_item(self, data):
        data['item'] = Listing.get(id=data['item_id'])
        del data['item_id']

        return data
