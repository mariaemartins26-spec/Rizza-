
import { useState } from "react";

import Menu from "./componentes/Menu";
import Login from "./paginas/login";
import Inicio from "./paginas/Inicio";
import Quiz from "./paginas/quiz";
import Gerenciamento from "./paginas/Gerenciamento.jsx";
import Tricologistas from "./paginas/Tricologistas.jsx";
import Perfil from "./paginas/perfil.jsx";
import Recomendacoes from "./paginas/Recomendacoes.jsx";

import "./estilos.css";

function App() {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const [tela, setTela] = useState(() => {
    return localStorage.getItem("telaAtual") || "inicio";
  });

  function trocarTela(novaTela) {
    setTela(novaTela);
    localStorage.setItem("telaAtual", novaTela);
  }

  function entrar(usuarioLogado) {
    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioLogado)
    );

    setUsuario(usuarioLogado);
    trocarTela("inicio");
  }

  function sair() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("telaAtual");

    setUsuario(null);
    setTela("inicio");
  }

  function atualizarUsuario(dadosAtualizados) {
    setUsuario((atual) => {
      const novoUsuario = {
        ...atual,
        ...dadosAtualizados,
      };

      localStorage.setItem(
        "usuario",
        JSON.stringify(novoUsuario)
      );

      return novoUsuario;
    });
  }

  if (!usuario) {
    return <Login aoEntrar={entrar} />;
  }

  return (
    <>
      <Menu
        tela={tela}
        setTela={trocarTela}
        sair={sair}
      />

      <main className="conteudo">
        {tela === "inicio" && (
          <Inicio
            usuario={usuario}
            setTela={trocarTela}
          />
        )}

        {tela === "quiz" && (
          <Quiz
            usuario={usuario}
            setTela={trocarTela}
          />
        )}

        {tela === "recomendacoes" && (
          <Recomendacoes
            usuario={usuario}
            setTela={trocarTela}
          />
        )}

        {tela === "gerenciamento" && (
          <Gerenciamento
            usuario={usuario}
            atualizarUsuario={atualizarUsuario}
          />
        )}

        {tela === "tricologistas" && (
          <Tricologistas />
        )}

        {tela === "perfil" && (
          <Perfil
            usuario={usuario}
            atualizarUsuario={atualizarUsuario}
          />
        )}
      </main>
    </>
  );
}

export default App;
