import uuid from 'node-uuid'

const TodoStore = {
  tasks: getLocal(),
  changeEvent: new Event('onChangeTodoStore'),
  add(task) {
    this.tasks.push(Task(task))
    window.dispatchEvent(this.changeEvent)
    return this.tasks
  },
  onChange(cb) {
    window.addEventListener('onChangeTodoStore', cb, false)
  },
  remove(task) {
    let index = findTaskIndex(task)
    this.tasks.splice(index, 1)
    window.dispatchEvent(this.changeEvent)
    return this.tasks
  },
  update(task, newTask) {
    let oldTask = findTask(task)
    return Object.assign(oldTask, newTask)
  },
  toggleStatus(task) {
    let oldtask = findTask(task)
    let toggledStatus = (oldtask.done === TodoStore.DONE) ? TodoStore.UNDONE : TodoStore.DONE
    Object.assign(oldtask, {done: toggledStatus})
    window.dispatchEvent(this.changeEvent)
    return oldtask
  },
  get(taskIndex) {
    return this.tasks[taskID]
  },
  getAll(sort = 'default') {
    this.tasks = this.tasks.sort(function(a,b) {
      return a.done - b.done
    }).slice(0)
    return this.tasks
  },
  UNDONE: false,
  DONE: true,
  syncLocal: setLocal()
}

function setLocal() {
  window.addEventListener('onChangeTodoStore', function(e) {
    window.localStorage.setItem('tasks', JSON.stringify(TodoStore.getAll()))
  })
}

function getLocal() {
  var localTask = window.localStorage.getItem('tasks')
  if(typeof localTask === 'undefined' || localTask === '' || localTask === null) {
    return []
  } else {
    return JSON.parse(localTask)
  }
}

function findTaskIndex(task) {
  return TodoStore.tasks.findIndex(function(element) {
    return task.id === element.id
  })
}

function findTask(task) {
  return TodoStore.tasks.find(function(element) {
    return task.id === element.id
  })
}

function Task(title, done = TodoStore.UNDONE) {
  return { id: uuid.v1(), title: title, done: done}
}

export default TodoStore
