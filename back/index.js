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

// Middleware para verificação de token
const verificaToken = (req, res, next) => {
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
      const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');
      const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
      const user = usuarios.find((u) => u.id === decoded.id);
  
      // Se usuário não existir, retorna erro
      if (!user) {
        return res.status(401).json({ error: 'Não autorizado' });
      }
  
      // Adiciona informações do usuário ao objeto de solicitação para uso posterior nas rotas
      req.user = user;
  
      // Chama a próxima função middleware na cadeia
      next();
    });
};  

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
    if (usuarios.find((u) => u.username === username || u.email === email)) {
        return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criptografa senha
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(password, salt);

    const ultimoUser = usuarios.slice(-1)[0];
    
    // Cria usuário
    const user = new User(ultimoUser.id + 1, username, email, senhaCrypt);
    
    // Adiciona usuário no "banco"
    usuarios.push(user);
    fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2));
    
    // Retorna usuário
    res.status(201).json({message: 'Usuário criado com sucesso!'});
});

// Rota para informações do usuário
app.get('/users', verificaToken, async (req, res) => {   
    const user = req.user;
    
    const usuarioRet = {
        username: user.username,
        email: user.email
    };
    
    // Retorna usuário
    res.json(usuarioRet);
});

// Rota para atualização de usuário (username e email)
app.put('/users', verificaToken, async (req, res) => {
    const user = req.user;

    const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    const userArquivo = usuarios.find((u) => u.id === user.id);

    // Se usuário já existir, retorna erro
    if (usuarios.find((u) => u.username === req.body.username || u.email === req.body.email)) {
        return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Atualiza usuário
    try{
        if (req.body.username){
            userArquivo.username = req.body.username;
        }else if (req.body.email){
            userArquivo.email = req.body.email;
        }else{
            Exception('Erro ao atualizar usuário');
        }

        fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2));

        // Retorna usuário
        const usuarioRet = {
            username: userArquivo.username,
            email: userArquivo.email
        };
        res.json(usuarioRet);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Rota para atualização de senha
app.put('/users/password', verificaToken, async (req, res) => {
    const user = req.user;

    const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    const userArquivo = usuarios.find((u) => u.id === user.id);

    // Verifica senha atual
    const passwordValidado = await bcrypt.compare(req.body.password, userArquivo.password);

    // Se senha não bater, retorna erro
    if (!passwordValidado) {
        return res.status(401).json({ error: 'Senha inválida' });
    }

    // Verifica confirmação de senha
    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(401).json({ error: 'Confirmação de senha inválida' });
    }

    // Criptografa nova senha
    const salt = await bcrypt.genSalt(10);
    const senhaCrypt = await bcrypt.hash(req.body.newPassword, salt);

    // Atualiza senha
    try{
        userArquivo.password = senhaCrypt;
        fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2));

        // Retorna confirmação
        res.json({message: 'Senha atualizada com sucesso!'});
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao atualizar senha' });
    }
});

// Rota para deletar usuário
app.delete('/users', verificaToken, async (req, res) => {
    const user = req.user;

    const jsonPath = path.join(__dirname, '.', 'db', 'usuarios', 'usuarios.json');   // Caminho do arquivo JSON (/db/usuarios/users.json)
    const usuarios = JSON.parse(fs.readFileSync(jsonPath, { encoding: 'utf8', flag: 'r' }));
    const userArquivo = usuarios.find((u) => u.id === user.id);

    console.log(usuarios.indexOf(userArquivo));

    // Deleta usuário
    usuarios.splice(usuarios.indexOf(userArquivo), 1);
    fs.writeFileSync(jsonPath, JSON.stringify(usuarios, null, 2));
    
    // Retorna confirmação
    res.json({message: 'Usuário apagado com sucesso!'});
});