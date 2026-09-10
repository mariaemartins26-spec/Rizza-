function Menu({ usuario, mudarTela, sair }) {
  return (
    <header className="menu">
      <div>
        <strong>Rizza</strong>
        <span>Usuário: {usuario.nome}</span>
      </div>

      <nav>
        <button onClick={() => mudarTela('inicio')}>
          Início
        </button>

        <button onClick={() => mudarTela('quiz')}>
          Quiz
        </button>

        <button onClick={() => mudarTela('gerenciamento')}>
          Gerenciamento
        </button>

        <button onClick={() => mudarTela('tricologistas')}>
          Tricologistas
        </button>

        <button onClick={sair}>
          Sair
        </button>
      </nav>
    </header>
  );
}

export default Menu;