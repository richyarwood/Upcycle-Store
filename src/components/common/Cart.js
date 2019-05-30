import React from 'react'
import Auth from '../../lib/Auth'

import axios from 'axios'

class Cart extends React.Component{
  constructor(){
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    const token = Auth.getToken()

    axios.get('api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))

  }


  calculatePrice(){
    const prices = this.state.data.map(element => element.item.price)
    return prices.reduce((a,b) => a+b, 0)
  }

  render(){
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
                    <button className="button">DELETE</button>
                  </div>

                </div>
              </div>
            )}
            £{this.calculatePrice()}
          </div>

        </section>
      </div>
    )
  }
}

export default Cart
