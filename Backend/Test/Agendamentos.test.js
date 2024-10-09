import { createAgendamento } from '/Users/Administrador/Downloads/Agendamento/Backend/src/controller'; 
import db from '../db'; 


jest.mock('../db');

describe('Testando a função createAgendamento', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    test('deve criar um novo agendamento com as propriedades corretas', async () => {
        const mockRequest = {
            body: {
                nome_pessoa: 'John Doe',
                contato_telefonico: '123456789',
                email: 'john.doe@example.com',
                data_agendamento: '2024-10-15',
                local_retirada: 'Endereço de retirada'
            }
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: 1 }); 
        });

        await createAgendamento(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.send).toHaveBeenCalledWith({ id: 1 });
    });

    test('deve retornar erro ao tentar criar um agendamento com dados inválidos', async () => {
        const mockRequest = {
            body: {
                nome_pessoa: 'Grazita', 
                contato_telefonico: '123456789',
                email: 'john.doe@example.com',
                data_agendamento: '2024-10-15',
                local_retirada: 'Endereço de retirada'
            }
        };

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Erro ao criar agendamento'));
        });

        await createAgendamento(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(expect.any(Error));
    });
});
