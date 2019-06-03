import React from 'react'
import axios from 'axios'

class Register extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
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

    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.error }))
  }

  render() {
    console.log(this.state.data)
    console.log(this.state.errors)
    return (
      <div className="container form-wrapper">
        <div className="columns is-centered">
          <div className="column">
            <h1 className="form-title">Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    name="username"
                    placeholder="eg: richie"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <div className="help is-danger">{this.state.errors.username}</div>}
              </div>
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
                {this.state.errors.email && <div className="help is-danger">{this.state.errors.email}</div>}
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
                {this.state.errors.password && <div className="help is-danger">{this.state.errors.password}</div>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className="input"
                    name="password_confirmation"
                    type="password"
                    placeholder="eg: ••••••••"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password_confirmation && <div className="help is-danger">{this.state.errors.password_confirmation}</div>}
              </div>
              <button className="button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
