//cSpell: Ignore descricao, codigobarra, genero, preco
const mongoose = require('mongoose')

const ProdutoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    codigobarra: {
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Livros', ProdutoSchema)