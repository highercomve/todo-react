import React from 'react'
import TodoStore from '../stores/todo_store'

class TodoForm extends React.Component {
  handleNewTodoKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();

    let val = e.target.value.trim();

    if (val) {
      TodoStore.add(val)
      e.target.value = '';
    }
  }
  render() {
    return (
      <form className="todo-form">
        <input 
          ref="newTask"
          name="task" 
          type="text"
          placeholder="Add new task"
          onKeyDown={this.handleNewTodoKeyDown.bind(this)}
        />
      </form>
    )
  }
}

export default TodoForm
