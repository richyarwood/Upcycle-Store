import React from 'react'
import axios from 'axios'

import ListingCard from './ListingCard'
import Filter from '../common/Filter'

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
        <Filter />
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
