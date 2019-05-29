import React from 'react'
import Auth from '../../lib/Auth'

import axios from 'axios'

class Cart extends React.Component{
  constructor(){
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount(){

    const token = Auth.getToken()

    axios.get('api/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
  }

  render(){
    console.log(this.state.data)
    return(
      <h1>Hello</h1>
    )
  }

}

export default Cart
