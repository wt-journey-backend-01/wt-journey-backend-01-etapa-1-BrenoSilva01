const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// funcoes para o express usar entre o cliente e servidor
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// rota get da index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// rota get da sugestao de ingrediente
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;

  if (!nome || !ingredientes) {
    return res.status(400).send('<p>Por favor, preencha todos os campos.</p><a href="/">Voltar</a>');
  }

  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Recebemos sua ideia de lanche com os seguintes ingredientes:</p>
    <p><strong>${ingredientes}</strong></p>
    <a href="/">Voltar ao início</a>
  `);
});

// rota get do contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// rota post do contato
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).send('<p>Todos os campos são obrigatórios.</p><a href="/contato">Voltar</a>');
  }

  res.send(`
    <h1>Mensagem Recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

// rota get da api dos lanches feita por mim no lanches.json
app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao carregar os lanches.' });
    }

    const lanches = JSON.parse(data);
    res.status(200).json(lanches);
  });
});


// starta o server
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
