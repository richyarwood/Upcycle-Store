import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'

class ListingShow extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      listing: null,
      item: {
        quantity: null,
        item: null
      },
      modalShow: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/listings/${this.props.match.params.id}`)
      .then(res => this.setState({ listing: res.data }))
      .catch(err => console.log(err))
  }

  showModal(){
    this.setState({ modalShow: true })
    setTimeout(() => this.setState({ modalShow: false }), 1500)
  }

  // HANDLES CLICK ON THE ADD TO CART BUTTON ====================
  handleClick(e){
    const token = Auth.getToken()
    const item = parseInt(e.target.dataset.itemid)

    axios.post('api/cart_items', {
      quantity: 1,
      item_id: item
    }, {
      headers:
        {
          'Authorization': `Bearer ${token}`
        }
    })
      .then(res => {
        if(res.status === 201){
          this.showModal()
        }
      })
      .catch(err => console.log(err))
  }

  render(){
    if(!this.state.listing) return null
    const {id, image, title, price, postage, description, user, num_available} = this.state.listing
    console.log(this.state.modalShow)

    return(
      <div className="container">
        {this.state.modalShow && <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-added-box"><div className="modal-added-text">
            Added to cart</div>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>}
        <section className="wrapper">
          <div className="columns is-6">
            <div className="column is-two-fifths-desktop listing-show-right-column">
              <img className="listing-show_image" src={image} alt={title}/>
              <h2>All items from this seller</h2>
              {this.state.listing.user.listings.map(listing =>
                <div key={listing.id} className="columns seller-similar">
                  <div className="column is-one-third">
                    <Link to={`/listings/${listing.id}`}><img src={listing.image} alt={listing.title}/></Link>
                  </div>
                  <div className="column more-seller-title">
                    <Link to={`/listings/${listing.id}`}>{listing.title}</Link>
                    <div>£{listing.price}</div>
                  </div>

                </div>
              )}
            </div>
            <div className="column">
              <h1 className="listing-show-title">
                {title}
              </h1>
              <div className="listing-show-item-info">
                <p>Seller: {user.username}</p>
                <p>Number available: {num_available}</p>
              </div>

              <div className="add-basket-container">

                <div className="add-basket-price">
                  £{price}
                </div>
                {Auth.isAuthenticated() && <button className="add-basket-button">
                  <div
                    data-itemid={id}
                    data-quantity="1"
                    onClick={this.handleClick}
                    className="add-basket-text">
                    ADD TO CART
                  </div>
                </button>}
                {!Auth.isAuthenticated() && <Link to="/login"><div className="add-basket-button disabled">
                  <div
                    className="add-basket-text">
                    LOGIN TO BUY
                  </div>
                </div></Link>}
                <div>
                  Postage: £{postage}
                </div>
              </div>
              <h2>Description</h2>
              <div>
                {description}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

export default ListingShow
