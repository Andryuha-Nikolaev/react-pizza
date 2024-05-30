import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemProps, addItem, selectCartItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { PizzaProps } from '../../redux/slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';

const typeNames = ['тонкое', 'традиционное'];

const PizzaBlock: React.FC<PizzaProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useAppDispatch();

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const data = `${id}${typeNames[activeType]}${sizes[activeSize]}`;

  const cartItem = useSelector(selectCartItem(data));

  const addedCount = cartItem ? cartItem.count : 0;

  const currentPrice =
    sizes[activeSize] === 26 ? price : sizes[activeSize] === 30 ? price * 1.2 : price * 1.4;

  const currentPriceCeil = Math.ceil(currentPrice);

  const addItemClick = () => {
    const item: CartItemProps = {
      id,
      title,
      price: currentPriceCeil,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      data: data,
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{currentPriceCeil} ₽</div>
          <button onClick={addItemClick} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
