import React, { Component } from "react";
// import axios from "axios";
const todosUrl = "/api/todos";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: []
    };
    // this.handleChange = this.handleChange.bind(this);
    //this.createTodoItem = this.createTodoItem.bind(this);
  }

  //   handleChange(e) {
  //     this.setState({ text: e.target.value });
  //   }

  //   createTodoItem(e) {
  //     //This function is used to create a todoItem.
  //     e.preventDefault();
  //     //console.log("todoItem = " + this.state.text);
  //     const body = {
  //       content: this.state.text
  //     };
  //     axios
  //       .post(todosUrl, body)
  //       .then(res =>
  //         this.setState({ items: this.state.todoList.concat(res.data) })
  //       )
  //       .catch(err => console.log(err));
  //   }

  render() {
    return (
      <ul>
        {this.props.current.map(todoItem => (
          <li key={todoItem.id}>{todoItem.content}</li>
        ))}
      </ul>
    );
  }
}

export default TodoItem;
