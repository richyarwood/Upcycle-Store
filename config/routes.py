from app import app
from controllers import listings, categories, auth, cart_items

app.register_blueprint(listings.router, url_prefix='/api')
app.register_blueprint(categories.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
app.register_blueprint(cart_items.router, url_prefix='/api')
