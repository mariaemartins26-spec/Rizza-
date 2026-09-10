import { useState } from 'react';

function Login({ aoEntrar }) {
  const [email, setEmail] = useState('maria@email.com');
  const [senha, setSenha] = useState('123456');
  const [erro, setErro] = useState('');

  async function entrar(evento) {
    evento.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.mensagem || 'E-mail ou senha incorretos.');
        return;
      }

      console.log('Login realizado:', dados);

      aoEntrar(dados);

    } catch (error) {
      console.error('Erro no login:', error);
      setErro('Não foi possível conectar ao servidor.');
    }
  }

  return (
    <main className="conteudo">
      <section className="cartao">
        <h1>Rizza</h1>

        <p>Entre na sua conta</p>

        <form className="formulario" onSubmit={entrar}>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p>{erro}</p>}

          <button type="submit">
            Entrar
          </button>

        </form>
      </section>
    </main>
  );
}

export default Login;