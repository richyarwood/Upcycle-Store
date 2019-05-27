from app import app
from controllers import listings, categories, auth

app.register_blueprint(listings.router)
app.register_blueprint(categories.router)
app.register_blueprint(auth.router)
