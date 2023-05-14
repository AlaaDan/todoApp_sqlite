const connectToDB = require('./db')
const db = connectToDB()

function insert(todo, done){
    
    db.run(
        `INSERT INTO todos (todo, done) VALUES (?, ?)`,
        [todo, done],
        (error) => {
            if(error) console.log("test",error.message)

            console.log("Inserted a new todo")
        }
    )
}

function getAll(){
    return new Promise((resolve, reject )=>{
        db.all(`SELECT * FROM todos`, (error, rows)=>{
            if(error) {reject(error.message)}
            else{resolve(rows)} 
        })   
    })
}

function deleteToDo(id){
    
    db.run(
        `DELETE FROM todos WHERE ID = ?`,
        [id],
        (error) => {
            if(error) console.log(error.message)

            console.log("Deleted todo")
        }
    )
}


module.exports = { insert, getAll, deleteToDo }