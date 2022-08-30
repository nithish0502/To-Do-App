import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Addtask from './Components/Addtask'
import Todolist from './Components/Todolist'
import Updatetask from './Components/Updatetask'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

function App() {
  const [todolist,setTodolist] = useState([])
  const [tasktoUpdate , setTasktoUpdate] = useState({})
  const [showPopup,setShowPopup] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks').then(res => {
      setTodolist(res.data)
    }).catch(err => console.log(err))
  },[])
  const addTask = newTask => {
    setTodolist([newTask,...todolist])
  }
  const taskComplete = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.isComplete = task.isComplete
      }
    })
    setTodolist(newList)
  }
  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id))
    setTodolist(newList)
  }
  const updatetask = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.todo = task.todo;
        item.desc = task.desc;
        item.date = task.date;
      }
    })
    setTodolist(newList)
  }
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <LibraryBooksOutlinedIcon className = 'book' />
      <span style={{fontSize:'45px',fontFamily:'sans-serif',marginRight:'100px', padding: '25px 0 25px 55px'}}>NOTES</span>
      </div>

      <Addtask addTask = {addTask}/>
      <Todolist todolist = {todolist} taskComplete = {taskComplete} removeTask = {removeTask} tasktoUpdate = {task => setTasktoUpdate(task)} showPopup = {() => setShowPopup(!showPopup)}/>
      {showPopup && <Updatetask task = {tasktoUpdate} updatetask = {updatetask} removePopup = {() => setShowPopup(!showPopup)}/>}
    </div>
  )
}

export default App
