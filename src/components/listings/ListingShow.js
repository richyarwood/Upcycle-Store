import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class ListingShow extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      listing: null,
      item: {}
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){

    axios.get(`/api/listings/${this.props.match.params.id}`)
      .then(res => this.setState({ listing: res.data }))
  }

  handleClick(e){
    const token = Auth.getToken()

    this.setState({item: { quantity: 1, item: e.target.dataset.item_id }})

    axios.post('api/cart_items', this.state.item, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(console.log('Added'))
  }

  render(){
    if(!this.state.listing) return null
    console.log(this.state.listing)
    const {id, image, title, price, postage, description, user, num_available} = this.state.listing
    console.log(this.state.listing)
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
                <div
                  className="add-basket-button"
                  data-item_id={id}
                  onClick={this.handleClick}>
                  <div className="add-basket-text">ADD TO BASKET</div>
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
