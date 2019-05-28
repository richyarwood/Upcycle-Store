from app import app
from controllers import listings, categories, auth

app.register_blueprint(listings.router, url_prefix='/api')
app.register_blueprint(categories.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
