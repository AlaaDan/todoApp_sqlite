const { Router } = require('express')
const router = Router()
const uuid = require('uuid-random')
const {insert, getAll, deleteToDo } = require('../model/todo')
const { checBody, checkParams } = require('../middleware/todo.middleware')

let todos = [
    {todo: "Buy coffie", id: uuid(), done: false},
    {todo: "Buy cake", id: uuid(), done: false},
    {todo: "Drink coffie", id: uuid(), done: false},
    {todo: "Eat cake", id: uuid(), done: false},
]

router.get('/', async (req, res)=>{
    const todos = await getAll()
    console.log('test',todos)
    res.json({success: true, todos: todos})
})

router.post('/', (req, res)=>{
    const {todo} = req.body

    insert(todo, false)
      
    const result = {success: true, todos: todos}
    res.json(result)
})

router.delete('/:id', checkParams, (req, res)=>{
    const id = parseInt(req.params.id)
    //console.log(id)
    deleteToDo(id)
    // todos = todos.filter((todo)=>{
    //     if(todo.id === id){
    //         return todo
    //     }
    // })

    const result = {success: true}
    res.json(result)
})

module.exports = router