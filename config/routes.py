import os
from app import app
from controllers import listings, categories, auth, cart_items

app.register_blueprint(listings.router, url_prefix='/api')
app.register_blueprint(categories.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
app.register_blueprint(cart_items.router, url_prefix='/api')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

    if os.path.isfile('public/' + path):
        return app.send_static_file(path)

    return app.send_static_file('index.html')
