
import React from 'react';
import "../../styles/errors/Page404.css";
import { GiFlatTire } from "react-icons/gi";

const NotFoundPage = () => {
  return (
    <div className='error-body'>
      <h1>Erro 404</h1>
      <h2> Página não encontrada </h2>
      <GiFlatTire className='error-icon' size={100}/>
      <p>Acho que seu pneu furou no caminho!</p>
    </div>
  );
};

export default NotFoundPage;
