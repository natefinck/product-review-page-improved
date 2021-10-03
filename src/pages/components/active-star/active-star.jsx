import React, { useState } from 'react';
// import { FaStar } from 'react-icons/fa';
import './style.scss'

const StarRating = () => {
  const[rating, setRating] = useState(0);

  function getRating(e) {
    setRating(e.target.value/2);
  }

  return (
    <div>

      {/* // <!--
        // I was in seek of a star rating system that used radio inputs for accessibility fallbacks and through some trial and error as well as the very robust solution by James Barnett I was able to 

        // Exploring many solutions:
        // fork of https://codepen.io/jamesbarnett/pen/vlpkh
        // http://lea.verou.me/2011/08/accessible-star-rating-widget-with-pure-css/
        // http://www.yuiblog.com/blog/2010/08/24/developing-an-accessible-star-ratings-widget/
        // https://css-tricks.com/star-ratings/
        // --> */}

      <fieldset className="rate" onClick={getRating}>
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
      <h1>{rating}</h1>

      {/* {[...Array(5)].map((star, i) => {
        const ratingValue = i+1;

        return (
        //   <label className="starLabel" key={i}>
        //     <input 
        //       type="radio"
        //       name="rating"
        //       value={ratingValue}
        //       onClick={() => setRating(ratingValue)}> 
        //     </input>
        //     <input 
        //       type="radio"
        //       name="rating"
        //       value={ratingValue+1}
        //       onClick={() => setRating(ratingValue+1)}> 
        //     </input>
        //     <FaStar 
        //       className="ratingStar" 
        //       color={ratingValue <= rating ? '#FFDC69' : '#e4e5e9'}
        //       size={40}></FaStar>
        //   </label>


        );
      })} */}
    </div>
  )
}

export default StarRating;