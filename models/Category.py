from app import db
from pony.orm import Required, Set
from marshmallow import Schema, fields

class Category(db.Entity):
    name = Required(str)
    listings = Set('Listing')

class CategorySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    listings = fields.Nested('ListingSchema', many=True, exclude=('categories', ))
