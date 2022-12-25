import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const order = sortType.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6397233886d04c76338c00d0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isloading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
};

export default Home;
