/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './style.scss'

// eslint-disable-next-line react/prop-types
const StarRating = ({rating, onchange}) => {
  const[userRating, setUserRating] = useState(0);

  function setRatingOnClick(e) {
    let value = e.target.value/2
    if (!isNaN(parseFloat(value))) {
      setUserRating(value);
      onchange(value);
    }
  }

  return (
    <div className="activeRatingContainer">

      {/* 
        Half star rating system from https://codepen.io/anefzaoui/pen/NWPZzMa
       */}

      <fieldset className="rate" onClick={setRatingOnClick}>
        <input type="radio" id="rating10" name="rating" value="10" /><label htmlFor="rating10" title="5 stars"></label>
        <input type="radio" id="rating9" name="rating" value="9" /><label className="half" htmlFor="rating9" title="4 1/2 stars"></label>
        <input type="radio" id="rating8" name="rating" value="8" /><label htmlFor="rating8" title="4 stars"></label>
        <input type="radio" id="rating7" name="rating" value="7" /><label className="half" htmlFor="rating7" title="3 1/2 stars"></label>
        <input type="radio" id="rating6" name="rating" value="6" /><label htmlFor="rating6" title="3 stars"></label>
        <input type="radio" id="rating5" name="rating" value="5" /><label className="half" htmlFor="rating5" title="2 1/2 stars"></label>
        <input type="radio" id="rating4" name="rating" value="4" /><label htmlFor="rating4" title="2 stars"></label>
        <input type="radio" id="rating3" name="rating" value="3" /><label className="half" htmlFor="rating3" title="1 1/2 stars"></label>
        <input type="radio" id="rating2" name="rating" value="2" /><label htmlFor="rating2" title="1 star"></label>
        <input type="radio" id="rating1" name="rating" value="1" /><label className="half" htmlFor="rating1" title="1/2 star"></label>
      </fieldset>
      <h1>{userRating.toString()}</h1>
    </div>
  )
}

export default StarRating;