// App.js

import React from 'react';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={AllProducts} />
        <Route path="/product/:id" component={ProductDetails} />
      </div>
    </Router>
  );
}

export default App;
