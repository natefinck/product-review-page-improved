import './style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/static-star/static-star';

function App() {
  const[products, setProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        await axios.get(
          `/products`
        ).then(res => {
          setProducts(res.data.products.products);
          return res
        });
      } catch (err) {
        // setError(true);
        return err;
      }
    }

    getProducts();
  },[]);

  function getAverageRating(product) {
    let total = 0;
    let length = product.reviews.length;
    for (let i = 0; i < length; i++) {
      total+=product.reviews[i].rating;
    }
    return Math.round((total/length))/2;
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Products</h1>
        <div className="productsContainer">
          {!products &&
            <div className="productListing">
              <h3>Sorry, we couldn&apos;t load product data.</h3>
            </div>
          }
          {products && 
                products.map((product, index) => {
                  let rating = getAverageRating(product);
                  return (
                    <div key={index}>
                      <Link to={'/product/' + product.id}>
                        <div className="productListing">
                          <div className="title">
                            <h3>{product.title}</h3>
                          </div>
                          <div className="rating">
                            <StarRating rating={rating}></StarRating>
                            <div className="number">
                              {rating}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
                )
          }
        </div>
      </div>
    </div>
  );
}

export default App;