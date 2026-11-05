const URL_API = 'http://localhost:8080';

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${URL_API}${caminho}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...opcoes
  });

  const texto = await resposta.text();

  let dados;

  try {
    dados = JSON.parse(texto);
  } catch {
    dados = texto;
  }

  if (!resposta.ok) {
    let mensagemErro = 'Erro na requisição';

    if (typeof dados === 'string') {
      mensagemErro = dados;
    } else if (dados?.mensagem) {
      mensagemErro = dados.mensagem;
    } else if (dados?.sqlMessage) {
      mensagemErro = dados.sqlMessage;
    } else if (dados?.message) {
      mensagemErro = dados.message;
    }

    throw new Error(mensagemErro);
  }

  return dados;
}

export { requisitar };