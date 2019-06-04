import React from 'react'

import axios from 'axios'
import Auth from '../../lib/Auth'

class ListingNew extends React.Component{

  constructor(){
    super()

    this.state = {
      data: {
        category_ids: []
      },
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
  }

  componentDidMount(){
    axios.get('/api/categories')
      .then(res => this.setState({ categories: res.data }))
  }

  // HANDLES STATE CHANGE FOR FORM INPUT EXCEPT CATEGORIES ======
  handleChange(e){
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data: data })
  }


  // HANDLES THE CATEGORY MULTISELECT ============================
  handleCategorySelect(e){
    const categoryIds = Array.from(new Set([
      ...this.state.data.category_ids,
      parseInt(e.target.value)
    ]))
    const data = { ...this.state.data, category_ids: categoryIds }
    this.setState({ data })
  }

  // FORM SUBMIT ================================================
  handleSubmit(e){
    const token = Auth.getToken()

    e.preventDefault()
    axios.post('/api/listings', this.state.data, {
      headers:
        {
          'Authorization': `Bearer ${token}`
        }
    })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  // APPLIES A-Z SORT FOR CATEGORIES ===========================
  sortedCategories() {
    return this.state.categories.sort((a, b) => {
      if (a.name === b.name) return 0
      return a.name < b.name ? -1 : 1
    })
  }

  render(){
    if(!this.state.categories) return null
    return(
      <div className="container">
        <div className="form-wrapper">
          <h1 className="form-title">Add a new listing</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  placeholder="eg: Designer candlesticks made from milk bottles"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.title && <div className="help is-danger">{this.state.errors.title}</div>}
            </div>
            <div className="field">
              <label className="label">Image url</label>
              <div className="control">
                <input
                  className="input"
                  name="image"
                  placeholder="eg: http://www.imagelibrary.com/vase.jpg"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.image && <div className="help is-danger">{this.state.errors.image}</div>}
            </div>
            <div className="columns is-mobile">

              <div className="field column is-one-half">
                <label className="label">Categories<br /> (select one or more)</label>
                <div className="control">
                  <div className="select is-multiple">
                    <select name="category_ids"
                      multiple size="6">
                      {this.sortedCategories().map(category =>
                        <option onClick={this.handleCategorySelect} key={category.id} value={category.id}>{category.name}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {this.state.errors.category_ids && <div className="help is-danger">{this.state.errors.category_ids}</div>}

              <div className="field column is-one-half">
                <label className="label">Number available</label>
                <div className="control">
                  <div className="select">
                    <select name="num_available" onChange={this.handleChange}>
                      <option selected value="selectone" disabled>Select one</option>
                      <option value="1">1</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </div>
                {this.state.errors.num_available && <div className="help is-danger">{this.state.errors.num_available}</div>}
                <label className="label">Price (£s)</label>
                <div className="control">
                  <input
                    className="input"
                    name="price"
                    placeholder="eg: 20"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.price && <div className="help is-danger">{this.state.errors.price}</div>}
                <label className="label">Postage (£s)</label>
                <div className="control">
                  <input
                    className="input"
                    name="postage"
                    placeholder="eg: 5.51"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.postage && <div className="help is-danger">{this.state.errors.postage}</div>}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  placeholder="Refurbish an unused dish rack to organize file folders on your desk."
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.description && <div className="help is-danger">{this.state.errors.description}</div>}
            </div>
            <button className="button">Add listing</button>
          </form>
        </div>

      </div>
    )
  }
}

export default ListingNew
