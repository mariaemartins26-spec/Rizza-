import React, { useState } from "react";
import "./Tricologistas.css";

function Tricologistas() {
  const [tricologistas, setTricologistas] = useState([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      clinica: "Clínica Vida",
      telefone: "(88) 99999-1111",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Ana Beatriz",
      email: "ana@email.com",
      clinica: "Studio Capilar",
      telefone: "(88) 98888-2222",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "João Santos",
      email: "joao@email.com",
      clinica: "Centro Capilar",
      telefone: "(88) 97777-3333",
      status: "Pendente",
    },
  ]);

  const [tela, setTela] = useState("lista");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [editando, setEditando] = useState(null);

  const [novoTricologista, setNovoTricologista] = useState({
    nome: "",
    email: "",
    clinica: "",
    telefone: "",
  });

  function mostrarMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  }

  function cadastrarTricologista(evento) {
    evento.preventDefault();

    if (
      !novoTricologista.nome ||
      !novoTricologista.email ||
      !novoTricologista.clinica ||
      !novoTricologista.telefone
    ) {
      mostrarMensagem("Preencha todos os campos.", "erro");
      return;
    }

    const tricologista = {
      id: Date.now(),
      nome: novoTricologista.nome,
      email: novoTricologista.email,
      clinica: novoTricologista.clinica,
      telefone: novoTricologista.telefone,
      status: "Ativo",
    };

    setTricologistas([...tricologistas, tricologista]);

    setNovoTricologista({
      nome: "",
      email: "",
      clinica: "",
      telefone: "",
    });

    mostrarMensagem(
      "Tricologista cadastrado com sucesso!",
      "sucesso"
    );

    setTela("lista");
  }

  function iniciarEdicao(tricologista) {
    setEditando({ ...tricologista });
    setTela("editar");
  }

  function salvarEdicao() {
    if (
      !editando.nome ||
      !editando.email ||
      !editando.clinica ||
      !editando.telefone
    ) {
      mostrarMensagem("Preencha todos os campos.", "erro");
      return;
    }

    setTricologistas(
      tricologistas.map((tricologista) =>
        tricologista.id === editando.id
          ? editando
          : tricologista
      )
    );

    setEditando(null);

    mostrarMensagem(
      "Dados atualizados com sucesso!",
      "sucesso"
    );

    setTela("lista");
  }

  function excluirTricologista(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este tricologista?"
    );

    if (!confirmar) {
      return;
    }

    setTricologistas(
      tricologistas.filter(
        (tricologista) => tricologista.id !== id
      )
    );

    mostrarMensagem(
      "Tricologista excluído com sucesso!",
      "sucesso"
    );
  }

  function alterarStatus(id) {
    setTricologistas(
      tricologistas.map((tricologista) => {
        if (tricologista.id === id) {
          return {
            ...tricologista,
            status:
              tricologista.status === "Ativo"
                ? "Inativo"
                : "Ativo",
          };
        }

        return tricologista;
      })
    );

    mostrarMensagem(
      "Status atualizado com sucesso!",
      "sucesso"
    );
  }

  return (
    <div className="tricologistas">

      <aside className="menu-admin">

        <div className="logo-admin">
          Rizza
        </div>

        <div className="titulo-admin">
          Administração
        </div>

        <nav>
          <button
            className={tela === "lista" ? "selecionado" : ""}
            onClick={() => setTela("lista")}
          >
            Tricologistas
          </button>

          <button
            className={tela === "novo" ? "selecionado" : ""}
            onClick={() => setTela("novo")}
          >
            Novo cadastro
          </button>
        </nav>

        <div className="admin-usuario">
          <div className="avatar-admin">
            A
          </div>

          <div>
            <strong>Administrador</strong>
            <span>Rizza</span>
          </div>
        </div>

      </aside>

      <main className="conteudo-admin">

        {mensagem && (
          <div className={`mensagem-admin ${tipoMensagem}`}>
            {mensagem}
          </div>
        )}

        <header className="cabecalho-admin">

          <div>
            <h1>Tricologistas</h1>

            <p>
              Gerencie os profissionais cadastrados na Rizza.
            </p>
          </div>

          <button
            className="botao-principal"
            onClick={() => setTela("novo")}
          >
            + Novo tricologista
          </button>

        </header>

        {tela === "lista" && (
          <>

            <section className="cards-admin">

              <div className="card-admin">
                <span>Total de tricologistas</span>
                <strong>{tricologistas.length}</strong>
              </div>

              <div className="card-admin">
                <span>Profissionais ativos</span>
                <strong>
                  {
                    tricologistas.filter(
                      (item) => item.status === "Ativo"
                    ).length
                  }
                </strong>
              </div>

              <div className="card-admin">
                <span>Cadastros pendentes</span>
                <strong>
                  {
                    tricologistas.filter(
                      (item) => item.status === "Pendente"
                    ).length
                  }
                </strong>
              </div>

            </section>

            <section className="caixa-admin">

              <div className="titulo-caixa-admin">

                <div>
                  <h2>Tricologistas cadastrados</h2>

                  <p>
                    Lista de profissionais que utilizam a plataforma.
                  </p>
                </div>

              </div>

              <div className="tabela-container">

                <table>

                  <thead>
                    <tr>
                      <th>Profissional</th>
                      <th>E-mail</th>
                      <th>Clínica</th>
                      <th>Telefone</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>

                    {tricologistas.map((tricologista) => (

                      <tr key={tricologista.id}>

                        <td>
                          <div className="profissional">

                            <div className="avatar-profissional">
                              {tricologista.nome.charAt(0)}
                            </div>

                            <strong>
                              {tricologista.nome}
                            </strong>

                          </div>
                        </td>

                        <td>
                          {tricologista.email}
                        </td>

                        <td>
                          {tricologista.clinica}
                        </td>

                        <td>
                          {tricologista.telefone}
                        </td>

                        <td>
                          <span
                            className={`status ${tricologista.status.toLowerCase()}`}
                          >
                            {tricologista.status}
                          </span>
                        </td>

                        <td>

                          <button
                            className="botao-editar"
                            onClick={() =>
                              iniciarEdicao(tricologista)
                            }
                          >
                            Editar
                          </button>

                          <button
                            className="botao-status"
                            onClick={() =>
                              alterarStatus(tricologista.id)
                            }
                          >
                            {tricologista.status === "Ativo"
                              ? "Desativar"
                              : "Ativar"}
                          </button>

                          <button
                            className="botao-excluir"
                            onClick={() =>
                              excluirTricologista(
                                tricologista.id
                              )
                            }
                          >
                            Excluir
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </>
        )}

        {tela === "novo" && (

          <section className="caixa-admin formulario-container">

            <div className="titulo-caixa-admin">

              <div>
                <h2>Novo tricologista</h2>

                <p>
                  Cadastre um novo profissional na Rizza.
                </p>
              </div>

            </div>

            <form onSubmit={cadastrarTricologista}>

              <label>Nome completo</label>

              <input
                type="text"
                placeholder="Digite o nome completo"
                value={novoTricologista.nome}
                onChange={(e) =>
                  setNovoTricologista({
                    ...novoTricologista,
                    nome: e.target.value,
                  })
                }
              />

              <label>E-mail</label>

              <input
                type="email"
                placeholder="Digite o e-mail"
                value={novoTricologista.email}
                onChange={(e) =>
                  setNovoTricologista({
                    ...novoTricologista,
                    email: e.target.value,
                  })
                }
              />

              <label>Clínica</label>

              <input
                type="text"
                placeholder="Nome da clínica"
                value={novoTricologista.clinica}
                onChange={(e) =>
                  setNovoTricologista({
                    ...novoTricologista,
                    clinica: e.target.value,
                  })
                }
              />

              <label>Telefone</label>

              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={novoTricologista.telefone}
                onChange={(e) =>
                  setNovoTricologista({
                    ...novoTricologista,
                    telefone: e.target.value,
                  })
                }
              />

              <div className="botoes-formulario-admin">

                <button
                  type="submit"
                  className="botao-principal"
                >
                  Cadastrar
                </button>

                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={() => setTela("lista")}
                >
                  Cancelar
                </button>

              </div>

            </form>

          </section>

        )}

        {tela === "editar" && editando && (

          <section className="caixa-admin formulario-container">

            <div className="titulo-caixa-admin">

              <div>
                <h2>Editar tricologista</h2>

                <p>
                  Altere os dados do profissional.
                </p>
              </div>

            </div>

            <div className="formulario-admin">

              <label>Nome completo</label>

              <input
                type="text"
                value={editando.nome}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nome: e.target.value,
                  })
                }
              />

              <label>E-mail</label>

              <input
                type="email"
                value={editando.email}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    email: e.target.value,
                  })
                }
              />

              <label>Clínica</label>

              <input
                type="text"
                value={editando.clinica}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    clinica: e.target.value,
                  })
                }
              />

              <label>Telefone</label>

              <input
                type="text"
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />

              <div className="botoes-formulario-admin">

                <button
                  className="botao-principal"
                  onClick={salvarEdicao}
                >
                  Salvar alterações
                </button>

                <button
                  className="botao-cancelar"
                  onClick={() => {
                    setEditando(null);
                    setTela("lista");
                  }}
                >
                  Cancelar
                </button>

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Tricologistas;