import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

import axios from 'axios'

class Cart extends React.Component{
  constructor(){
    super()

    this.state = {
      data: []
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


  calculatePrice(){
    const prices = this.state.data.map(element => element.item.price)
    return prices.reduce((a, b) => a + b, 0)
  }

  calculatePostage(){
    const postage = this.state.data.map(element => element.item)
    return postage.reduce((a, b) => a + b, 0)
  }


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

  handleCheckoutClick(){
    axios.delete('/api/cart_checkout', {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
  }

  render(){
    return(
      <div className="container">
        <section className="wrapper">
          <h1>Cart</h1>
          <div className="cart-line-items-wrapper">
            <div className="columns">
              <div className="column is-one-fifth">
              </div>
              <div className="column is-two-fifths">
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
                <div className="columns cart-line-item">
                  <div className="column is-one-fifth">
                    <img src={cartItem.item.image} alt={cartItem.item.title} />
                  </div>
                  <div className="column is-two-fifths cart-line-item-content">

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
          <div className="cart-total-checkout-wrapper">

            <div className="cart-total-checkout">
              Total: £{this.calculatePrice()}
              <button
                className="button check-out-button" onClick={this.handleCheckoutClick}>
                  CHECKOUT
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Cart
