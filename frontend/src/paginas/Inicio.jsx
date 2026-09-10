function Inicio({ usuario }) {
  return (
    <section className="cartao">
      <h1>Olá, {usuario?.nome}!</h1>

      <p>
        Bem-vindo ao Rizza.
      </p>

      <p>
        Aqui você pode realizar seu quiz e acompanhar
        suas informações.
      </p>

      <div className="informacoes">
        <div className="info-card">
          <h2>Minha conta</h2>

          <p>
            <strong>Nome:</strong> {usuario?.nome}
          </p>

          <p>
            <strong>E-mail:</strong> {usuario?.email}
          </p>

          <p>
            <strong>ID do usuário:</strong> {usuario?.id_usuario}
          </p>
        </div>

        <div className="info-card">
          <h2>Quiz Capilar</h2>

          <p>
            Responda ao quiz para obter informações
            personalizadas sobre seu perfil capilar.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Inicio;