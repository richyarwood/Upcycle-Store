import React from 'react'
import Auth from '../../lib/Auth'

import axios from 'axios'

class Cart extends React.Component{
  constructor(){
    super()

    this.state = {
      data: [],
      token: Auth.getToken()
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentDidMount(){

    axios.get('api/cart', {
      headers: { 'Authorization': `Bearer ${this.state.token}` }
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


  handleDeleteClick(e){
    axios.delete(`/api/cart_items/${e.target.id}`, {
      headers: { 'Authorization': `Bearer ${this.state.token}` }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render(){

    console.log(this.state.price)
    return(
      <div className="container">
        <section className="wrapper">
          <h1>Cart</h1>
          <div className="cart-line-items-wrapper">
            {this.state.data.map(cartItem =>
              <div key={cartItem.id}>
                <hr />
                <div className="columns cart-line-item">
                  <div className="column">
                    <img src={cartItem.item.image} alt={cartItem.item.title} />
                  </div>
                  <div className="column is-two-fifths cart-line-item-content">
                    {cartItem.item.title}
                  </div>
                  <div className="column cart-line-item-title price">
                    Quantity: {cartItem.quantity}
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
              <button className="button check-out-button">CHECKOUT</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Cart
