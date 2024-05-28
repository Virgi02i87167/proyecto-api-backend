const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())

app.use(express.json())

let tasks = []

app.get('/task', (req, res) => {
    res.json(tasks)
})

app.post('/task', (req, res) => {
    const newtask = {
        id: tasks.length + 1,
        title: req.body.title,
        url: req.body.url,
        complete: false
    }
    tasks.push(newtask)
    res.status(201).json(newtask)
})

app.get('/task/:id', (req, res) => {
    const taskid = parseInt(req.params.id)
    const task = tasks.find(t => t.id === taskid)
    if (task) {
        res.json(task)
    } else {
        res.status(404).send('No se encontrol la tarea')
    }
})

app.put('/task/:id', (req,res) => {
    const taskid = parseInt(req.params.id)
    const task = tasks.find(t=> t.id === taskid)
    if(task){
        task.title=req.body.title || task.title
        task.complete = req.body.complete !== undefined ? req.body.complete: task.complete
        res.json(task)
    }else{
        res.status(404).send('No se actualizo la tarea')
    }
})

app.delete('/task/:id', (req,res) => {
    const taskid = parseInt(req.params.id)
    const taskin = tasks.findIndex(t=> t.id === taskid)
    if(taskin !== -1){
        tasks.splice(taskin,1)
        res.status(204).send('Registro eliminado xd')
    }else{
        res.status(404).send('No se elimino la tarea')
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}`)
})