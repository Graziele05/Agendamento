import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topo.css';

const Topo = () => {
  const navigate = useNavigate(); 

  return (
    <header className="topo">
      <div className="container">
        <h1>Agendamento de Vale Gás</h1>
        <nav>
          <ul>
            <li onClick={() => navigate('/')}>Home</li> {/* Navega para Home */}
            <li onClick={() => navigate('./components/agendamentoForm')}>Agendar</li> {/* Navega para Agendar */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Topo;
