from app import db
from pony.orm import Required, Optional, Set
from marshmallow import Schema, fields, post_load
from models.Category import Category
from models.User import User

class Listing(db.Entity):
    title = Required(str)
    image = Required(str)
    description = Required(str)
    price = Required(float)
    postage = Required(float)
    num_available = Required(int)
    categories = Set('Category')
    likes = Optional(int)
    user = Required('User', reverse='listings')
    bought_by = Set('User', reverse='purchases')

class ListingSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    image = fields.Str(required=True)
    description = fields.Str(required=True)
    price = fields.Float(required=True)
    postage = fields.Float(required=True)
    num_available = fields.Int(required=True)
    categories = fields.Nested('CategorySchema', many=True, dump_only=True, exclude=('listings', ))
    category_ids = fields.List(fields.Int(), load_only=True)
    likes = fields.Int()
    user = fields.Nested('UserSchema', exclude=('listings', 'email', 'purchases'))
    bought_by = fields.Nested('UserSchema', exclude=('listings', 'email', 'purchases'), many=True, required=False)
    bought_by_ids = fields.List(fields.Int(), load_only=True)

    @post_load
    def load_categories(self, data):
        data['categories'] = [Category.get(id=category_id) for category_id in data['category_ids']]
        del data['category_ids']

        return data

    @post_load
    def load_purchases(self, data):
        data['bought_by'] = [User.get(id=user_id) for user_id in data['bought_by_ids']]
        del data['bought_by_ids']

        return data
