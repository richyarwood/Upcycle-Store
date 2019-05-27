from app import db
from pony.orm import Required, Optional, Set
from marshmallow import Schema, fields, post_load
from models.Category import Category

class Listing(db.Entity):
    title = Required(str)
    image = Required(str)
    description = Required(str)
    price = Required(float)
    postage = Required(float)
    num_available = Required(int)
    num_sold = Required(int)
    categories = Set('Category')
    likes = Optional(int)
    created_by = Required('User', reverse='listings')
    bought_by = Set('User', reverse='purchases')

class ListingSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    image = fields.Str(required=True)
    description = fields.Str(required=True)
    price = fields.Float(required=True)
    postage = fields.Float(required=True)
    num_available = fields.Int(required=True)
    num_sold = fields.Int(required=True)
    categories = fields.Nested('CategorySchema', many=True, dump_only=True, exclude=('listings', ))
    category_ids = fields.List(fields.Int(), load_only=True)
    likes = fields.Int()
    created_by = fields.Nested('UserSchema', exclude=('listings', 'email'), dump_only=True)
    bought_by = fields.Nested('UserSchema', exclude=('listings', 'email'), many=True, required=False)


    @post_load
    def load_categories(self, data):
        data['categories'] = [Category.get(id=category_id) for category_id in data['category_ids']]
        del data['category_ids']

        return data
