const express = require('express')
const fs = require('fs');
const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())

const filePath = './movies.json';

// Leer las películas del archivo
const readMoviesFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
};

// Guardar las películas en el archivo
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
    const newmovies = {
        id: movies.length + 1,
        title: req.body.title,
        protagonista: req.body.protagonista,
        categoria: req.body.categoria,
        url: req.body.url,
        complete: false
    }
    movies.push(newmovies)
    writeMoviesToFile(movies); //parte agregada
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
        writeMoviesToFile(movies); //parte agregada
        res.json(movie)
    }else{
        res.status(404).send('No se actualizo la tarea')
    }
})

// app.patch('/task/:id', (req,res) => {
//     const taskid = parseInt(req.params.id)
//     const task = tasks.findIndex(t=> t.id === taskid)
//     if(task){
//         if(req.body.title !== undefined){
//             task.title = req.body.title
//         }
//         req.json(task)
//     }else {
//         res.status(404).send('No se encontro la tarea')
//     }
// })


app.delete('/movies/:id', (req,res) => {
    const movieskid = parseInt(req.params.id)
    const movieskin = movies.findIndex(t=> t.id === movieskid)
    if(movieskin !== -1){
        movies.splice(movieskin,1);
        writeMoviesToFile(movies); //parte agregada
        res.status(204).send('Registro eliminado xd');
    }else{
        res.status(404).send('No se elimino la tarea');
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})