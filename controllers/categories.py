from pony.orm import db_session
from flask import Blueprint
from models.Category import Category, CategorySchema

router = Blueprint(__name__, 'categories')

# GET ALL LISTINGS =====================================
@router.route('/categories', methods=['GET'])
@db_session
def index():
    schema = CategorySchema(many=True)
    categories = Category.select()
    return schema.dumps(categories)
