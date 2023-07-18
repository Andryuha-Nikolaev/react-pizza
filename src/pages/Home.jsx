import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, loading } = useSelector((state) => state.pizza);

  const { searchValue } = React.useContext(SearchContext);
  const [itemsCount, setItemsCount] = useState(1);

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const resItemsCount = await axios.get(
        `https://6397233886d04c76338c00d0.mockapi.io/items?&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      setItemsCount(Math.ceil(resItemsCount.data.length / 4));
    } catch (error) {
      console.log('ERROR:', error);
      alert('Ошибка при получении данных');
    }

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  //если изменили параметры и был первый рендер
  //получаем строку из параметров сортировки, категории, выбранной страницы
  //для добавления в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  //проверка, есть ли параметры поиска в адресной строке при первой загрузке
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //если был первый рендер, то запрашиваем пиццы
  //получение пицц с сервера
  useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }
    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {loading === 'failed' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Не удалось получить пиццы.</p>

          <p>Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {loading === 'pending'
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
          </div>

          <Pagination
            itemsCount={itemsCount}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
