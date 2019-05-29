import React from 'react'
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate'

const ListingCard = (props) => {
  console.log(props)
  return(
    <div>
      <div>
        <img src={props.image} alt={props.title} />
      </div>
      <div className="listing-title">
        <Link to={`/listings/${props.id}`}>{props.title}</Link>
      </div>
      <div className="listing-price">
        £{props.price}
      </div>
      <div className="listing-postage">
        Postage: £{props.postage}
      </div>
      <div className="listing-description"><Truncate lines={3} ellipsis={<span>...</span>}>
        {props.description}
      </Truncate></div>
      <div className="listing-categories">
        {props.categories.map(category =>
          <div key={category.id} className="category">
            {category.name}
          </div>
        )}
      </div>
    </div>
  )

}

export default ListingCard
