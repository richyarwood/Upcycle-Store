import React from 'react'

import axios from 'axios'

class Filter extends React.Component{

  constructor(){
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    axios.get('/api/categories')
      .then(res => this.setState({ data: res.data }))
  }

  render(){
    return(

      <h1>Hello filters</h1>
    )
  }

}

export default Filter
