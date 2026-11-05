# Rizza

## 📌 Sobre o projeto

O **Rizza** é um sistema desenvolvido para auxiliar profissionais da área capilar, como tricologistas e clínicas, na coleta de informações sobre o perfil capilar dos usuários.

O sistema utiliza um **quiz** para coletar informações e, de acordo com as respostas, realizar recomendações de produtos.

O projeto é dividido em **Frontend** e **Backend**, com comunicação entre as duas partes por meio de uma API.

---

# 🛠️ Tecnologias utilizadas

## Frontend

* React
* JavaScript
* HTML
* CSS
* Vite

## Backend

* Node.js
* Express
* MySQL
* CORS

## Ferramentas

* Visual Studio Code
* Postman
* Git e GitHub

---

# 📂 Estrutura do projeto

```text
Rizza/
│
├── backend/
│   ├── connection/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── componentes/
│   │   ├── paginas/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔙 Backend

O backend é responsável pelo processamento das informações do sistema, comunicação com o banco de dados e disponibilização da API utilizada pelo frontend.

Foi desenvolvido utilizando **Node.js e Express**.

## 🏗️ Organização do Backend

O backend utiliza uma organização baseada no padrão **MVC (Model, View e Controller)**.

### Models

Os Models são responsáveis pelas operações realizadas no banco de dados.

Entre as operações estão:

* Consulta de dados;
* Cadastro;
* Atualização;
* Exclusão.

### Controllers

Os Controllers recebem as requisições da API, processam os dados e utilizam os Models para realizar as operações necessárias.

### Routes

As Routes definem os endpoints da API e direcionam cada requisição para o Controller correspondente.

### Connection

A pasta `connection` possui a configuração responsável pela conexão do sistema com o banco de dados MySQL.

---

# 🗄️ Banco de dados

O sistema utiliza o **MySQL**.

Banco utilizado:

```text
rizza
```

Principais tabelas:

```text
usuario
quiz
perfil_capilar
pergunta
resposta
produto
recomendacao
```

---

# 🔌 API

A API permite a comunicação entre o frontend e o backend.

São utilizados os principais métodos HTTP:

| Método | Função          |
| ------ | --------------- |
| GET    | Consultar dados |
| POST   | Cadastrar dados |
| PUT    | Atualizar dados |
| DELETE | Excluir dados   |

## Usuários

| Método | Endpoint        | Função                   |
| ------ | --------------- | ------------------------ |
| GET    | `/usuarios`     | Lista todos os usuários  |
| GET    | `/usuarios/:id` | Busca um usuário pelo ID |
| POST   | `/usuarios`     | Cadastra um usuário      |
| PUT    | `/usuarios/:id` | Atualiza um usuário      |
| DELETE | `/usuarios/:id` | Exclui um usuário        |

---

# 🔐 Login

O backend possui uma função responsável pela autenticação do usuário.

Para realizar o login são enviados o email e a senha.

Exemplo:

```json
{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

Quando os dados estão corretos, o sistema retorna os dados do usuário.

Quando o usuário não é encontrado, a API retorna:

```text
401 Unauthorized
```

---

# 🎨 6. Documentação técnica do Front-end

## 📁 Estrutura de pastas

O frontend foi desenvolvido utilizando **React** e organizado em pastas para facilitar a manutenção e reutilização dos códigos.

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── componentes/
│   │
│   ├── paginas/
│   │   ├── Login/
│   │   ├── Inicio/
│   │   ├── Clientes/
│   │   ├── Bicicletas/
│   │   └── Ordens/
│   │
│   ├── App.jsx
│   └── ...
│
├── package.json
└── vite.config.js
```

---

## 📄 Organização das páginas

As páginas do frontend ficam organizadas dentro da pasta `paginas`.

Cada página representa uma tela ou funcionalidade do sistema.

### Login

A tela de Login é responsável por permitir que o usuário entre no sistema utilizando suas informações de acesso.

### Início

A página inicial apresenta a área principal do sistema após o login.

### Clientes

A tela de Clientes permite visualizar e gerenciar as informações dos clientes.

### Bicicletas

A tela de Bicicletas permite trabalhar com as informações relacionadas às bicicletas cadastradas.

### Ordens

A tela de Ordens é utilizada para visualizar e gerenciar as ordens do sistema.

---

# 🧩 Componentes

Os componentes são partes reutilizáveis da interface.

Eles ajudam a manter o código organizado e evitam a repetição de elementos que aparecem em diferentes páginas.

Um dos componentes utilizados no projeto é o **Menu**, responsável pela navegação entre as telas do sistema.

A utilização de componentes permite que alterações feitas em um componente possam ser refletidas nas páginas que o utilizam.

---

# 🔗 Comunicação com a API

O frontend se comunica com o backend por meio de requisições HTTP.

Para realizar essas requisições é utilizada uma função responsável por acessar os endpoints da API.

O frontend envia a requisição para o backend, que processa a informação e retorna uma resposta.

O funcionamento ocorre da seguinte forma:

```text
Frontend
    ↓
Requisição HTTP
    ↓
Route
    ↓
Controller
    ↓
Model
    ↓
Banco de Dados MySQL
    ↓
Model
    ↓
Controller
    ↓
Resposta da API
    ↓
Frontend
```

Dessa forma, o frontend não acessa diretamente o banco de dados. Toda comunicação com o banco é realizada pelo backend.

---

# 🌐 URL da API

Durante o desenvolvimento local, o backend é executado na porta:

```text
8080
```

A comunicação é realizada utilizando:

```text
http://localhost:8080
```

---

# ▶️ Como executar o projeto

## 1. Backend

Abra o terminal e entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
node server.js
```

O servidor será executado na porta:

```text
8080
```

---

## 2. Banco de dados

É necessário ter o MySQL instalado e configurado.

Crie o banco:

```sql
CREATE DATABASE rizza;
```

Depois, configure os dados da conexão no arquivo:

```text
backend/connection/connection.js
```

---

## 3. Frontend

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite irá disponibilizar o frontend para acesso no navegador.

---

# 🧪 Testes

Durante o desenvolvimento, a API foi testada utilizando o **Postman**.

Foram realizados testes utilizando diferentes métodos HTTP, como:

* GET;
* POST;
* PUT;
* DELETE.

Os testes permitiram verificar se os dados estavam sendo corretamente enviados, recebidos, cadastrados, atualizados e excluídos.

---

# ⚠️ Tratamento de erros

O backend possui tratamento de erros para situações como:

* Usuário não encontrado;
* Dados inválidos;
* Erros na comunicação com o banco de dados;
* Erros durante o cadastro;
* Erros durante a atualização;
* Erros durante a exclusão.

As respostas utilizam códigos HTTP para informar o resultado das requisições.

---

# 🔄 Integração Frontend + Backend

A integração permite que as informações inseridas nas telas do frontend sejam enviadas para a API.

O backend recebe essas informações, realiza o processamento necessário e pode armazená-las no banco de dados.

Depois disso, o resultado é enviado novamente para o frontend.

```text
Usuário
   ↓
Frontend React
   ↓
API
   ↓
Backend Node.js + Express
   ↓
MySQL
   ↓
Backend
   ↓
Frontend React
   ↓
Usuário
```

---

# 📌 Status do projeto

🚧 **Em desenvolvimento**

O backend foi desenvolvido e testado. Atualmente, a equipe está trabalhando no frontend e na integração das telas com a API.

---

# 👥 Equipe

Projeto desenvolvido pela equipe da Leticia.

---

# 📚 Considerações finais

O projeto foi desenvolvido com a divisão entre frontend e backend, permitindo uma melhor organização do sistema.

A utilização da API possibilita a comunicação entre as telas do frontend e o banco de dados, enquanto a organização em Models, Controllers e Routes facilita a manutenção e evolução do backend.
