import React from 'react';
import './style.scss'
import Star from './img/star.svg'
import HalfStar from './img/half-star.svg'


const StarRating = (props) => {
  // eslint-disable-next-line react/prop-types
  let rating = props.rating;

  function TalfStar() {
    if(rating % 1 != 0) return <img src={HalfStar}/>
    return <img src={Star} className="grayStar"/>
  }

  return (
    <div className="ratingStars">
      {
        [...Array(Math.floor(rating))].map((_, i) => 
          <img key={i} src={Star} className=""/>
        )
      }
      <TalfStar></TalfStar>
      {
        [...Array(Math.round(5-rating-1))].map((_, i) => 
          <img key={i} src={Star} className="grayStar"/>
        )
      }
    </div>
  )
}

export default StarRating;