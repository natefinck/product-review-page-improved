/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function App(props) {
  // eslint-disable-next-line react/prop-types
  const { productId } = useParams();
  const { product, setProduct } = useState(null);

  useEffect(() => {
    async function getProduct() {
      try {
        await axios.get(
          `http://localhost:5000/products/` + productId
        ).then(res => {
          const data = res.data;
          console.log(data);
          setProduct(data);
        });
      } catch (err) {
        return err;
      }
    }

    getProduct();
  },[setProduct]);

  return (
    <div className="App">
      <div className="card">
        {
          !product && 
          <div>
            <h1>no product</h1>
          </div>
        }
        {product && 
          <div>
            <div className="productContainer">
              <div className="title" id="title">
                <h1>
                  
                </h1>
              </div>
              <div className="info">
                <div className="rating">
                  <div className="stars" id="stars">
                    {/* stars */}
                  </div>
                  <div className="number" id="number">

                  </div>
                </div>
                <div className="buttonContainer">
                  <button>Add Review</button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="reviewsContainer">
              <h3>Reviews</h3>
              <div className="reviews" id="reviews">
                {/* reviews */}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;