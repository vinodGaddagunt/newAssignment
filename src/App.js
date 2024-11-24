import {useState, useEffect} from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('Pending')
  const [editing, setEditing] = useState(false)
  const [currentTask, setCurrentTask] = useState({})

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = e => {
    e.preventDefault()
    if (editing) {
      const updatedTasks = tasks.map(task => {
        if (task.id === currentTask.id) {
          return {...task, title, description, dueDate, status}
        }
        return task
      })
      setTasks(updatedTasks)
      setEditing(false)
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
        status,
      }
      setTasks([...tasks, newTask])
    }
    setTitle('')
    setDescription('')
    setDueDate('')
    setStatus('Pending')
  }

  const handleDelete = id => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleEdit = task => {
    setEditing(true)
    setCurrentTask(task)
    setTitle(task.title)
    setDescription(task.description)
    setDueDate(task.dueDate)
    setStatus(task.status)
  }

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          placeholder="Due Date"
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <button type="button" onClick={() => handleEdit(task)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
