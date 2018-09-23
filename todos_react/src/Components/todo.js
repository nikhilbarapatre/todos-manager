import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./todoItems";
const todosUrl = "/api/todos";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.createTodoList = this.createTodoList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTodoList = this.deleteTodoList.bind(this);
  }

  componentDidMount() {
    axios
      .get(todosUrl)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  createTodoList(e) {
    //This function is used to create a new todo.
    e.preventDefault();
    console.log("todo = " + this.state.text);
    const body = {
      title: this.state.text
    };
    axios
      .post(todosUrl, body)
      .then(res =>
        this.setState({ todoList: this.state.todoList.concat(res.data) })
      )
      .catch(err => console.log(err));
  }

  deleteTodoList(id) {
    //This function is used to delete a todo.
    axios
      .delete(todosUrl + "/" + id)
      .then()
      .catch(err => console.log(err));

    this.setState({
      todoList: this.state.todoList.filter(todo => {
        return todo.id !== id;
      })
    });
  }

  updateTodoList(todo) {
    //This function is used to update a todo.
    console.log("Here id = " + todo.id);
    axios.put(todosUrl);
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.createTodoList}>
            <p>Add new todo</p>
            <input onChange={this.handleChange} placeholder="Todo Name" />
            <button type="submit">Add</button>
          </form>
        </div>
        <ul>
          {this.state.todoList.map(todos => (
            <li key={todos.id}>
              <a href="">{todos.title}</a>
              <button onClick={this.deleteTodoList.bind(this, todos.id)}>
                Delete
              </button>
              <button onClick={this.updateTodoList.bind(this)}>Check</button>
              {<TodoItem current={todos.todoItems} />}
              <p />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
