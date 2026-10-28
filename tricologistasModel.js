const conexao = require('../connection/connection');

async function getAll() {
  const [resultado] = await conexao.query(
    "SELECT id_usuario, nome, email FROM usuario WHERE tipo_usuario = 'tricologista'"
  );

  return resultado;
}

async function getById(id) {
  const [resultado] = await conexao.query(
    "SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ? AND tipo_usuario = 'tricologista'",
    [id]
  );

  return resultado[0];
}

async function create(nome, email, senha) {
  const [resultado] = await conexao.query(
    "INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, 'tricologista')",
    [nome, email, senha]
  );

  return resultado;
}

async function update(id, nome, email) {
  const [resultado] = await conexao.query(
    "UPDATE usuario SET nome = ?, email = ? WHERE id_usuario = ? AND tipo_usuario = 'tricologista'",
    [nome, email, id]
  );

  return resultado;
}

async function remove(id) {
  const [resultado] = await conexao.query(
    "DELETE FROM usuario WHERE id_usuario = ? AND tipo_usuario = 'tricologista'",
    [id]
  );

  return resultado;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};