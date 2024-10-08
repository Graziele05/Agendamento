
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgendamentoItem from './AgendamentoItem';

const AgendamentoList = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/agendamentos-vale-gas');
      setAgendamentos(response.data);
    } catch (error) {
      alert('Erro ao buscar cadastros.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/agendamentos-vale-gas/${id}`);
      setAgendamentos(agendamentos.filter((agendamento) => agendamento.id_agendamento !== id));
      alert('Cadastro deletado com sucesso!');
    } catch (error) {
      alert('Erro ao deletar cadastro.');
    }
  };

  const handleUpdate = (updatedAgendamento) => {
    setAgendamentos(
      agendamentos.map((agendamento) =>
        agendamento.id_agendamento === updatedAgendamento.id_agendamento ? updatedAgendamento : agendamento
      )
    );
  };

  return (
    <div>
      <h2>Lista de Cadastros</h2>
      {agendamentos.map((agendamento) => (
        <AgendamentoItem
          key={agendamento.id_agendamento}
          agendamento={agendamento}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default AgendamentoList;
