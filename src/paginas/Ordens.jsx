
import { useEffect, useState } from 'react';
import { requisitar } from '../api';

const quizVazio = { id_usuario: '' };

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(quizVazio);
  const [idEditando, setIdEditando] = useState(null);

  async function carregarQuizzes() {
    const dados = await requisitar('/quiz');
    setQuizzes(dados);
  }

  useEffect(() => {
    carregarQuizzes();
  }, []);

  async function salvarQuiz(evento) {
    evento.preventDefault();

    if (idEditando) {
      await requisitar(`/quiz/${idEditando}`, {
        method: 'PUT',
        body: JSON.stringify(quiz)
      });
    } else {
      await requisitar('/quiz', {
        method: 'POST',
        body: JSON.stringify(quiz)
      });
    }

    setQuiz(quizVazio);
    setIdEditando(null);
    carregarQuizzes();
  }

  function editarQuiz(item) {
    setQuiz({
      id_usuario: item.id_usuario ?? ''
    });

    setIdEditando(item.id_quiz);
  }

  async function excluirQuiz(id) {
    await requisitar(`/quiz/${id}`, {
      method: 'DELETE'
    });

    carregarQuizzes();
  }

  return (
    <section>
      <h1>Quizzes</h1>

      <form className="cartao formulario" onSubmit={salvarQuiz}>
        <input
          type="number"
          placeholder="ID do usuário"
          value={quiz.id_usuario}
          onChange={(e) =>
            setQuiz({
              ...quiz,
              id_usuario: e.target.value
            })
          }
        />

        <button type="submit">
          {idEditando ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>

      <div className="cartao tabela-container">
        <table>
          <thead>
            <tr>
              <th>ID do Quiz</th>
              <th>ID do Usuário</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((item) => (
              <tr key={item.id_quiz}>
                <td>{item.id_quiz}</td>
                <td>{item.id_usuario ?? 'Sem usuário'}</td>
                <td>
                  <button onClick={() => editarQuiz(item)}>
                    Editar
                  </button>

                  <button onClick={() => excluirQuiz(item.id_quiz)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Quiz;
