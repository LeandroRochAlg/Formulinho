require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Abrindo servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

const User = require('./model/User');

// Rota para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Busca usuário no "banco"
    const jsonPath = path.join(__dirname, 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));

    const user = usuarios.find((u) => u.username === username);
    
    // Se usuário não existir, retorna erro
    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const passwordValidado = await bcrypt.compare(password, user.password);
    
    // Se senha não bater, retorna erro
    if (!passwordValidado) {
        return res.status(401).json({ error: true, message: 'Senha inválida' });
    }
    
    // Gerar token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: '15m',    // Expira em 15 minutos
    });
    
    // Retorna token
    res.json({"token": token});
});

// Rota para cadastro
app.post('/create', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    
    // Busca usuário no "banco"
    const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    
    // Se usuário já existir, retorna erro
    if (usuarios.find((u) => u.email === email)) {
        return res.status(402).json({ error: 'Usuário já existe' });
    }

    // Se senha e confirmação de senha não baterem, retorna erro
    if (password !== confirmPassword) {
        return res.status(403).json({ error: 'Senha e confirmação de senha não batem' });
    }
    
    // Criptografa senha
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(password, salt);
    
    // Cria usuário
    const user = new User(usuarios.length + 1, username, email, senhaCrypt);
    
    // Adiciona usuário no "banco"
    usuarios.push(user);
    fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2));
    
    // Retorna usuário
    res.status(201).send('Usuário criado com sucesso!');
});