import React, { Component } from "react";
import axios from "axios";
const todosUrl = "/api/todos";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    console.log("todo = " + this.state.text);
    const body = {
      title: this.state.text
    };
    axios
      .post(todosUrl, body)
      .then(res => this.setState({ todoList: res.data.concat(body) }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <p>Add new todo: </p>
            <input onChange={this.handleChange} placeholder="Todo Name" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <ul>
          {this.state.todoList.map(todoList => (
            <li key={todoList.id}>
              {todoList.title}
              <p />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
