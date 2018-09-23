import React, { Component } from "react";
import axios from "axios";
const todosUrl = "/api/todos";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
  }

  componentDidMount() {
    axios
      .get(todosUrl)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
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
