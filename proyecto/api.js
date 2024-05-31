const express = require('express')
const fs = require('fs');
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())

const filePath = './movies.json';

const readMoviesFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

const writeMoviesToFile = (movies) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(movies, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
    }
};

let movies = readMoviesFromFile();

app.get('/movies', (req, res) => {
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        protagonista: req.body.protagonista,
        categoria: req.body.categoria,
        url: req.body.url,
        imageUrl: req.body.imageUrl, 
        complete: false
    }
    movies.push(newMovie)
    writeMoviesToFile(movies);
    res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id)
    const movie = movies.find(m => m.id === movieId)
    if (movie) {
        res.json(movie)
    } else {
        res.status(404).send('No se encontró la película')
    }
})

app.put('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id)
    const movie = movies.find(m => m.id === movieId)
    if (movie) {
        movie.title = req.body.title || movie.title
        movie.protagonista = req.body.protagonista || movie.protagonista
        movie.categoria = req.body.categoria || movie.categoria
        movie.url = req.body.url || movie.url
        movie.imageUrl = req.body.imageUrl || movie.imageUrl 
        movie.complete = req.body.complete !== undefined ? req.body.complete : movie.complete
        writeMoviesToFile(movies);
        res.json(movie)
    } else {
        res.status(404).send('No se encontró la película para actualizar')
    }
})

app.delete('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id)
    const movieIndex = movies.findIndex(t => t.id === movieId)
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        writeMoviesToFile(movies);
        res.status(204).send('Registro eliminado');
    } else {
        res.status(404).send('No se encontró la película para eliminar');
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})
