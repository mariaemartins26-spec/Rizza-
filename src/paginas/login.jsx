
import { useState } from "react";
import "./Login.css";
import logoRizza from "../assets/Logo-Rizza.png";

function Login({ aoEntrar }) {
const [email, setEmail] = useState("ana@email.com");
const [senha, setSenha] = useState("123456");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:8080/usuario/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(
          dados.mensagem || "E-mail ou senha incorretos."
        );
        return;
      }

      aoEntrar(dados);
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand">
        <div className="brand-detalhe brand-detalhe-1" />
        <div className="brand-detalhe brand-detalhe-2" />

 <div className="brand-conteudo">
  <img
    src={logoRizza}
    alt="Logo da Rizza"
    className="login-logo"
  />

  <h1 className="brand-logo">Rizza</h1>
  <span className="brand-linha" />
</div>

        <span className="brand-rodape">
          BELEZA • CUIDADO • PERSONALIZAÇÃO
        </span>
      </section>

      <section className="login-area">
        <div className="login-card">
          <div className="login-header">
            <span className="login-etiqueta">
              ACESSO À PLATAFORMA
            </span>

            <h2>Boas-vindas!</h2>

            <p>
              Entre na sua conta para acessar a plataforma Rizza.
            </p>
          </div>

          <form className="login-form" onSubmit={entrar}>
            <div className="login-campo">
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="login-campo">
              <label htmlFor="senha">Senha</label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {erro && (
              <p className="login-erro" role="alert">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="login-botao"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Entrar"}
              {!carregando && (
                <span aria-hidden="true">↗</span>
              )}
            </button>
          </form>

          <div className="login-divisor">
            <span />
            <span className="login-divisor-texto">
              RIZZA
            </span>
            <span />
          </div>

          <p className="login-rodape">
            Acesso profissional
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
