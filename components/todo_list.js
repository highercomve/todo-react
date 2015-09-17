import React from 'react'
import TaskItem from './task_item'
import TodoForm from './task_form'
import TodoStore from '../stores/todo_store'

class TodoList extends React.Component {
  constructor() {
    super()
    this.state = { tasks: [] }
  }

  componentDidMount() {
    this.setState({ tasks: TodoStore.getAll() })
    TodoStore.onChange(this.updateList.bind(this))
  }

  updateList(e) {
    console.log('Updating list for changes')
    this.setState({ tasks: TodoStore.getAll() })
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <ul className="task-list">
            { this.state.tasks.map((task, index) => {
              return <TaskItem key={task.id} task={task} />
            })}
        </ul>
        <TodoForm />
      </div>
    )
  }
}
export default TodoList
