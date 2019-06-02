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
        {this.state.data.map(listing =>
          <div key={listing.id} className="hero is-medium home-hero" style={{ backgroundImage: `url(${listing.image})` }}>
            <div className="hero-body">
              <div className="container home-box">
                <h1 className="home-title">
                  <Link to={`/listings/${listing.id}`}>{listing.title}</Link>
                </h1>
                <div className="home-description">
                  {listing.description}
                </div>
              </div>

            </div>
          </div>).slice(-1)}
        <div className="container">
          <section className="columns is-multiline">
            {this.state.data.map(listing =>
              <div key={listing.id} className="listing-wrapper column is-one-quarter">
                <ListingCard {...listing} />
              </div>
            ).slice(-6, -2)}
          </section>
        </div>
      </div>
    )
  }


}


export default Home
