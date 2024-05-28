const express = require('express')
const app = express()
const port = 4000
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
        url: req.body.url,
        complete: false
    }
    movies.push(newmovies)
    res.status(201).json(newmovies)
})

app.get('/movies/:id', (req, res) => {
    const taskid = parseInt(req.params.id)
    const task = movies.find(t => t.id === taskid)
    if (task) {
        res.json(task)
    } else {
        res.status(404).send('No se encontrol la tarea')
    }
})

app.put('/movies/:id', (req,res) => {
    const taskid = parseInt(req.params.id)
    const task = movies.find(t=> t.id === taskid)
    if(task){
        task.title=req.body.title || task.title
        task.complete = req.body.complete !== undefined ? req.body.complete: task.complete
        res.json(task)
    }else{
        res.status(404).send('No se actualizo la tarea')
    }
})

app.delete('/movies/:id', (req,res) => {
    const taskid = parseInt(req.params.id)
    const taskin = movies.findIndex(t=> t.id === taskid)
    if(taskin !== -1){
        movies.splice(taskin,1)
        res.status(204).send('Registro eliminado xd')
    }else{
        res.status(404).send('No se elimino la tarea')
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})