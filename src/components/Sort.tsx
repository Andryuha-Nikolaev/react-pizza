import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setSort, selectFilter, setCurrentPage } from '../redux/slices/filterSlice';
import { SortProperty } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

type SortItem = {
  name: string;
  sortProperty: SortProperty;
};

export const sortList: SortItem[] = [
  { name: 'популярности (по убыв)', sortProperty: 'rating' },
  { name: 'популярности (по возр)', sortProperty: '-rating' },
  { name: 'цене (по убыв)', sortProperty: 'price' },
  { name: 'цене (по возр)', sortProperty: '-price' },
  { name: 'алфавиту (по убыв)', sortProperty: 'title' },
  { name: 'алфавиту (по возр)', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useAppDispatch();
  const { sort } = useSelector(selectFilter);
  const [open, setOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setCurrentPage(1));
    dispatch(setSort(obj));
    setOpen(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
