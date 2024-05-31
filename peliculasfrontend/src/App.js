import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newProtagonista, setNewProtagonista] = useState('');
  const [newCategoria, setNewCategoria] = useState('');
  const [newUrl, setNewUrl] = useState('');  
  const [newImageUrl, setNewImageUrl] = useState('');  

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error al recuperar películas:', error);
    }
  };

  const createMovie = async () => {
    try {
      const newMovie = {
        title: newTitle,
        protagonista: newProtagonista,
        categoria: newCategoria,
        url: newUrl,  
        imageUrl: newImageUrl  
      };
      const response = await axios.post('http://localhost:5000/movies', newMovie);
      setMovies([...movies, response.data]);
      setNewTitle('');
      setNewProtagonista('');
      setNewCategoria('');
      setNewUrl('');
      setNewImageUrl('');
    } catch (error) {
      console.error('Error al crear película:', error);
    }
  };

  const updateMovie = async (id, updatedMovie) => {
    try {
      const response = await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie);
      setMovies(movies.map(movie => (movie.id === id ? response.data : movie)));
    } catch (error) {
      console.error('Error al modificar película:', error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error('Error al eliminar película:', error);
    }
  };

  return (
    <div>
      <h1>Administrador de Películas</h1>
      <h3>Título</h3>
      <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Agregar título" />
      <h3>Protagonista</h3>
      <input type="text" value={newProtagonista} onChange={(e) => setNewProtagonista(e.target.value)} placeholder="Agregar protagonista" />
      <h3>Categoría</h3>
      <input type="text" value={newCategoria} onChange={(e) => setNewCategoria(e.target.value)} placeholder="Agregar categoría" />
      <h3>URL del Video</h3>
      <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Agregar URL de película" />
      <h3>URL de la Imagen</h3>
      <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Agregar URL de imagen" />
      <br />
      <button onClick={createMovie}>Agregar Película</button>
      <hr />
      <h2>Descripción</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h4>Título</h4>
            <input type="text" value={movie.title} onChange={(e) => setMovies(movies.map(m => m.id === movie.id ? { ...m, title: e.target.value } : m))} />
            <h4>Protagonista</h4>
            <input type="text" value={movie.protagonista} onChange={(e) => setMovies(movies.map(m => m.id === movie.id ? { ...m, protagonista: e.target.value } : m))} />
            <h4>Categoría</h4>
            <input type="text" value={movie.categoria} onChange={(e) => setMovies(movies.map(m => m.id === movie.id ? { ...m, categoria: e.target.value } : m))} />
            <h4>URL del Video</h4>
            <input type="text" value={movie.url} onChange={(e) => setMovies(movies.map(m => m.id === movie.id ? { ...m, url: e.target.value } : m))} />
            <h4>URL de la Imagen</h4>
            <input type="text" value={movie.imageUrl} onChange={(e) => setMovies(movies.map(m => m.id === movie.id ? { ...m, imageUrl: e.target.value } : m))} />
            {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} style={{ width: '100px' }} />}
            <br />
            <button onClick={() => updateMovie(movie.id, movie)}>Actualizar</button>
            <button onClick={() => deleteMovie(movie.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

