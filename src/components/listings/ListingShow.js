import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class ListingShow extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      listing: null,
      item: {
        quantity: null,
        item: null
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/listings/${this.props.match.params.id}`)
      .then(res => this.setState({ listing: res.data }))
  }

  handleClick(e){

    const token = Auth.getToken()

    const item = parseInt(e.target.dataset.itemid)
    console.log(item)

    axios.post('api/cart_items', {
      quantity: 1,
      item_id: item
    }, {
      headers:
        {
          'Authorization': `Bearer ${token}`
        }
    })

      .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  render(){
    if(!this.state.listing) return null
    const {id, image, title, price, postage, description, user, num_available} = this.state.listing

    return(
      <div className="container">
        <section className="wrapper">
          <div className="columns is-6">
            <div className="column is-two-fifths-desktop listing-show-right-column">
              <img src={image} alt={title}/>
              <h2>Contact seller</h2>
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
                <div className="add-basket-button">
                  <div
                    data-itemid={id}
                    data-quantity="1"
                    onClick={this.handleClick}
                    className="add-basket-text">
                    ADD TO BASKET
                  </div>
                </div>
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
