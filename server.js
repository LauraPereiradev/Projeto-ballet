const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let usuarios = [
  { id: 1, nome: "Ana Laura", cpf: "11111111111", nascimento: "2005-10-10" },
  { id: 2, nome: "João Silva", cpf: "22222222222", nascimento: "2000-05-20" }
];

app.get('/', (req, res) => {
  res.send({ status: "API rodando corretamente!" });
});

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

app.post('/cadastro', (req, res) => {
  const { nome, cpf, nascimento } = req.body;

  if (!nome || !cpf || !nascimento) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const existe = usuarios.some(u => u.cpf === cpf);

  if (existe) {
    return res.status(409).json({ erro: "Este CPF já está cadastrado." });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    cpf,
    nascimento
  };

  usuarios.push(novoUsuario);
  console.log("Novo usuário cadastrado:", novoUsuario);

  res.json({
    mensagem: "Cadastrado com sucesso!",
    usuario: novoUsuario
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
