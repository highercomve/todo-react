import React from 'react'
import className from 'classnames'
import TodoStore from '../stores/todo_store'


class TaskItem extends React.Component {

  constructor() {
    super()
    this.state = { title: '', id: 1, status: '' }
  }

  componentDidMount() {
    this.setState({
      title: this.props.task.title,
      id: this.props.task.id,
      status: this.props.task.status
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
    var checkDone = (this.state.status === TodoStore.DONE ) ? true : false
    var toggleForID = `statusToggle-${this.state.id}`
    var statusClasses = className({
      'task-status': true,
      'status-undone': this.state.status === TodoStore.UNDONE,
      'status-done': this.state.status === TodoStore.DONE
    });
    return (
      <li className="task">
        <input
          id={toggleForID}
          className="task-status-toggle"
          type="checkbox"
          checked={checkDone}
          onChange={this.markDone.bind(this)} />
        <label htmlFor={toggleForID}></label>
        <span className="task-title">{ this.state.title }</span>
        <button className="task-remove" onClick={this.removeTask.bind(this)} >&times;</button>
      </li>
    )
  }

}

export default TaskItem
