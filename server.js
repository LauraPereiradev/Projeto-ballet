const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Usuários simulados
const usuarios = [
  { id: 1, nome: "Ana Laura", cpf: "11111111111", nascimento: "2005-10-10" },
  { id: 2, nome: "João Silva", cpf: "22222222222", nascimento: "2000-05-20" }
];

// Rota de status
app.get('/', (req, res) => {
  res.send({ status: "API rodando corretamente!" });
});

// LOGIN
app.post('/login', (req, res) => {
  const { cpf, nascimento } = req.body;

  const usuario = usuarios.find(
    u => u.cpf === cpf && u.nascimento === nascimento
  );

  if (!usuario) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  res.json(usuario);
});

// CADASTRO
app.post('/cadastro', (req, res) => {
  const novo = req.body;

  if (!novo.nome || !novo.cpf || !novo.nascimento) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  usuarios.push(novo);
  console.log("Novo usuário cadastrado:", novo);

  res.json({ mensagem: "Cadastrado com sucesso" });
});

// 🔴 Aqui está a PORTA (apenas uma vez!)
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
