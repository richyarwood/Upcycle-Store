[githubrepo]: https://github.com/richyarwood/Upcycle-Store

# Upcycle Store

# Timeframe
7 days

# Technologies used
* React
* Webpack
* Ajax
* JavaScript (ES6)
* Python
* PostgreSQL
* Flask
* HTML5
* Bulma (CSS framework)
* SCSS
* GitHub

## Project Brief
This was a sole-coding project and the final project for the software engineering immersive course.

The brief was to:
* Create an application with a Python/Flask/Postgres backend and a React front-end utilising Webpack.
* The application had to include APIs to enable a user to register, login and add content.

The site is deployed to Heroku at http://upcyclestore.herokuapp.com.

![image](https://user-images.githubusercontent.com/40695746/59194039-96493b80-8b7f-11e9-8ef8-79193c8fe09d.png)

### App overview

I had decided early on in my project planning that I wanted to build a store. After researching for inspiration, I thought it would be fun to combine the creativity of giving old things a new lease of life with a shop. Upcycle Store was born.

I realised that to build a complete ecommerce platform was a challenging task in just 7 days. I decided that my MVP was a platform which allowed a user to register, list their items and also simulate buying items through a cart.

### Development process and application highlights

The project started with an entity relationship diagram (ERD) and I used Sketch and Zeplin to wireframe and design.

The site has a Python/Postgres backend and a React front end. Based on the ERD and wireframes I built the data models and used Flask to provide the API framework. Before building the front end I tested the API endpoints using Insomnia.

The shopping cart items had a one-to-many relationship with both the user and the listings. This caused a number of issues with recursion, but this was resolved by excluding data within some endpoints.

#### API endpoints

Endpoints were built out for:

* Login and registration (POST)
* Categories (POST)- fixed number from a seeds file.
* Listings - (GET, POST, DELETE)
* Cart items - (GET, POST, DELETE)

The endpoints for the cart items were more complex as I needed one to retrieve all items for a user:

```
@router.route('/cart', methods=['GET'])
@db_session
@secure_route
def get_cart():

    schema = CartItemSchema(many=True)
    usercart = CartItem.select(lambda user: user.user == g.current_user)

    return schema.dumps(usercart)
```

In addition. To simulate a 'checkout', I implemented an endpoint which removes all cart items for a user:

```
@router.route('/cart_checkout', methods=['DELETE'])
@db_session
@secure_route
def clear_cart():
    delete(item for item in CartItem if item.user == g.current_user)
    return '', 204
```

#### Add a listings

Whilst this is a simple form submission to the listing POST endpoint, I needed to store the categories as an array of ids. This is achieved by setting state for the categories and the rest of the form separately, and spreading this data in to one state before submission:

```
// HANDLES STATE CHANGE FOR FORM INPUT EXCEPT CATEGORIES ======
handleChange(e){
  const data = { ...this.state.data, [e.target.name]: e.target.value }
  this.setState({ data })
}


// HANDLES THE CATEGORY MULTISELECT ============================
handleCategorySelect(e){
  const categoryIds = Array.from(new Set([
    ...this.state.data.category_ids,
    parseInt(e.target.value)
  ]))
  const data = { ...this.state.data, category_ids: categoryIds }
  this.setState({ data })
}
```

#### Browse all listings filter

![image](https://user-images.githubusercontent.com/40695746/59194077-b8db5480-8b7f-11e9-8abe-48737f9fc283.png)

The browse page includes filter buttons. These are sorted first:

```
sortedCategories() {
  return this.state.categories.sort((a, b) => {
    if (a.name === b.name) return 0
    return a.name < b.name ? -1 : 1
  })
}
```

And a filter function is used to toggle the content:

```
filteredListings() {
  const filter = this.state.filters.name
  if (this.state.filters.name === 'All') return this.sortedListings()
  return this.sortedListings().filter(category => {
    return category.categories.some(category => category.name === filter)
  })
}

<section className="columns is-multiline">
  {this.filteredListings().map(listing =>
    <div key={listing.id} className="listing-wrapper column is-one-quarter">
      <ListingCard {...listing} />
    </div>
  )}
</section>
```

### Future enhancements
* PayPal integration
* Search
* Add comments to listings
* Update endpoint for a listing
