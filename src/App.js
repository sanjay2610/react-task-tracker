import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AddTask from './components/AddTask';
import About from './components/About';


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks]  = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

//Fetch data from the backend
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
}

//Fetch a specific task from the backend
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

//Create Task
const addTask = async(task) => {
  // Add the new task to the database
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    // convert the javascript object in JSON format
    body: JSON.stringify(task)
  })

  const newTask = await res.json()

  setTasks([...tasks, newTask])

  // const id = Math.floor(Math.random() * 10000) + 1

  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
  method: 'PUT',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(updateTask)
  })

  const data = await res.json()


  setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: 
    data.reminder } : task))
}

  return (
    <Router>
    <div className="container">
      <Header 
      onAdd= {() => setShowAddTask(!showAddTask) } showAdd={showAddTask}  
      title = {'Task Tracker'} />
  
      <Route path='/' exact render={(props) =>(
        <>
          {showAddTask && <AddTask onAdd= {addTask} />}
          {tasks.length >0 ? (
          <Tasks tasks = {tasks} onDelete= {deleteTask}  onToggle= {toggleReminder} />
          ):(
            'No Tasks Left!!'
          )
          }
        </>
        )}
        />
      <Route path= '/about' component={About} />
      <Footer />
    </div>
    </Router>
  )
}

export default App;
