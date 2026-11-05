
import { useState } from "react";
import "./Menu.css";

function Menu({ tela, setTela, sair }) {
  const [aberto, setAberto] = useState(false);

  function navegar(destino) {
    setTela(destino);
    setAberto(false);
  }

  return (
    <nav className={`menu ${aberto ? "menu-aberto" : ""}`}>
      <div className="menu-topo">
        <div className="menu-logo">Rizza</div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setAberto(!aberto)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
        >
          {aberto ? "✕" : "☰"}
        </button>
      </div>

      <div className="menu-links">
        <button
          className={tela === "inicio" ? "ativo" : ""}
          onClick={() => navegar("inicio")}
        >
          Início
        </button>

        <button
          className={tela === "quiz" ? "ativo" : ""}
          onClick={() => navegar("quiz")}
        >
          Quiz
        </button>

        <button
          className={tela === "gerenciamento" ? "ativo" : ""}
          onClick={() => navegar("gerenciamento")}
        >
          Gerenciamento
        </button>

        <button
          className={tela === "tricologistas" ? "ativo" : ""}
          onClick={() => navegar("tricologistas")}
        >
          Tricologistas
        </button>

        <button
          className={tela === "perfil" ? "ativo" : ""}
          onClick={() => navegar("perfil")}
        >
          Meu Perfil
        </button>

        <button
          className="sair"
          onClick={() => {
            setAberto(false);
            sair();
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Menu;
