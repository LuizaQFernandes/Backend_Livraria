//cSpell: ignore genero, codigobarra, preco

const Livro = require("../model/Livro");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//Lista todos os livros
router.get("/", async (req, res) => {
  try {
    const livros = await Livro.find().sort({ titulo: 1 });
    res.json(livros);
  } catch (e) {
    res.send({ error: `Erro ao obter os dados dos livros: ${e.message}` });
  }
});

// Insere um novo livro
router.post("/",
  [
    check("titulo", "Informe o titulo do livro").not().isEmpty(), // verifica se tudo está no formato correto
    check("autor", "Informe o nome do autor").not().isEmpty(),
    check("genero", "Informe o gênero do livro").not().isEmpty(),
    check("codigobarra", "Informe um código de barra com 13 números").isNumeric().isLength({ min: 13, max: 13 }),
    check("preco", "Informe um preço válido").isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, autor, genero, codigobarra, preco } = req.body;

    try 
    {
      let livro = new Livro({ titulo, autor, genero, codigobarra, preco });
      await livro.save();
      res.send(livro);
    } catch (err) 
    {
      return res.status(500).json({
        errors: `Erro ao salvar o livro: ${err.message}`,
      });
    }
  }
);

//Lista um único livro pelo ID
router.get("/:id", async (req, res) => {
  await Livro.findById(req.params.id)
    .then((livro) => {
      res.send(livro);
    })
    .catch((err) => {
      return res.status(400).send({
        message: `Erro ao obter o livro com o id ${req.params.id}`,
      });
    });
});

// Apaga um determinado livro por ID
router.delete("/:id", async (req, res) => {
  await Livro.findByIdAndRemove(req.params.id)
    .then((livro) => {
      res.send({ message: "Livro removido com sucesso!" });
    })
    .catch((err) => {
      return res.status(400).send({
        message: `Não foi possível remover o livro com o id ${req.params.id}`,
      });
    });
});

// Edita o livro informado
router.put("/",
  [
    check("titulo", "Informe o titulo do livro").not().isEmpty(),
    check("autor", "Informe o nome do autor").not().isEmpty(),
    check("genero", "Informe o gênero do livro").not().isEmpty(),
    check("codigobarra", "Informe um código de barra com 13 números").isNumeric().isLength({ min: 13, max: 13 }),
    check("preco", "Informe um preço válido").isFloat({ min: 0 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });

    }

    //coloca todo o body dentro de dados
    let dados = req.body;
    await Livro.findByIdAndUpdate(
      req.body._id, {
        $set: dados,
      },
      { 
        new: true //traz os dados q foram alterados
      },

      function (err, result) { //se der erro envia a mensagem, senão inclui o novo registro
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
);
module.exports = router;
