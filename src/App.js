import React, { useState, useEffect } from 'react';

import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://6397233886d04c76338c00d0.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock
                // title={obj.title}
                // price={obj.price}
                // imageUrl={obj.imageUrl}
                // sizes={obj.sizes}
                // types={obj.types}
                //
                key={obj.id}
                {...obj}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
