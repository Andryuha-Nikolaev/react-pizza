import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { setCategoryId, setCurrentPage, selectFilter } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas, pageCount, selectPizzasData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, loading, pageCountNumber } = useSelector(selectPizzasData);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  }, []);

  const onChangePage = React.useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, []);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      pageCount({
        order,
        sortBy,
        category,
        search,
      }),
    );

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

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
          {loading === 'succeeded' && !items.length && (
            <div className="content__error-info">
              <h2>
                Ничего не найдено <span>😕</span>
              </h2>
              <p>Попробуйте изменить поисковой запрос.</p>
            </div>
          )}
          <div className="content__items">{loading === 'pending' ? skeletons : pizzas}</div>
        </>
      )}
      <Pagination
        itemsCount={pageCountNumber}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
