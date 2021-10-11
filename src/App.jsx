/* eslint-disable no-undef */
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';
import listings from './pages/listings/listings'
import product from './pages/product/product'


function App() {

  // componentDidMount() {
  //   this.callBackendAPI()
  //     .then(res => this.setState({ data: res.express }))
  //     .catch(err => console.log(err));
  // }

  return (
    <Router>
      <Switch>
        <Route path="/" component={listings} exact />
        <Route path="/product/:productId" component={product} />
      </Switch>
    </Router>
  );
}

export default App;