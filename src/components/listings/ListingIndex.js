import React from 'react'
import axios from 'axios'

import ListingCard from './ListingCard'

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
    return(
      <div className="container">
        <section className="columns is-multiline">
          {this.state.data.map(listing =>
            <div key={listing.id} className="listing-wrapper column is-one-quarter">
              <ListingCard {...listing} />
            </div>
          )}
        </section>
      </div>
    )
  }

}

export default ListingIndex
