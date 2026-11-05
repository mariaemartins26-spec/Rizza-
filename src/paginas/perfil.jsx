import { useState } from "react";
import "./Perfil.css";

function Perfil({ usuario, atualizarUsuario }) {

  const [editando, setEditando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  const [dados, setDados] = useState({
    nome: usuario.nome || "",
    email: usuario.email || "",
    telefone: usuario.telefone || "",
    cep: usuario.cep || "",
    endereco: usuario.endereco || "",
    numero: usuario.numero || "",
    complemento: usuario.complemento || "",
    bairro: usuario.bairro || "",
    cidade: usuario.cidade || "",
    estado: usuario.estado || ""
  });

  const cidadesCeara = [
    "Abaiara", "Acarape", "Acaraú", "Acopiara", "Aiuaba",
    "Alcântaras", "Altaneira", "Alto Santo", "Amontada",
    "Antonina do Norte", "Apuiarés", "Aquiraz", "Aracati",
    "Aracoiaba", "Ararendá", "Araripe", "Aratuba", "Arneiroz",
    "Assaré", "Aurora", "Baixio", "Banabuiú", "Barbalha",
    "Barreira", "Barro", "Barroquinha", "Baturité", "Beberibe",
    "Bela Cruz", "Boa Viagem", "Brejo Santo", "Camocim",
    "Campos Sales", "Canindé", "Capistrano", "Caridade",
    "Cariré", "Caririaçu", "Cariús", "Carnaubal", "Cascavel",
    "Catarina", "Catunda", "Caucaia", "Cedro", "Chaval",
    "Choró", "Chorozinho", "Coreaú", "Crateús", "Crato",
    "Croatá", "Cruz", "Eusébio", "Forquilha", "Fortaleza",
    "Fortim", "Frecheirinha", "General Sampaio", "Graça",
    "Granja", "Granjeiro", "Groaíras", "Guaiúba",
    "Guaraciaba do Norte", "Guaramiranga", "Hidrolândia",
    "Horizonte", "Ibaretama", "Ibiapina", "Ibicuitinga",
    "Icapuí", "Icó", "Iguatu", "Independência", "Ipaporanga",
    "Ipaumirim", "Ipu", "Ipueiras", "Iracema", "Irauçuba",
    "Itaiçaba", "Itaitinga", "Itapajé", "Itapipoca", "Itapiúna",
    "Itarema", "Itatira", "Jaguaretama", "Jaguaribara",
    "Jaguaribe", "Jaguaruana", "Jardim", "Jati",
    "Jijoca de Jericoacoara", "Juazeiro do Norte", "Jucás",
    "Lavras da Mangabeira", "Limoeiro do Norte", "Madalena",
    "Maracanaú", "Maranguape", "Marco", "Martinópole", "Massapê",
    "Mauriti", "Meruoca", "Milagres", "Milhã", "Miraíma",
    "Missão Velha", "Mombaça", "Monsenhor Tabosa", "Morada Nova",
    "Moraújo", "Morrinhos", "Mucambo", "Mulungu", "Nova Olinda",
    "Nova Russas", "Novo Oriente", "Ocara", "Orós", "Pacajus",
    "Pacatuba", "Pacoti", "Pacujá", "Palhano", "Palmácia",
    "Paracuru", "Paraipaba", "Parambu", "Paramoti", "Pedra Branca",
    "Penaforte", "Pentecoste", "Pereiro", "Pindoretama",
    "Piquet Carneiro", "Pires Ferreira", "Poranga", "Porteiras",
    "Potengi", "Potiretama", "Quiterianópolis", "Quixadá",
    "Quixelô", "Quixeramobim", "Quixeré", "Redenção",
    "Reriutaba", "Russas", "Saboeiro", "Salitre", "Santa Quitéria",
    "Santana do Acaraú", "Santana do Cariri", "São Benedito",
    "São Gonçalo do Amarante", "São João do Jaguaribe",
    "São Luís do Curu", "Senador Pompeu", "Senador Sá", "Sobral",
    "Solonópole", "Tabuleiro do Norte", "Tamboril", "Tarrafas",
    "Tauá", "Tejuçuoca", "Tianguá", "Trairi", "Tururu", "Ubajara",
    "Umari", "Umirim", "Uruburetama", "Uruoca", "Varjota",
    "Várzea Alegre", "Viçosa do Ceará"
  ];


  // FORMATAÇÃO DO TELEFONE

  function formatarTelefone(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }


  // FORMATAÇÃO DO CEP

  function formatarCep(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length <= 5) {
      return numeros;
    }

    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }


  function alterarCampo(e) {

    const { name, value } = e.target;

    let novoValor = value;

    if (name === "telefone") {
      novoValor = formatarTelefone(value);
    }

    if (name === "cep") {
      novoValor = formatarCep(value);
    }

    if (name === "numero") {
      novoValor = value.replace(/\D/g, "");
    }

    setDados((anterior) => ({
      ...anterior,
      [name]: novoValor
    }));

    if (name === "cep") {
      buscarCep(novoValor);
    }
  }


  async function buscarCep(cepDigitado) {

    const cep = cepDigitado.replace(/\D/g, "");

    if (cep.length !== 8) {
      return;
    }

    setBuscandoCep(true);

    try {

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      const dadosCep = await resposta.json();

      if (dadosCep.erro) {
        alert("CEP não encontrado.");
        setBuscandoCep(false);
        return;
      }

      setDados((anterior) => ({
        ...anterior,
        cep: formatarCep(cep),
        endereco: dadosCep.logradouro || "",
        bairro: dadosCep.bairro || "",
        cidade: dadosCep.localidade || "",
        estado: dadosCep.uf || ""
      }));

    } catch (erro) {

      console.error("Erro ao buscar CEP:", erro);
      alert("Não foi possível consultar o CEP.");

    } finally {

      setBuscandoCep(false);

    }
  }


  function alterarEstado(e) {

    const novoEstado = e.target.value;

    setDados((anterior) => ({
      ...anterior,
      estado: novoEstado,
      cidade: ""
    }));
  }


  function salvar() {

    atualizarUsuario(dados);
    setEditando(false);

  }


  function cancelar() {

    setDados({
      nome: usuario.nome || "",
      email: usuario.email || "",
      telefone: usuario.telefone || "",
      cep: usuario.cep || "",
      endereco: usuario.endereco || "",
      numero: usuario.numero || "",
      complemento: usuario.complemento || "",
      bairro: usuario.bairro || "",
      cidade: usuario.cidade || "",
      estado: usuario.estado || ""
    });

    setEditando(false);
  }


  return (
    <div className="perfil-container">

      <div className="perfil-topo">

        <div>

          <h1>Meu Perfil</h1>

          <p className="perfil-subtitulo">
            Consulte e gerencie suas informações pessoais.
          </p>

        </div>

        {!editando && (

          <button
            className="botao-editar"
            onClick={() => setEditando(true)}
          >
            Editar perfil
          </button>

        )}

      </div>


      {/* INFORMAÇÕES PESSOAIS */}

      <section className="perfil-secao">

        <h2>Informações pessoais</h2>

        <div className="perfil-grid">

          <div className="perfil-item">

            <label>Nome</label>

            {editando ? (

              <input
                type="text"
                name="nome"
                value={dados.nome}
                onChange={alterarCampo}
                placeholder="Digite seu nome"
              />

            ) : (

              <p>{dados.nome || "Não informado"}</p>

            )}

          </div>


          <div className="perfil-item">

            <label>E-mail</label>

            {editando ? (

              <input
                type="email"
                name="email"
                value={dados.email}
                onChange={alterarCampo}
                placeholder="Digite seu e-mail"
              />

            ) : (

              <p>{dados.email || "Não informado"}</p>

            )}

          </div>


          <div className="perfil-item">

            <label>Telefone</label>

            {editando ? (

              <input
                type="text"
                name="telefone"
                value={dados.telefone}
                onChange={alterarCampo}
                placeholder="(88) 99999-9999"
                maxLength="15"
              />

            ) : (

              <p>{dados.telefone || "Não informado"}</p>

            )}

          </div>

        </div>

      </section>


      {/* ENDEREÇO */}

      <section className="perfil-secao">

        <h2>Endereço</h2>

        <div className="perfil-grid">

          {/* CEP */}

          <div className="perfil-item">

            <label>CEP</label>

            {editando ? (

              <div className="campo-cep">

                <input
                  type="text"
                  name="cep"
                  value={dados.cep}
                  onChange={alterarCampo}
                  placeholder="00000-000"
                  maxLength="9"
                />

                {buscandoCep && (
                  <small>Buscando endereço...</small>
                )}

              </div>

            ) : (

              <p>{dados.cep || "Não informado"}</p>

            )}

          </div>


          {/* ENDEREÇO */}

          <div className="perfil-item">

            <label>Rua / Endereço</label>

            {editando ? (

              <input
                type="text"
                name="endereco"
                value={dados.endereco}
                onChange={alterarCampo}
                placeholder="Digite sua rua ou endereço"
              />

            ) : (

              <p>{dados.endereco || "Não informado"}</p>

            )}

          </div>


          {/* NÚMERO */}

          <div className="perfil-item">

            <label>Número</label>

            {editando ? (

              <input
                type="text"
                name="numero"
                value={dados.numero}
                onChange={alterarCampo}
                placeholder="Ex.: 123"
                inputMode="numeric"
              />

            ) : (

              <p>{dados.numero || "Não informado"}</p>

            )}

          </div>


          {/* COMPLEMENTO */}

          <div className="perfil-item">

            <label>Complemento</label>

            {editando ? (

              <input
                type="text"
                name="complemento"
                value={dados.complemento}
                onChange={alterarCampo}
                placeholder="Apto, casa, bloco..."
              />

            ) : (

              <p>{dados.complemento || "Não informado"}</p>

            )}

          </div>


          {/* BAIRRO */}

          <div className="perfil-item">

            <label>Bairro</label>

            {editando ? (

              <input
                type="text"
                name="bairro"
                value={dados.bairro}
                onChange={alterarCampo}
                placeholder="Digite seu bairro"
              />

            ) : (

              <p>{dados.bairro || "Não informado"}</p>

            )}

          </div>


          {/* ESTADO */}

          <div className="perfil-item">

            <label>Estado</label>

            {editando ? (

              <select
                name="estado"
                value={dados.estado}
                onChange={alterarEstado}
              >

                <option value="">
                  Selecione seu estado
                </option>

                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>

              </select>

            ) : (

              <p>{dados.estado || "Não informado"}</p>

            )}

          </div>


          {/* CIDADE */}

          <div className="perfil-item">

            <label>Cidade</label>

            {editando ? (

              dados.estado === "CE" ? (

                <>

                  <input
                    type="text"
                    name="cidade"
                    value={dados.cidade}
                    onChange={alterarCampo}
                    placeholder="Digite sua cidade"
                    list="cidades-ceara"
                  />

                  <datalist id="cidades-ceara">

                    {cidadesCeara.map((cidade) => (

                      <option
                        key={cidade}
                        value={cidade}
                      />

                    ))}

                  </datalist>

                </>

              ) : (

                <input
                  type="text"
                  name="cidade"
                  value={dados.cidade}
                  onChange={alterarCampo}
                  placeholder={
                    dados.estado
                      ? "Digite sua cidade"
                      : "Selecione primeiro o estado"
                  }
                  disabled={!dados.estado}
                />

              )

            ) : (

              <p>{dados.cidade || "Não informado"}</p>

            )}

          </div>

        </div>

      </section>


      {/* BOTÕES */}

      {editando && (

        <div className="perfil-acoes">

          <button
            className="botao-cancelar"
            onClick={cancelar}
          >
            Cancelar
          </button>

          <button
            className="botao-salvar"
            onClick={salvar}
          >
            Salvar alterações
          </button>

        </div>

      )}

    </div>
  );
}

export default Perfil;