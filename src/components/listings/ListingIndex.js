import React from 'react'
import axios from 'axios'

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
            <div>
              £{listing.price}
            </div>
          </div>
        )}
      </section>
    )
  }

}

export default ListingIndex
