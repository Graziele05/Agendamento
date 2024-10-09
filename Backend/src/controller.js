import db from "./db.js";

export const getAllAgendamentos = (req, res) => {
    const sql = "SELECT * FROM agendamentos";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
};

export const createAgendamento = (req, res) => {
    const { nome_pessoa, contato_telefonico, email, data_agendamento, local_retirada} = req.body;
    const sql = "INSERT INTO agendamentos (nome_pessoa, contato_telefonico, email, data_agendamento, local_retirada) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nome_pessoa, contato_telefonico, email, data_agendamento, local_retirada], (err, result) => {
        if (err) {
            console.error('Erro ao criar agendamento:', err);
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId });
    });
};


export const updateAgendamento = (req, res) => {
    const { nome_pessoa, contato_telefonico, email, data_agendamento, local_retirada } = req.body;
    const sql = "UPDATE agendamentos SET nome_pessoa = ?, contato_telefonico = ?, email = ?, data_agendamento = ?, local_retirada = ? WHERE id_agendamento = ?";
    db.query(sql, [nome_pessoa, contato_telefonico, email, data_agendamento, local_retirada, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Agendamento atualizado com sucesso');
    });
};


export const deleteAgendamento = (req, res) => {
    const sql = "DELETE FROM agendamentos WHERE id_agendamento = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Agendamento excluído com sucesso');
    });
};
