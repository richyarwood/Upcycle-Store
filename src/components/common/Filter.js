import React from 'react'
import axios from 'axios'

class Filter extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      categories: [],
      filters: 1
    }

    this.toggleFilter = this.toggleFilter.bind(this)
  }

  componentDidMount(){
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
  }


  // APPLIES A-Z SORT FOR CATEGORIES ===========================
  sortedCategories() {
    return this.state.categories.sort((a, b) => {
      if (a.name === b.name) return 0
      return a.name < b.name ? -1 : 1
    })
  }

  toggleFilter(filter){
    this.setState({ filters: filter })
  }

  render(){
    return(
      <div className="filter-wrapper">
        {this.sortedCategories().map(filter =>
          <div key={filter.id}
            className={`filter-button${this.state.filters !== filter ? '' : ' highlighted' }`}
            id={filter.id}
            onClick={() => this.toggleFilter(filter)}
          >{filter.name}</div>)}
      </div>
    )
  }

}

export default Filter
