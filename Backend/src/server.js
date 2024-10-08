import express from "express";
import cors from "cors";
import {
    getAllAgendamentos,
    createAgendamento,
    updateAgendamento,
    deleteAgendamento
} from "./Controller.js";  // Importe o controlador que criamos

const app = express();

app.use(express.json());
app.use(cors());

app.get('/agendamentos', getAllAgendamentos);
app.post('/agendamentos', createAgendamento);
app.put('/agendamentos/:id', updateAgendamento);
app.delete('/agendamentos/:id', deleteAgendamento);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
