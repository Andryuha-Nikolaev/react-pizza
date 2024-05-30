import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState<{ imageUrl: string; title: string }>();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPizza = async () => {
    try {
      const { data } = await axios.get(`https://6397233886d04c76338c00d0.mockapi.io/items/${id}`);
      setPizza(data);
    } catch {
      alert('Ошибка при получении пиццы!');
      navigate('/');
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
      <img src={pizza.imageUrl} alt={pizza.title}></img>
      <h2>{pizza.title}</h2>
    </div>
  );
};

export default FullPizza;
