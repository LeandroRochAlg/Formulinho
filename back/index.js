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
        return res.status(401).json({ error: 'Senha inválida' });
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
    
    // Busca usuário no "banco"
    const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    
    // Se usuário já existir, retorna erro
    if (usuarios.find((u) => u.username === username)) {
        return res.status(400).json({ error: 'Usuário já existe' });
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
    res.status(201).json({message: 'Usuário criado com sucesso!'});
});

// Rota para busca de corridas
app.get('/search/:busca/:ano', async (req, res) => {
    const params = req.params;
    const busca = params.busca;
    
    // Busca circuitos
    const circuitos = 'https://ergast.com/api/f1/circuits.json?limit=1000';
    const response = await fetch(circuitos);
    const data = await response.json();

    const circuitosBusca = [];
    const corridasBusca = [];

    //Buscando circuitos
    data.MRData.CircuitTable.Circuits.forEach((circuito) => {
        if (circuito.circuitName.toLowerCase().includes(busca.toLowerCase()) || circuito.Location.country.toLowerCase().includes(busca.toLowerCase()) || circuito.Location.locality.toLowerCase().includes(busca.toLowerCase())) {
            circuitosBusca.push(circuito.circuitId);
        }
    });
    
    //Se não encontrar circuitos, retorna erro
    if (circuitosBusca.length === 0) {
        return res.status(400).json({ error: 'Nenhum circuito encontrado' });
    }

    // Busca corridas
    const corridas = `https://ergast.com/api/f1/${params.ano}/results.json?limit=1000`;
    const responseCor = await fetch(corridas);
    const dataCor = await responseCor.json();

    //Buscando corridas
    dataCor.MRData.RaceTable.Races.forEach((corrida) => {
        if (circuitosBusca.includes(corrida.Circuit.circuitId)) {
            corridasBusca.push(corrida);
        }
    });

    //Se não encontrar corridas, retorna erro
    if (corridasBusca.length === 0) {
        return res.status(400).json({ error: 'Nenhuma corrida encontrada' });
    }
    
    // Retorna corridas
    res.status(201).json(corridasBusca);
});

// Rota para informações do usuário
app.get('/user', async (req, res) => {
    // Busca token
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    
    // Se não tiver token, retorna erro
    if (!token) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    
    // Verifica token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
        
        // Busca usuário no "banco"
        const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
        const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
        const user = usuarios.find((u) => u.id === decoded.id);
        
        // Se usuário não existir, retorna erro
        if (!user) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        const usuarioRet = {
            username: user.username,
            email: user.email
        };
        
        // Retorna usuário
        res.json(usuarioRet);
    });
});