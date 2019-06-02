import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListingCard from '../listings/ListingCard'


class Home extends React.Component{

  constructor(){
    super()

    this.state = {
      data: []
    }
  }


  componentDidMount(){
    axios.get('/api/listings')
      .then(res => this.setState({ data: res.data }))
  }

  render(){
    console.log(this.state.data)
    return(
      <div>


        <section className="hero is-danger home-section">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Start selling your upcycled creations
              </h1>
              <Link to='/sell'><button className="button">Add a listing now</button></Link>
            </div>
          </div>
        </section>

        <div className="container">
          <h2>New items for sale</h2>
          <section className="columns is-multiline">
            {this.state.data.map(listing =>
              <div key={listing.id} className="listing-wrapper column is-one-quarter">
                <ListingCard {...listing} />
              </div>
            ).slice(-5, -1)}
          </section>
          <div className="more-link">
            <button className="button">
              <Link to='/browse'>Browse all items</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }


}


export default Home
