import React, { Component } from "react";
import axios from "axios";
import "../bootstrap.css";
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
    this.updateTodo = this.updateTodo.bind(this);
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

  updateTodo(id) {
    //This function is used to update a todo.
    axios
      .put(todosUrl + "/" + this.state.todoId + "/items/" + id, {
        complete: true
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="container">
            <h1 className="text-center">Create todo </h1>
            <form className="form-inline" onSubmit={this.createTodo}>
              <input
                className="form-control col-11"
                onChange={this.handleChange}
                placeholder="Todo Name"
              />
              <button className="btn btn-primary col-1" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="container">
          <table className="table table-striped">
            <tbody>
              {this.state.todoList.map(todos => (
                <tr>
                  <td key={todos.id}>{todos.content}</td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={this.updateTodo.bind(this, todos.id)}
                    >
                      Done
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={this.deleteTodo.bind(this, todos.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Todo;
