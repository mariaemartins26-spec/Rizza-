const tricologistaModel = require('../models/tricologistasModel');

async function listar(req, res) {
  try {
    const tricologistas = await tricologistaModel.getAll();

    res.json(tricologistas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao buscar tricologistas'
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;

    const tricologista = await tricologistaModel.getById(id);

    if (!tricologista) {
      return res.status(404).json({
        mensagem: 'Tricologista não encontrado'
      });
    }

    res.json(tricologista);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao buscar tricologista'
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos'
      });
    }

    await tricologistaModel.create(nome, email, senha);

    res.status(201).json({
      mensagem: 'Tricologista cadastrado com sucesso'
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao cadastrar tricologista'
    });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos'
      });
    }

    await tricologistaModel.update(id, nome, email);

    res.json({
      mensagem: 'Tricologista atualizado com sucesso'
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao atualizar tricologista'
    });
  }
}

async function excluir(req, res) {
  try {
    const { id } = req.params;

    await tricologistaModel.remove(id);

    res.json({
      mensagem: 'Tricologista excluído com sucesso'
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      mensagem: 'Erro ao excluir tricologista'
    });
  }
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir
};