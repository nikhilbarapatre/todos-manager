const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);//Create a todo
  app.get('/api/todos', todosController.list);//Get the todo list
  app.post('/api/todos/:todoId/items', todoItemsController.create);//Create a todoitem
  app.get('/api/todos/:todoId', todosController.retrieve);//Get a todoitem
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);//Update a todoitem
  app.delete('/api/todos/:todoId', todosController.destroy);//Delete a todo
};