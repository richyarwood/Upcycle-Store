import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

class Cart extends React.Component{
  constructor(){
    super()

    this.state = {
      data: [],
      checkedOut: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this)
  }

  componentDidMount(){
    axios.get('api/cart', {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  // CALCULATES THE SHOPPING CART TOTAL ============================
  calculatePrice(){
    const prices = this.state.data.map(element => element.item.price)
    return prices.reduce((a, b) => a + b, 0)
  }

  // DELETES AND ITEM FROM THE CART ===============================
  handleDeleteClick({ target: { id } }){
    axios.delete(`/api/cart_items/${id}`, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const index = this.state.data.findIndex(item => item.id === parseInt(id))
        const data = [
          ...this.state.data.slice(0, index),
          ...this.state.data.slice(index+1)
        ]

        this.setState({ data })
      })
      .catch(err => console.log(err))
  }

  // HANDLE CHECKOUT SHOPPING CART ===========================
  handleCheckoutClick(){
    axios.delete('/api/cart_checkout', {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    }
    )
      .then(() => this.setState({ data: [] })
      )
    this.showModal()
  }

  // SHOW CHECKED OUT MODAL ==================================
  showModal(){
    this.setState({ checkedOut: true })
    setTimeout(() => this.setState({ checkedOut: false }), 1500)
  }

  render(){
    return(
      <div className="container">
        {this.state.checkedOut && <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-added-box"><div className="modal-added-text">
              <p><FontAwesomeIcon icon={faShippingFast} /></p>
              <p>Thanks.</p>
              <p>Your items are on the way</p>
            </div>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>}
        <section className="wrapper">
          <h1>Cart</h1>
          <div className="cart-line-items-wrapper">
            <div className="columns cart-labels">
              <div className="column">
              </div>
              <div className="column is-two-fifths-desktop">
              </div>
              <div className="column">
                <strong>Quantity</strong>
              </div>
              <div className="column">
                <strong>Price</strong>
              </div>
              <div className="column">
              </div>
            </div>

            {!this.state.data.length && <h3>You have not items in your cart<br />
              <Link to='/browse'>Start shopping</Link></h3>}
            {this.state.data.map(cartItem =>
              <div key={cartItem.id}>
                <hr />
                <div className="columns cart-line-item is-mobile">
                  <div className="column cart-item-image">
                    <img src={cartItem.item.image} alt={cartItem.item.title} />
                  </div>
                  <div className="column is-two-fifths-mobile is-two-fifths-desktop cart-line-item-content">

                    <Link to={`/listings/${cartItem.item.id}`}>{cartItem.item.title}</Link>

                  </div>
                  <div className="column cart-line-item-title price">
                    {cartItem.quantity}
                  </div>
                  <div className="column cart-line-item-title price">
                    £{cartItem.item.price}
                  </div>
                  <div className="column">
                    <button
                      className="button"
                      onClick={this.handleDeleteClick}
                      id={cartItem.id}
                    >
                      DELETE
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
          <hr />
          {!this.state.data.length && <div className="cart-total-checkout-wrapper">
            <div className="cart-total-checkout">
              <button
                className="button check-out-button disabled">
                  CHECKOUT
              </button>
            </div>
          </div>}

          {this.state.data.length &&  <div className="cart-total-checkout-wrapper">
            <div className="cart-total-checkout">
            Total: £{this.calculatePrice()}
              <button
                className="button check-out-button" onClick={this.handleCheckoutClick}>
                  CHECKOUT
              </button>
            </div>
          </div>}
        </section>
      </div>
    )
  }
}

export default Cart
