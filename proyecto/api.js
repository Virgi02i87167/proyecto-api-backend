const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())

app.use(express.json())

let movies = []

app.get('/movies', (req, res) => {
    res.json(movies)
})

app.post('/movies', (req, res) => {
    const newmovies = {
        id: movies.length + 1,
        title: req.body.title,
        protagonista: req.body.protagonista,
        categoria: req.body.categoria,
        url: req.body.url,
        complete: false
    }
    movies.push(newmovies)
    res.status(201).json(newmovies)
})

app.get('/movies/:id', (req, res) => {
    const movieskid = parseInt(req.params.id)
    const movie = movies.find(m => m.id === movieskid)
    if (movie) {
        res.json(movie)
    } else {
        res.status(404).send('No se encontro la tarea')
    }
})

app.put('/movies/:id', (req,res) => {
    const movieskid = parseInt(req.params.id)
    const movie = movies.find(m=> m.id === movieskid)
    if(movie){
        movie.title=req.body.title || movie.title
        movie.complete = req.body.complete !== undefined ? req.body.complete: movie.complete
        res.json(movie)
    }else{
        res.status(404).send('No se actualizo la tarea')
    }
})

app.delete('/movies/:id', (req,res) => {
    const movieskid = parseInt(req.params.id)
    const movieskin = movies.findIndex(t=> t.id === movieskid)
    if(movieskin !== -1){
        movies.splice(movieskin,1);
        res.status(204).send('Registro eliminado xd');
    }else{
        res.status(404).send('No se elimino la tarea');
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})