import './Addtask.css'
import React ,{useState} from 'react'
import axios from 'axios'
function Addtask(props) {
    const [task,Settask] = useState("")
    const [desc] = useState("")
    const [date] = useState("")
    const addtask = () => {
        if(task.trim() === ''){
            return 
        } else {
            axios.post('http://localhost:8000/api/tasks' , {
                todo : task,
                desc : desc,
                date : date,
                isComplete : false
            }).then(res => {
                Settask("")
                props.addTask(res.data)
            }).catch(err => console.log(err))
        }
    }
    return (
            
        <div className = 'addtask'>
            <input style={{borderRadius:'0px'}} type='text' placeholder = 'Add Task . . .' value = {task} onChange = {event => Settask(event.target.value)}/>
            <button onClick = {() => addtask()}>Add Task</button>
        </div>
    )
}

export default Addtask
