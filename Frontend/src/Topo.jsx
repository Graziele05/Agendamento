import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topo.css';
import AgendamentoForm from './components/AgendamentoForm';

const Topo = () => {
  const navigate = useNavigate();

  return (
    <header className="topo">
      <div className="container">
        <h1>Estética Plus</h1>
        <img src="/Frontend/public/image.png" alt="" />
      </div>
    </header>
  );
};

export default Topo;
