import './Updatetask.css'
import React ,{useState} from 'react'
import axios from 'axios'
function Updatetask(props) {
    const [task,setTask] = useState(props.task.todo)
    const [descr,setDesc] = useState(props.task.desc)
    const [datee,setDate] = useState(props.task.date)
    const updateTask = () => {
        if(task.trim() === ''){
            props.removePopup()
        } else {
            if((props.task.todo===task && props.task.desc===descr && props.task.date!==datee) || (props.task.todo===task && props.task.desc!==descr && props.task.date!==datee) || (props.task.todo!==task && props.task.desc===descr && props.task.date!==datee) || (props.task.todo!==task && props.task.desc!==descr && props.task.date!==datee) || (props.task.todo===task && props.task.desc!==descr && props.task.date===datee) || (props.task.todo!==task && props.task.desc===descr && props.task.date===datee) || (props.task.todo!==task && props.task.desc!==descr && props.task.date===datee))
            axios.put(`http://localhost:8000/api/tasks/${props.task._id}`,{
                _id : props.task._id,
                todo : task,
                desc : descr,
                date : datee,
                isComplete : props.task.isComplete
            }).then(res => {
                props.removePopup()
                props.updatetask(res.data)
            }).catch(err => console.log(err))
            else
                props.removePopup()
        }
    }
    return (
        <div className = 'popup'>
            <div className = 'popup-content'>
                <input type = 'text'  placeholder = 'Update Task . . .' value = {task} onChange = {event => setTask(event.target.value)}/>
                <input type = 'text'  placeholder = 'Description...' value = {descr} onChange = {event => setDesc(event.target.value)}/>
                <input type = 'date' min={new Date().toISOString().split('T')[0]}  placeholder = 'Date' value = {datee} onChange = {event => setDate(event.target.value)}/>
                <button onClick = {() => updateTask()}>Update</button>
            </div>
        </div>
    )
}

export default Updatetask