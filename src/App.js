import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = { 
      title: `Desafio conceito ReactJS ${Date.now()}`, 
      url: "https://github.com/bgarciamoura/desafio-conceitos-react", 
      techs: [
        "ReactJS",
        "JS"
      ]
    };
    const newRespository = await api.post('repositories', repository);

    setRepositories([...repositories, newRespository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}

        {
          repositories.map(repository => (
            <li key={repository.id} >
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
