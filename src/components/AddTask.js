import React from 'react'
import {useState} from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
          e.preventDefault();
          
          if(!text){
              alert('Please add a Task')
              return
          }

          // Call addTask function on App.js
          onAdd({text, day, reminder})

          // Clear all the fields of the Task form
          setDay('')
          setText('')
          setReminder(false)
    }
    return (
     
        <form className='add-form' onSubmit={onSubmit}>
            <div className= 'form-control'>
                <label>Task</label>
                <input type= 'text' placeholder='Add Task' 
                value= {text} onChange= {(e) => setText(e.target.value)} />
            </div>
            <div className= 'form-control'>
                <label>Day & Time</label>
                <input type= 'text' placeholder='Add Date & Time' 
                value= {day} onChange= {(e) => setDay(e.target.value)} />
            </div>
            <div className= 'form-control form-control-check'>
                <span className="checkboxtext"> Set Reminder </span>
                <input type= 'checkbox' checked={reminder} value= {reminder}
                onChange= {(e) => setReminder(e.currentTarget.checked)} />
                

            </div>
            <input type= 'submit' value='Create Task' className= 'btn btn-block' />
        </form>
    )
}


export default AddTask
