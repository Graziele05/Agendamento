import mysql from 'mysql';


const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',   
  password: 'password', 
  database: 'vale_gas'
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

export default db;
