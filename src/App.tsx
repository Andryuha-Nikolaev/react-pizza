import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';

const Cart = lazy(() => import('./pages/Cart'));
const FullPizza = lazy(() => import('./pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
