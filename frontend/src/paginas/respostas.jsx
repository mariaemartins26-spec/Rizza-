import { useState } from 'react';
import { requisitar } from '../api';

function Respostas({ aoContinuar }) {
  const [idPergunta, setIdPergunta] = useState('');
  const [mensagem, setMensagem] = useState('');

  async function enviar(evento) {
    evento.preventDefault();

    try {
      const resposta = await requisitar('/resposta', {
        method: 'POST',
        body: JSON.stringify({
          id_pergunta: idPergunta
        })
      });

      aoContinuar(resposta);
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  return (
    <main className="centralizado">
      <form className="cartao" onSubmit={enviar}>
        <h1>Rizza</h1>
        <h2>Resposta</h2>

        <label>ID da pergunta</label>
        <input
          type="number"
          value={idPergunta}
          onChange={(e) => setIdPergunta(e.target.value)}
        />

        <button type="submit">Enviar</button>

        {mensagem && <p>{mensagem}</p>}
      </form>
    </main>
  );
}

export default Respostas;
