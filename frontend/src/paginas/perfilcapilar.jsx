
import { useEffect, useState } from 'react';
import { requisitar } from '../api';

const perfilVazio = { id_quiz: '' };

function PerfilCapilar() {
  const [perfis, setPerfis] = useState([]);
  const [perfil, setPerfil] = useState(perfilVazio);
  const [idEditando, setIdEditando] = useState(null);
  const [busca, setBusca] = useState('');

  async function listarPerfis(termo = '') {
    const dados = await requisitar(`/perfil-capilar?busca=${encodeURIComponent(termo)}`);
    setPerfis(dados);
  }

  useEffect(() => {
    listarPerfis();
  }, []);

  async function salvarPerfil(evento) {
    evento.preventDefault();

    if (idEditando) {
      await requisitar(`/perfil-capilar/${idEditando}`, {
        method: 'PUT',
        body: JSON.stringify(perfil)
      });
    } else {
      await requisitar('/perfil-capilar', {
        method: 'POST',
        body: JSON.stringify(perfil)
      });
    }

    setPerfil(perfilVazio);
    setIdEditando(null);
    listarPerfis(busca);
  }

  function editarPerfil(item) {
    setPerfil({ id_quiz: item.id_quiz });
    setIdEditando(item.id_perfil);
  }

  async function excluirPerfil(id) {
    await requisitar(`/perfil-capilar/${id}`, { method: 'DELETE' });
    listarPerfis(busca);
  }

  function buscarPerfil(evento) {
    evento.preventDefault();
    listarPerfis(busca);
  }

  return (
    <section>
      <h1>Perfil Capilar</h1>

      <form className="cartao formulario" onSubmit={salvarPerfil}>
        <input
          placeholder="ID do Quiz"
          value={perfil.id_quiz}
          onChange={(e) => setPerfil({ ...perfil, id_quiz: e.target.value })}
        />
        <button type="submit">{idEditando ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <form className="busca" onSubmit={buscarPerfil}>
        <input
          placeholder="Buscar pelo ID do Quiz"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button
          type="button"
          onClick={() => {
            setBusca('');
            listarPerfis();
          }}
        >
          Limpar
        </button>
      </form>

      <div className="cartao tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID do Perfil</th>
              <th>ID do Quiz</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {perfis.map((item) => (
              <tr key={item.id_perfil}>
                <td>{item.id_perfil}</td>
                <td>{item.id_quiz}</td>
                <td>
                  <button onClick={() => editarPerfil(item)}>Editar</button>
                  <button onClick={() => excluirPerfil(item.id_perfil)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PerfilCapilar;
