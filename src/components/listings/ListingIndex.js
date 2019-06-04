import React from 'react'
import axios from 'axios'
import Promise from 'bluebird'

import ListingCard from './ListingCard'

class ListingIndex extends React.Component{
  constructor(){
    super()

    this.state = {
      data: [],
      categories: [],
      filters: {
        name: 'All'
      }
    }

    this.toggleFilter = this.toggleFilter.bind(this)
  }

  componentDidMount(){
    Promise.props({
      data: axios.get('/api/listings').then(res => res.data),
      categories: axios.get('/api/categories').then(res => res.data)
    })
      .then(res => this.setState({ data: res.data, categories: res.categories })
      )
  }

  // APPLIES A-Z SORT FOR CATEGORIES =========================
  sortedCategories() {
    return this.state.categories.sort((a, b) => {
      if (a.name === b.name) return 0
      return a.name < b.name ? -1 : 1
    })
  }

  // PUTS THE LISTINGS IN TO DESCENDING ORDER OF ID ==========
  sortedListings() {
    return this.state.data.sort((a, b) => {
      return b.id - a.id
    })
  }

  //FILTERS THS LISTINGS BASED ON THE SELECTED FILTER =======
  filteredListings() {
    const filter = this.state.filters.name
    if (this.state.filters.name === 'All') return this.sortedListings()
    return this.sortedListings().filter(category => {
      return category.categories.some(category => category.name === filter)
    })
  }

  // CONTROLS THE FILTER STATE ==============================
  toggleFilter(filter){
    this.setState( { filters: { name: filter } })
  }

  render(){
    return(
      <div className="container">
        <div className="filter-wrapper">
          <div
            className={`filter-button${this.state.filters.name !== 'All' ? '' : ' highlighted' }`}
            onClick={() => this.toggleFilter('All')}>All</div>
          {this.sortedCategories().map(filter =>
            <div key={filter.id}
              className={`filter-button${this.state.filters.name !== filter.name ? '' : ' highlighted' }`}
              id={filter.id}
              onClick={() => this.toggleFilter(filter.name)}
            >{filter.name}</div>)}
        </div>

        <section className="columns is-multiline">
          {this.filteredListings().map(listing =>
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
