import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newTitle, setnewTitle] = useState('');
  const [newProtagonista, setnewProtagonista] = useState('');
  const [newCategoria, setnewCategoria] = useState('');
  const [newUrl, setnewUrl] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error al recuperar peliculas:', error);
    }
  };

  const createMovies = async () => {
    try {
      const response = await axios.post('http://localhost:5000/movies', { title: newTitle, protagonista: newProtagonista, categoria: newCategoria, url: newUrl });
      setMovies([...movies, response.data]);
      setnewTitle('');
    } catch (error) {
      console.error('Error al crear tareas:', error);
    }
  };

  const updateMovies = async (id, updatedMovies) => {
    try {
      const response = await axios.patch(`http://localhost:5000/movies/${id}`, updatedMovies);
      setMovies(movies.map(movie => (movie.id === id ? response.data : movie)));
    } catch (error) {
      console.error('Error al modificar tarea:', error);
    }
  };

  const deleteMovies = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Erorr al eliminar tarea: ', error);
    }
  };

  return (
    <div>
      <h1>Administrador de peliculas</h1>
      <h3>Titulo</h3>
      <input type="text" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder="agregar titulo"/>
      <h3>Protagonista</h3>
      <input type="text" value={newProtagonista} onChange={(e) => setnewProtagonista(e.target.value)} placeholder="agregar protagonista"/>
      <h3>Categoria</h3>
      <input type="text" value={newCategoria} onChange={(e) => setnewCategoria(e.target.value)} placeholder="agregar categoria"/>
      <h3>Url del video</h3>
      <input type="text" value={newUrl} onChange={(e) => setnewUrl(e.target.value)} placeholder="agregar URL de pelicula"/>
      <br></br>
      <button onClick={createMovies}>Agregar pelicula</button>
      <hr></hr>
      <h2>Descripcion</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h4>Titulo</h4>
            <input type="text" value={movie.title} onChange={(e) => updateMovies(movie.id, { title: e.target.value })} />
            <h4>Protagonista</h4>
            <input type="text" value={movie.protagonista} onChange={(e) => updateMovies(movie.id, { protagonista: e.target.value })} />
            <h4>Categoria</h4>
            <input type="text" value={movie.categoria} onChange={(e) => updateMovies(movie.id, { categoria: e.target.value })} />
            <h4>Url de pelicula</h4>
            <input type="text" value={movie.url} onChange={(e) => updateMovies(movie.id, { url: e.target.value })} />
            <br></br>
            <button onClick={() => updateMovies(movie.id)}>Actualizar</button>
            <button onClick={() => deleteMovies(movie.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;