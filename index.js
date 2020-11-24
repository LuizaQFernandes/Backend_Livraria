//cSpell: Ignore versao usuario
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const InicializaMongoServer = require('./config/db')
const livro = require('./routes/Livro')

InicializaMongoServer()

const app = express()

const PORT = process.env.PORT || 4000

//Middle........................
app.use(function(req,res,next){
    //em produção remova o * e informe a sua url
    res.setHeader('Access-Control-Allow-Origin', '*')
    //Cabeçalhos que serão permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    //MÉtodos q serão permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

//parse json validação
app.use(bodyParser.json())

app.get ('/', (req, res) => {
    res.json({mensagem: 'API 100% FUNCIONAL',
                versao: '1.0.0' })
})

//rotas do livro
app.use('/livros', livro)

app.listen(PORT, (req, res) => {
    console.log(`💻Servidor iniciado na porta ${PORT}`)
})