let STORAGE = []
let ID = 1

// Validates a ToDo Object
function validTodo (body) {
    if (!body.text) {
        return false
    }

    return true
}

module.exports = function (app) {
    console.log("Loading /api/todo items")
    app.get('/api/todos', (req, res) => {
        res.status(200).send(STORAGE)
    })

    app.post('/api/todos', function (request, res) {
        if (!request.body || !validTodo(request.body)) {
            res.status(401).send("Invalid")
            return
        }

        const item = {
            ...request.body, // This will get the text and isDone properties
            id: ID
        }

        STORAGE.push(item)
        ID++ // Add 1 for every new item added
        res.status(200).send(item)
    })

    app.delete('/api/todos', function (req, res) {
        STORAGE = STORAGE.filter(todo => todo.id !== req.body.id)
        res.status(200).send("Deleted")
    })

    app.put('/api/todos/:todoId', function (req, res) {
        const data = req.body
        const idx = STORAGE.findIndex(todo => todo.id == req.params.todoId)
        console.log(data)
        if (!STORAGE[idx]) {
            res.status(404).send("Not Found")
            return
        }

        for (key in data) {
            STORAGE[idx][key] = data[key]
        }

        res.status(200).send("Updated")
    })
}