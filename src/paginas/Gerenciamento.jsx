import React, { useEffect, useState } from "react";
import "./Gerenciamento.css";

const URL_API = "http://localhost:8080";

function Gerenciamento() {
  const [tela, setTela] = useState("dashboard");

  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // =========================
  // MENSAGENS
  // =========================

  function mostrarMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  }

  // =========================
  // GET - LISTAR CLIENTES
  // =========================

  async function carregarClientes() {
    try {
      setCarregando(true);

      const resposta = await fetch(`${URL_API}/usuario`);

      if (!resposta.ok) {
        throw new Error("Erro ao carregar clientes.");
      }

      const dados = await resposta.json();

      setClientes(dados);
    } catch (erro) {
      console.error(erro);

      mostrarMensagem(
        "Erro ao carregar os clientes.",
        "erro"
      );
    } finally {
      setCarregando(false);
    }
  }

  // Carrega os clientes quando a tela é aberta
  useEffect(() => {
    carregarClientes();
  }, []);

  // =========================
  // POST - CADASTRAR CLIENTE
  // =========================

  async function adicionarCliente(evento) {
    evento.preventDefault();

    if (
      !novoCliente.nome ||
      !novoCliente.email ||
      !novoCliente.senha
    ) {
      mostrarMensagem(
        "Preencha todos os campos.",
        "erro"
      );

      return;
    }

    try {
      const resposta = await fetch(
        `${URL_API}/usuario/insert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: novoCliente.nome,
            email: novoCliente.email,
            senha: novoCliente.senha,
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar cliente.");
      }

      mostrarMensagem(
        "Cliente cadastrado com sucesso!",
        "sucesso"
      );

      setNovoCliente({
        nome: "",
        email: "",
        senha: "",
      });

      await carregarClientes();

      setTela("clientes");
    } catch (erro) {
      console.error(erro);

      mostrarMensagem(
        "Erro ao cadastrar cliente.",
        "erro"
      );
    }
  }

  // =========================
  // DELETE - EXCLUIR CLIENTE
  // =========================

  async function excluirCliente(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `${URL_API}/usuario/del/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir cliente.");
      }

      mostrarMensagem(
        "Cliente excluído com sucesso!",
        "sucesso"
      );

      await carregarClientes();
    } catch (erro) {
      console.error(erro);

      mostrarMensagem(
        "Erro ao excluir cliente.",
        "erro"
      );
    }
  }

  // =========================
  // INICIAR EDIÇÃO
  // =========================

  function iniciarEdicao(cliente) {
    setEditando({
      id_usuario: cliente.id_usuario,
      nome: cliente.nome || "",
      email: cliente.email || "",
      senha: cliente.senha || "",
    });
  }

  // =========================
  // PUT - SALVAR EDIÇÃO
  // =========================

  async function salvarEdicao() {
    if (
      !editando.nome ||
      !editando.email ||
      !editando.senha
    ) {
      mostrarMensagem(
        "Preencha todos os campos.",
        "erro"
      );

      return;
    }

    try {
      const resposta = await fetch(
        `${URL_API}/usuario/insert/${editando.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: editando.nome,
            email: editando.email,
            senha: editando.senha,
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao atualizar cliente.");
      }

      mostrarMensagem(
        "Cliente atualizado com sucesso!",
        "sucesso"
      );

      setEditando(null);

      await carregarClientes();
    } catch (erro) {
      console.error(erro);

      mostrarMensagem(
        "Erro ao atualizar cliente.",
        "erro"
      );
    }
  }

  return (
    <div className="gerenciamento">

      {/* MENU LATERAL */}
      <aside className="menu-gerenciamento">
        <div className="logo-rizza">Rizza</div>

        <nav>
          <button
            className={
              tela === "dashboard"
                ? "selecionado"
                : ""
            }
            onClick={() => setTela("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={
              tela === "clientes"
                ? "selecionado"
                : ""
            }
            onClick={() => setTela("clientes")}
          >
            Clientes
          </button>

          <button
            className={
              tela === "quizzes"
                ? "selecionado"
                : ""
            }
            onClick={() => setTela("quizzes")}
          >
            Quizzes
          </button>

          <button
            className={
              tela === "produtos"
                ? "selecionado"
                : ""
            }
            onClick={() => setTela("produtos")}
          >
            Produtos
          </button>

          <button
            className={
              tela === "configuracoes"
                ? "selecionado"
                : ""
            }
            onClick={() =>
              setTela("configuracoes")
            }
          >
            Configurações
          </button>
        </nav>

        <div className="usuario-menu">
          <div className="avatar">P</div>

          <div>
            <strong>Profissional</strong>
            <span>Administrador</span>
          </div>
        </div>
      </aside>

      <main className="conteudo-gerenciamento">

        {/* MENSAGEM */}
        {mensagem && (
          <div
            className={`mensagem ${tipoMensagem}`}
          >
            {mensagem}
          </div>
        )}

        {/* CABEÇALHO */}
        <header className="cabecalho-gerenciamento">
          <div>
            <h1>Gerenciamento</h1>
            <p>
              Gerencie seus clientes e acompanhe
              os resultados.
            </p>
          </div>

          <button className="botao-perfil">
            Meu perfil
          </button>
        </header>

        {/* =========================
            DASHBOARD
        ========================= */}

        {tela === "dashboard" && (
          <>
            <section className="cards-gerenciamento">

              <div className="card-gerenciamento">
                <div>
                  <span>Clientes</span>
                  <strong>
                    {clientes.length}
                  </strong>
                </div>
              </div>

              <div className="card-gerenciamento">
                <div>
                  <span>Quizzes realizados</span>
                  <strong>246</strong>
                </div>
              </div>

              <div className="card-gerenciamento">
                <div>
                  <span>Recomendações</span>
                  <strong>312</strong>
                </div>
              </div>

              <div className="card-gerenciamento">
                <div>
                  <span>Crescimento</span>
                  <strong>18%</strong>
                </div>
              </div>

            </section>

            <section className="caixa-gerenciamento">

              <div className="titulo-caixa">
                <div>
                  <h2>Clientes recentes</h2>
                  <p>
                    Últimos clientes cadastrados.
                  </p>
                </div>

                <button
                  className="botao-principal"
                  onClick={() =>
                    setTela("clientes")
                  }
                >
                  Ver todos
                </button>
              </div>

              {carregando ? (
                <p>Carregando clientes...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>

                  <tbody>
                    {clientes.map((cliente) => (
                      <tr
                        key={cliente.id_usuario}
                      >
                        <td>
                          <div className="cliente">

                            <div className="avatar-cliente">
                              {cliente.nome
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <strong>
                              {cliente.nome}
                            </strong>

                          </div>
                        </td>

                        <td>
                          {cliente.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </section>
          </>
        )}

        {/* =========================
            CLIENTES
        ========================= */}

        {tela === "clientes" && (
          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">
              <div>
                <h2>Clientes</h2>
                <p>
                  Visualize e gerencie seus clientes.
                </p>
              </div>

              <button
                className="botao-principal"
                onClick={() =>
                  setTela("novo-cliente")
                }
              >
                + Novo cliente
              </button>
            </div>

            {carregando ? (
              <p>Carregando clientes...</p>
            ) : clientes.length === 0 ? (
              <p>
                Nenhum cliente cadastrado.
              </p>
            ) : (
              <table>

                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>

                  {clientes.map((cliente) => (
                    <tr
                      key={cliente.id_usuario}
                    >

                      <td>
                        <div className="cliente">

                          <div className="avatar-cliente">
                            {cliente.nome
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <strong>
                            {cliente.nome}
                          </strong>

                        </div>
                      </td>

                      <td>
                        {cliente.email}
                      </td>

                      <td>

                        <button
                          className="botao-acao"
                          onClick={() =>
                            iniciarEdicao(cliente)
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="botao-excluir"
                          onClick={() =>
                            excluirCliente(
                              cliente.id_usuario
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
            )}

          </section>
        )}

        {/* =========================
            NOVO CLIENTE
        ========================= */}

        {tela === "novo-cliente" && (
          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">
              <div>
                <h2>Novo cliente</h2>
                <p>
                  Cadastre um novo cliente.
                </p>
              </div>
            </div>

            <form
              className="formulario-gerenciamento"
              onSubmit={adicionarCliente}
            >

              <label>Nome</label>

              <input
                type="text"
                placeholder="Nome do cliente"
                value={novoCliente.nome}
                onChange={(e) =>
                  setNovoCliente({
                    ...novoCliente,
                    nome: e.target.value,
                  })
                }
              />

              <label>E-mail</label>

              <input
                type="email"
                placeholder="E-mail do cliente"
                value={novoCliente.email}
                onChange={(e) =>
                  setNovoCliente({
                    ...novoCliente,
                    email: e.target.value,
                  })
                }
              />

              <label>Senha</label>

              <input
                type="password"
                placeholder="Senha do cliente"
                value={novoCliente.senha}
                onChange={(e) =>
                  setNovoCliente({
                    ...novoCliente,
                    senha: e.target.value,
                  })
                }
              />

              <div className="botoes-formulario">

                <button
                  type="submit"
                  className="botao-principal"
                >
                  Cadastrar cliente
                </button>

                <button
                  type="button"
                  className="botao-acao"
                  onClick={() =>
                    setTela("clientes")
                  }
                >
                  Cancelar
                </button>

              </div>

            </form>

          </section>
        )}

        {/* =========================
            EDITAR CLIENTE
        ========================= */}

        {editando && (
          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">
              <div>
                <h2>Editar cliente</h2>
                <p>
                  Altere os dados do cliente.
                </p>
              </div>
            </div>

            <div className="formulario-gerenciamento">

              <label>Nome</label>

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

              <label>Senha</label>

              <input
                type="password"
                value={editando.senha}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    senha: e.target.value,
                  })
                }
              />

              <div className="botoes-formulario">

                <button
                  className="botao-principal"
                  onClick={salvarEdicao}
                >
                  Salvar alterações
                </button>

                <button
                  className="botao-acao"
                  onClick={() =>
                    setEditando(null)
                  }
                >
                  Cancelar
                </button>

              </div>

            </div>

          </section>
        )}

        {/* =========================
            QUIZZES
        ========================= */}

        {tela === "quizzes" && (
          <section className="caixa-gerenciamento">

            <h2>Quizzes</h2>

            <p className="texto-cinza">
              Acompanhe os quizzes realizados pelos
              seus clientes.
            </p>

            <div className="item-gerenciamento">
              <div>
                <strong>
                  Diagnóstico capilar
                </strong>
                <p>
                  246 quizzes realizados
                </p>
              </div>

              <button className="botao-acao">
                Ver resultados
              </button>
            </div>

            <div className="item-gerenciamento">
              <div>
                <strong>
                  Rotina capilar
                </strong>
                <p>
                  184 quizzes realizados
                </p>
              </div>

              <button className="botao-acao">
                Ver resultados
              </button>
            </div>

          </section>
        )}

        {/* =========================
            PRODUTOS
        ========================= */}

        {tela === "produtos" && (
          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">

              <div>
                <h2>Produtos</h2>
                <p>
                  Produtos utilizados nas
                  recomendações.
                </p>
              </div>

              <button className="botao-principal">
                + Adicionar produto
              </button>

            </div>

            <div className="item-gerenciamento">

              <div>
                <strong>
                  Shampoo Hidratante
                </strong>
                <p>Hidratação</p>
              </div>

              <button className="botao-acao">
                Editar
              </button>

            </div>

            <div className="item-gerenciamento">

              <div>
                <strong>
                  Máscara Nutritiva
                </strong>
                <p>Nutrição</p>
              </div>

              <button className="botao-acao">
                Editar
              </button>

            </div>

          </section>
        )}

        {/* =========================
            CONFIGURAÇÕES
        ========================= */}

        {tela === "configuracoes" && (
          <section className="caixa-gerenciamento">

            <h2>Configurações</h2>

            <div className="item-gerenciamento">

              <div>
                <strong>
                  Dados do profissional
                </strong>

                <p>
                  Nome, e-mail e informações da
                  conta.
                </p>
              </div>

              <button className="botao-acao">
                Editar
              </button>

            </div>

            <div className="item-gerenciamento">

              <div>
                <strong>Senha</strong>

                <p>
                  Altere sua senha de acesso.
                </p>
              </div>

              <button className="botao-acao">
                Alterar
              </button>

            </div>

          </section>
        )}

      </main>
    </div>
  );
}

export default Gerenciamento;