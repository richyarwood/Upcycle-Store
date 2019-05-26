from app import app
from controllers import listings, categories

app.register_blueprint(listings.router)
app.register_blueprint(categories.router)
