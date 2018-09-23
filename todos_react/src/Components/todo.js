import React, { Component } from "react";
import axios from "axios";
//import TodoItem from "./todoItems";
const todosUrl = "/api/todos";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoId: ""
    };
    this.createTodo = this.createTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    const body = {
      title: "new"
    };
    axios
      .post(todosUrl + "/", body)
      .then(res => this.setState({ todoId: res.data.id }))
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  createTodo(e) {
    //This function is used to create a new todo.
    e.preventDefault();
    const body = {
      content: this.state.text,
      complete: false,
      todoId: this.state.todoId
    };

    axios
      .post(todosUrl + "/" + this.state.todoId + "/items", body)
      .then(res =>
        this.setState({ todoList: this.state.todoList.concat(res.data) })
      )
      .catch(err => console.log(err));
  }

  deleteTodo(id) {
    //This function is used to delete a todo.
    axios
      .delete(todosUrl + "/" + this.state.todoId + "/items/" + id)
      .then()
      .catch(err => console.log(err));

    this.setState({
      todoList: this.state.todoList.filter(todo => {
        return todo.id !== id;
      })
    });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.createTodo}>
            <p>Add new todo</p>
            <input onChange={this.handleChange} placeholder="Todo Name" />
            <button type="submit">Add</button>
          </form>
        </div>
        <ul>
          {this.state.todoList.map(todos => (
            <li key={todos.id}>
              {todos.content}
              <button onClick={this.deleteTodo.bind(this, todos.id)}>
                Delete
              </button>
              {/* {<TodoItem current={todos} />} */}
              <p />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
