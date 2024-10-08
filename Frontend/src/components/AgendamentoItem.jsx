// src/components/AgendamentoItem.js
import React, { useState } from 'react';
import axios from 'axios';

const AgendamentoItem = ({ agendamento, onDelete, onUpdate }) => {
  const [editando, setEditando] = useState(false);
  const [agendamentoAtualizado, setAgendamentoAtualizado] = useState(agendamento);

  const handleChange = (e) => {
    setAgendamentoAtualizado({ ...agendamentoAtualizado, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/agendamentos-vale-gas/${agendamento.id_agendamento}`, agendamentoAtualizado);
      onUpdate(agendamentoAtualizado);
      setEditando(false);
      alert('Cadastro atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar cadastro.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      {editando ? (
        <>
          <input type="text" name="nome_pessoa" value={agendamentoAtualizado.nome_pessoa} onChange={handleChange} />
          <input type="text" name="contato_telefonico" value={agendamentoAtualizado.contato_telefonico} onChange={handleChange} />
          <input type="email" name="email" value={agendamentoAtualizado.email} onChange={handleChange} />
          <input type="date" name="data_agendamento" value={agendamentoAtualizado.data_agendamento} onChange={handleChange} />
          <input type="text" name="local_retirada" value={agendamentoAtualizado.local_retirada} onChange={handleChange} />
          <select name="status" value={agendamentoAtualizado.status} onChange={handleChange}>
            <option value="Pendente">Pendente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <p><strong>Nome:</strong> {agendamento.nome_pessoa}</p>
          <p><strong>Telefone:</strong> {agendamento.contato_telefonico}</p>
          <p><strong>Email:</strong> {agendamento.email}</p>
          <p><strong>Data do Agendamento:</strong> {agendamento.data_agendamento}</p>
          <p><strong>Local de Retirada:</strong> {agendamento.local_retirada}</p>
          <p><strong>Status:</strong> {agendamento.status}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
          <button onClick={() => onDelete(agendamento.id_agendamento)}>Deletar</button>
        </>
      )}
    </div>
  );
};

export default AgendamentoItem;
