import React from 'react'
import axios from 'axios'
import Truncate from 'react-truncate'

class ListingIndex extends React.Component{
  constructor(){
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    axios.get('/api/listings')
      .then(res => this.setState({data: res.data}))
      .catch(err => console.error(err))
  }

  render(){
    console.log(this.state.data)
    return(
      <section className="columns is-multiline">
        {this.state.data.map(listing =>
          <div key={listing.id} className="listing-wrapper column is-one-quarter">
            <div>
              <img src={listing.image} alt={listing.title} />
            </div>
            <div className="listing-title">
              {listing.title}
            </div>
            <div className="listing-price">
              £{listing.price}
            </div>
            <div className="listing-postage">
              Postage: £{listing.postage}
            </div>
            <div className="listing-description"><Truncate lines={3} ellipsis={<span>...</span>}>
              {listing.description}
            </Truncate></div>
            <div className="listing-categories">
              {listing.categories.map(category =>
                <div key={category.id} className="category">
                  {category.name}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    )
  }

}

export default ListingIndex
