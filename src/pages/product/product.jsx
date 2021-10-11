/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/static-star/static-star';
import ActiveStarRating from '../components/active-star/active-star';
import Modal from 'react-modal';
import Error from '../components/error/error';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
Modal.setAppElement('#root');

function App(props) {
  // eslint-disable-next-line react/prop-types
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productRating, setProductRating] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [reviewTextarea, setreviewTextarea] = useState('');
  const [reviewRating, setReviewRating] = useState(0);

  function getAverageRating(product) {
    let total = 0;
    let length = product.reviews.length;
    for (let i = 0; i < length; i++) {
      total = total + product.reviews[i].rating;
    }
    if (length > 0) {
      return total/length;
    }
    return 0;
  }

  function tenToFiveRating(rating) {
    if (!isNaN(parseFloat(rating))) {
      return Math.round(rating)/2;
    } 
    return 0;
  }

  async function addNewProductReview(rating, review) {
    const payload = {
      rating: rating, 
      review: review
    }
    try {
      await axios.post(
        `http://localhost:5000/addProduct/` + productId, 
        payload
      ).then(res => {
        console.log(res);
        return res;
      });
    } catch (err) {
      setLoading(false);
      return err;
    }
  }

  async function getProduct() {
    try {
      await axios.get(
        `http://localhost:5000/products/` + productId
      ).then(res => {
        setProduct(res.data);
        let rating = res.data;
        console.log(rating);
        rating = getAverageRating(rating);
        console.log(rating);
        rating = tenToFiveRating(rating);
        console.log(rating);
        // let rating = tenToFiveRating(getAverageRating(res.data));
        setProductRating(rating);
        setLoading(false);
        return res;
      });
    } catch (err) {
      setLoading(false);
      return err;
    }
  }

  useEffect(() => {
    getProduct();
  },[]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const submitRatingForm = (e) => {
    e.preventDefault();
    let text = reviewTextarea.value;
    //check if review is empty
    if (!text.replace(/\s/g, '').length) {
      console.log(errorMessage);
      setErrorMessage('Please enter a review.');
      console.log(errorMessage);
    } else {
      addNewProductReview(reviewRating, reviewTextarea.value);
      setModalOpen(false);
      getProduct();
      setErrorMessage('');
      setReviewRating(0);
    }
  }

  const handleUserReviewChange = (rating) => {
    setReviewRating(rating);
  }

  return (
    <div className="App">
      <div className="card">
        {loading && 
          <div className="loadingContainer">
            <h1>Loading</h1>
            <Loader type="ThreeDots" color="#fff" height={80} width={80} />
          </div>
        }
        {!product && !loading &&
          <div>
            <h1>Invalid Product</h1>
          </div>
        }
        {product && 
          <div>
            <div className="productContainer">
              <div className="title" id="title">
                <h1>
                  { product.title }
                </h1>
              </div>
              { productRating &&
                            <div className="info">
                              <div className="rating">
                                <div className="stars" id="stars">
                                  <StarRating rating={productRating}></StarRating>
                                </div>
                                <div className="number reviewNumber" id="number">
                                  {productRating}
                                </div>
                              </div>
                              <div className="buttonContainer">
                                <button onClick={() => toggleModal()}>Add Review</button>
                              </div>
                            </div>
              }
            </div>
            <div className="divider"></div>
            <div className="reviewsContainer">
              <h3>Reviews</h3>
              <div className="reviews" id="reviews">
                {/* reviews */}
                {
                  product.reviews.map((review, i) => {
                    let rating = tenToFiveRating(review.rating);
                    return (
                      <div key={i} className="review">
                        <div className="reviewRating">
                          <div className="reviewStars">
                            <StarRating rating={rating}></StarRating>
                          </div>
                          <div className="reviewNumber">
                            { rating }
                          </div>
                        </div>
                        <div className="reviewText">
                          { review.review }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>

      {/* modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => toggleModal()}
        style={
          {
            overlay: {
              transition: '500',
              backgroundColor: 'rgba(0,0,0,0.75)'
            },
            content: {
              backgroundColor: '#424242',
              position: 'static',
              width: '400px',
              margin: '150px auto',
              border: 'none'
            }
          }
        }>
        <div className="reviewModal">
          <div className="userRatingHeader">
            <h1>What&apos;s your rating?</h1>
          </div>
          <form action="" id="userRatingForm">
            <div className="userRatingContent">
              <div className="userRating">
                <h3>Rating</h3>
                <div className="userRatingStars">
                  {/* stars */}
                  <ActiveStarRating rating={reviewRating} onchange={handleUserReviewChange}></ActiveStarRating>
                </div>
              </div>
              <div className="userReview">
                <h3>Review</h3>
                <textarea name="comment" form="userRatingForm" placeholder="What did you think?" id="review" ref={text => (setreviewTextarea(text))}></textarea>
              </div>
              {
                errorMessage != '' &&
                <Error message={errorMessage}></Error>
              }
              <input type="submit" value="Submit" className="submit" onClick={(e) => submitRatingForm(e)}></input>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;