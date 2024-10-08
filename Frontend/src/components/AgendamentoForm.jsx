import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

const AgendamentoForm = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamento, setAgendamento] = useState({
    id_agendamento: null,
    nome_pessoa: '',
    contato_telefonico: '',
    email: '',
    data_agendamento: '',
    local_retirada: ''
  });

  const API_URL = 'http://localhost:3000/agendamentos'; // URL para as rotas

  // Função para buscar todos os agendamentos
  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(API_URL); // Corrigido para o endpoint correto
      setAgendamentos(response.data);
    } catch (error) {
      alert('Erro ao buscar agendamentos: ' + error.message);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const handleChange = (e) => {
    setAgendamento({ ...agendamento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (agendamento.id_agendamento) {
        // Atualizar agendamento
        await axios.put(`${API_URL}/${agendamento.id_agendamento}`, agendamento);
        alert('Agendamento atualizado com sucesso!');
      } else {
        // Criar novo agendamento
        await axios.post(API_URL, agendamento);
        alert('Cadastro criado com sucesso!');
      }
      resetForm();
      fetchAgendamentos();
    } catch (error) {
      alert('Erro ao salvar o agendamento: ' + error.message);
    }
  };

  const resetForm = () => {
    setAgendamento({
      id_agendamento: null,
      nome_pessoa: '',
      contato_telefonico: '',
      email: '',
      data_agendamento: '',
      local_retirada: ''
    });
  };

  const handleEdit = (agendamento) => {
    setAgendamento(agendamento);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Você tem certeza que deseja excluir este agendamento?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Agendamento excluído com sucesso!');
        fetchAgendamentos();
      } catch (error) {
        alert('Erro ao excluir o agendamento: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>{agendamento.id_agendamento ? 'Editar Cadastro' : 'Criar Cadastro'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome_pessoa"
          placeholder="Nome"
          value={agendamento.nome_pessoa}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contato_telefonico"
          placeholder="Telefone"
          value={agendamento.contato_telefonico}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={agendamento.email}
          onChange={handleChange}
        />
        <input
          type="date"
          name="data_agendamento"
          value={agendamento.data_agendamento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="local_retirada"
          placeholder="Local de Retirada"
          value={agendamento.local_retirada}
          onChange={handleChange}
          required
        />
        <button type="submit">{agendamento.id_agendamento ? 'Atualizar Cadastro' : 'Criar Cadastro'}</button>
      </form>

      <h2>Agendamentos</h2>
      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id_agendamento}>
            {`${agendamento.nome_pessoa} - ${agendamento.contato_telefonico}`}
            <button onClick={() => handleEdit(agendamento)}>Editar</button>
            <button onClick={() => handleDelete(agendamento.id_agendamento)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgendamentoForm;
