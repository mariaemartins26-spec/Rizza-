import { useState } from 'react';
import { requisitar } from '../api';

function Login({ aoEntrar }) {
  const [email, setEmail] = useState('maria@email.com');
  const [senha, setSenha] = useState('123456');
  const [mensagem, setMensagem] = useState('');

  async function entrar(evento) {
    evento.preventDefault();

    try {
      const usuario = await requisitar('/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          senha
        })
      });

      aoEntrar(usuario);
    } catch (erro) {
      setMensagem(erro.message);
    }
  }

  return (
    <main className="centralizado">
      <form className="cartao login" onSubmit={entrar}>
        <h1>Oficina Pedal Rápido</h1>
        <h2>Entrar</h2>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        {mensagem && <p>{mensagem}</p>}
      </form>
    </main>
  );
}

export default Login;