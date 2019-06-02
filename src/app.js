import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


import Home from './components/common/Home'
import NavBar from './components/common/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ListingShow from './components/listings/ListingShow'
import Cart from './components/common/Cart'
import ListingNew from './components/listings/ListingNew'
import ListingIndex from './components/listings/ListingIndex'
import Footer from './components/common/Footer'

import 'bulma'
import './style.scss'

class App extends React.Component{

  render(){

    return(
      <Router>
        <main>
          <NavBar />
          <Switch>
            <Route path="/listings/:id" component={ListingShow} />
            <Route path="/sell" component={ListingNew} />
            <Route path="/browse" component={ListingIndex} />
            <Route path="/cart" component={Cart} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </main>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
