function Inicio({ usuario }) {
  return (
    <section className="cartao">
      <h1>Olá, {usuario?.nome}!</h1>

      <p>
        Bem-vindo ao Rizza! Aqui você pode realizar seu quiz
        e consultar seu perfil capilar.
      </p>

      <div className="informacoes">
        <div className="info-card">
          <h2>Usuário</h2>

          <p>
            <strong>ID do usuário:</strong> {usuario?.id_usuario}
          </p>

          <p>
            <strong>Nome:</strong> {usuario?.nome}
          </p>

          <p>
            <strong>E-mail:</strong> {usuario?.email}
          </p>
        </div>

        <div className="info-card">
          <h2>Quiz</h2>

          <p>
            O quiz é vinculado ao usuário pelo ID do usuário.
          </p>

          <button>Fazer Quiz</button>
        </div>
      </div>
    </section>
  );
}

export default Inicio;