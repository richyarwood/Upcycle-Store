import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/')
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }))
  }

  render() {
    console.log(this.state)
    return (
      <div className="container form-wrapper">
        <div className="columns is-centered">
          <div className="column">
            <h1 className="form-title">Login</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    name="email"
                    placeholder="eg: richie@email.com"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>

                {this.state.error && <div className="help is-danger">{this.state.error}</div>}
              </div>

              <button className="button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
