import React, { useState } from "react";
import "./Gerenciamento.css";

function Gerenciamento() {
  const [tela, setTela] = useState("dashboard");

  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      perfil: "Cacheado",
      quiz: "08/09/2026",
    },
    {
      id: 2,
      nome: "Ana Beatriz",
      email: "ana@email.com",
      perfil: "Ondulado",
      quiz: "07/09/2026",
    },
    {
      id: 3,
      nome: "Julia Santos",
      email: "julia@email.com",
      perfil: "Liso",
      quiz: "06/09/2026",
    },
  ]);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    perfil: "",
  });

  const [editando, setEditando] = useState(null);

  function mostrarMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 3000);
  }

  // INCLUSÃO
  function adicionarCliente(evento) {
    evento.preventDefault();

    if (
      !novoCliente.nome ||
      !novoCliente.email ||
      !novoCliente.perfil
    ) {
      mostrarMensagem(
        "Preencha todos os campos.",
        "erro"
      );

      return;
    }

    const cliente = {
      id: Date.now(),
      nome: novoCliente.nome,
      email: novoCliente.email,
      perfil: novoCliente.perfil,
      quiz: "Ainda não realizado",
    };

    setClientes([...clientes, cliente]);

    setNovoCliente({
      nome: "",
      email: "",
      perfil: "",
    });

    mostrarMensagem(
      "Cliente cadastrado com sucesso!",
      "sucesso"
    );

    setTela("clientes");
  }

  // EXCLUSÃO
  function excluirCliente(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (!confirmar) {
      return;
    }

    setClientes(
      clientes.filter((cliente) => cliente.id !== id)
    );

    mostrarMensagem(
      "Cliente excluído com sucesso!",
      "sucesso"
    );
  }

  // COMEÇAR EDIÇÃO
  function iniciarEdicao(cliente) {
    setEditando({ ...cliente });
  }

  // SALVAR EDIÇÃO
  function salvarEdicao() {
    if (
      !editando.nome ||
      !editando.email ||
      !editando.perfil
    ) {
      mostrarMensagem(
        "Preencha todos os campos.",
        "erro"
      );

      return;
    }

    setClientes(
      clientes.map((cliente) =>
        cliente.id === editando.id
          ? editando
          : cliente
      )
    );

    setEditando(null);

    mostrarMensagem(
      "Cliente atualizado com sucesso!",
      "sucesso"
    );
  }

  return (
    <div className="gerenciamento">

      {/* MENU LATERAL */}

      <aside className="menu-gerenciamento">

        <div className="logo-rizza">
          Rizza
        </div>

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

          <div className="avatar">
            P
          </div>

          <div>
            <strong>
              Profissional
            </strong>

            <span>
              Administrador
            </span>
          </div>

        </div>

      </aside>


      {/* CONTEÚDO */}

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

            <h1>
              Gerenciamento
            </h1>

            <p>
              Gerencie seus clientes e acompanhe os resultados.
            </p>

          </div>

          <button className="botao-perfil">
            Meu perfil
          </button>

        </header>


        {/* DASHBOARD */}

        {tela === "dashboard" && (
          <>

            <section className="cards-gerenciamento">

              <div className="card-gerenciamento">
                <div>
                  <span>
                    Clientes
                  </span>

                  <strong>
                    {clientes.length}
                  </strong>
                </div>
              </div>


              <div className="card-gerenciamento">
                <div>
                  <span>
                    Quizzes realizados
                  </span>

                  <strong>
                    246
                  </strong>
                </div>
              </div>


              <div className="card-gerenciamento">
                <div>
                  <span>
                    Recomendações
                  </span>

                  <strong>
                    312
                  </strong>
                </div>
              </div>


              <div className="card-gerenciamento">
                <div>
                  <span>
                    Crescimento
                  </span>

                  <strong>
                    18%
                  </strong>
                </div>
              </div>

            </section>


            <section className="caixa-gerenciamento">

              <div className="titulo-caixa">

                <div>

                  <h2>
                    Clientes recentes
                  </h2>

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


              <table>

                <thead>

                  <tr>
                    <th>Cliente</th>
                    <th>E-mail</th>
                    <th>Perfil capilar</th>
                    <th>Último quiz</th>
                  </tr>

                </thead>


                <tbody>

                  {clientes.map((cliente) => (

                    <tr key={cliente.id}>

                      <td>

                        <div className="cliente">

                          <div className="avatar-cliente">
                            {cliente.nome.charAt(0)}
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

                        <span className="tag-perfil">
                          {cliente.perfil}
                        </span>

                      </td>

                      <td>
                        {cliente.quiz}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </section>

          </>
        )}


        {/* CLIENTES */}

        {tela === "clientes" && (

          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">

              <div>

                <h2>
                  Clientes
                </h2>

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


            <table>

              <thead>

                <tr>
                  <th>Cliente</th>
                  <th>E-mail</th>
                  <th>Perfil capilar</th>
                  <th>Último quiz</th>
                  <th>Ações</th>
                </tr>

              </thead>


              <tbody>

                {clientes.map((cliente) => (

                  <tr key={cliente.id}>

                    <td>

                      <div className="cliente">

                        <div className="avatar-cliente">
                          {cliente.nome.charAt(0)}
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

                      <span className="tag-perfil">
                        {cliente.perfil}
                      </span>

                    </td>


                    <td>
                      {cliente.quiz}
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
                          excluirCliente(cliente.id)
                        }
                      >
                        Excluir
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </section>

        )}


        {/* NOVO CLIENTE */}

        {tela === "novo-cliente" && (

          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">

              <div>

                <h2>
                  Novo cliente
                </h2>

                <p>
                  Cadastre um novo cliente.
                </p>

              </div>

            </div>


            <form
              className="formulario-gerenciamento"
              onSubmit={adicionarCliente}
            >

              <label>
                Nome
              </label>

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


              <label>
                E-mail
              </label>

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


              <label>
                Perfil capilar
              </label>

              <select
                value={novoCliente.perfil}
                onChange={(e) =>
                  setNovoCliente({
                    ...novoCliente,
                    perfil: e.target.value,
                  })
                }
              >

                <option value="">
                  Selecione o perfil
                </option>

                <option value="Liso">
                  Liso
                </option>

                <option value="Ondulado">
                  Ondulado
                </option>

                <option value="Cacheado">
                  Cacheado
                </option>

                <option value="Crespo">
                  Crespo
                </option>

              </select>


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


        {/* EDIÇÃO */}

        {editando && (

          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">

              <div>

                <h2>
                  Editar cliente
                </h2>

                <p>
                  Altere os dados do cliente.
                </p>

              </div>

            </div>


            <div className="formulario-gerenciamento">

              <label>
                Nome
              </label>

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


              <label>
                E-mail
              </label>

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


              <label>
                Perfil capilar
              </label>

              <select
                value={editando.perfil}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    perfil: e.target.value,
                  })
                }
              >

                <option value="Liso">
                  Liso
                </option>

                <option value="Ondulado">
                  Ondulado
                </option>

                <option value="Cacheado">
                  Cacheado
                </option>

                <option value="Crespo">
                  Crespo
                </option>

              </select>


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


        {/* QUIZZES */}

        {tela === "quizzes" && (

          <section className="caixa-gerenciamento">

            <h2>
              Quizzes
            </h2>

            <p className="texto-cinza">
              Acompanhe os quizzes realizados pelos seus clientes.
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


        {/* PRODUTOS */}

        {tela === "produtos" && (

          <section className="caixa-gerenciamento">

            <div className="titulo-caixa">

              <div>

                <h2>
                  Produtos
                </h2>

                <p>
                  Produtos utilizados nas recomendações.
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

                <p>
                  Hidratação
                </p>

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

                <p>
                  Nutrição
                </p>

              </div>

              <button className="botao-acao">
                Editar
              </button>

            </div>

          </section>

        )}


        {/* CONFIGURAÇÕES */}

        {tela === "configuracoes" && (

          <section className="caixa-gerenciamento">

            <h2>
              Configurações
            </h2>


            <div className="item-gerenciamento">

              <div>

                <strong>
                  Dados do profissional
                </strong>

                <p>
                  Nome, e-mail e informações da conta.
                </p>

              </div>

              <button className="botao-acao">
                Editar
              </button>

            </div>


            <div className="item-gerenciamento">

              <div>

                <strong>
                  Senha
                </strong>

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