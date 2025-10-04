const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});

// Rota para pegar usuário logado (ex: via email ou token)
app.get('/usuario/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query('SELECT * FROM cadastro WHERE email=$1', [email]);
    if(result.rows.length === 0){
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(result.rows[0]);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

// Rota logout (se usar token, invalidate)
app.post('/logout', (req, res) => {
  // Aqui você pode invalidar um token JWT ou apenas responder OK
  res.json({ message: 'Logout feito com sucesso' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
