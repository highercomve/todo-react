import React from 'react'
import className from 'classnames'
import TodoStore from '../stores/todo_store'


class TaskItem extends React.Component {

  constructor() {
    super()
    this.state = { title: '', id: 1, done: '' }
  }

  componentDidMount() {
    this.setState({
      title: this.props.task.title,
      id: this.props.task.id,
      done: this.props.task.done
    })
  }

  removeTask() {
    console.info('Removing task with index: ', this.state)
    TodoStore.remove(this.state)
  }

  markDone(e) {
    //TodoStore.toggleStatus(this.state)
    this.setState(TodoStore.toggleStatus(this.state))
  }

  render() {
    var toggleForID = `doneToggle-${this.state.id}`
    var doneClasses = className({
      'task-done': true,
      'status-undone': this.state.done === TodoStore.UNDONE,
      'status-done': this.state.done === TodoStore.DONE
    });
    return (
      <li className="task">
        <input
          id={toggleForID}
          className="task-status-toggle"
          type="checkbox"
          checked={this.state.done}
          onChange={this.markDone.bind(this)} />
        <label htmlFor={toggleForID}></label>
        <span className="task-title">{ this.state.title }</span>
        <button className="task-remove" onClick={this.removeTask.bind(this)} >&times;</button>
      </li>
    )
  }

}

export default TaskItem
