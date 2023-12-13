import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MainLayout />}>
        <Route exact path="" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/pizza/:id" element={<FullPizza />} />
        <Route exact path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
