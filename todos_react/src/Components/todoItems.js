import React, { Component } from "react";
import axios from "axios";
const todosUrl = "/api/todos";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    console.log(this.props.current.id);
    //axios.get(todosUrl + "/" + this.props.current.todoId);
    this.setState({ item: this.props.current });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  addItem(e) {
    //This function is used to create a todoItem.
    e.preventDefault();
    const body = {
      content: this.state.text,
      complete: false
    };
    //console.log("text = " + body.content);
    console.log("ID = " + todosUrl + "/" + this.props.current.id + "/items");
    axios
      .post(todosUrl + "/" + this.props.current.todoId + "/items", body)
      .then(res => this.setState({ items: this.state.item.concat(res.data) }))
      .catch(err => console.log(err));
  }

  render() {
    let body;
    <div>
      if(this.state.item.todoItems.map ==== 0)
      {(body = "")}
      else
      {
        (body = (
          <ul>
            <form onSubmit={this.addItem}>
              <input onChange={this.handleChange} placeholder="Todo Name" />
              <button type="submit">Add item</button>
            </form>
            {this.state.item.todoItems.map(todoItem => (
              <li key={todoItem.id}>{todoItem.content}</li>
            ))}
          </ul>
        ))
      }
    </div>;
    return body;
  }
}

export default TodoItem;
