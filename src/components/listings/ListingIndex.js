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
      <section className='section'>
        {this.state.data.map(listing =>
          <div key={listing.id}>
            {listing.title}
          </div>
        )}
      </section>
    )
  }

}

export default ListingIndex
