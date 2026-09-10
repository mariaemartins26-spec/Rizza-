
const URL_API = 'http://localhost:8080';

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${URL_API}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(erro.mensagem || 'Erro na requisição');
  }

  return resposta.json();
}

export { requisitar };
