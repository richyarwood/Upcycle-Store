import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/common/Home'

import 'bulma'
import './style.scss'

class App extends React.Component{

  render(){

    return(
      <main>
        <Home />
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
