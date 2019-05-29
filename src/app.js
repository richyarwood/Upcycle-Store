import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'


import Home from './components/common/Home'
import NavBar from './components/common/NavBar'

import 'bulma'
import './style.scss'

class App extends React.Component{

  render(){

    return(
      <Router>
        <main>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
