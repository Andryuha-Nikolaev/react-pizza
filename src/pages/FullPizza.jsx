import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPizza = async () => {
    try {
      const { data } = await axios.get(`https://6397233886d04c76338c00d0.mockapi.io/items/${id}`);
      setPizza(data);
    } catch {
      navigate('/');
      alert('Ошибка при получении пиццы!');
    }
  };

  useEffect(() => {
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="пицца"></img>
      <h2>{pizza.title}</h2>
    </div>
  );
};

export default FullPizza;
