import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]); //controls what we CURRENTLY ALREADY have

  const [newTask, setNewTask] = useState(""); //controls what WILL be added next
  
  const [count, setCount] = useState(0);

  //adds newTask to tasks
  const addTask = () => {
    if(newTask !== "") {
      setTasks(tasks => [...tasks, newTask]);
      setCount(count+1);
      setNewTask("");
    }
  }

  const deleteTask = (indexToDelete) => {
    setTasks(tasks => tasks.filter((_, index) => index !== indexToDelete));
    setCount(count-1);
  }

  //reset tasks
  const clearAll = () => {
    setTasks([]);
    setCount(0);
  }

  const moveUp = (index) => {
    if(index === 0) return;
    let newTasks = [...tasks]; //create copy of tasks array

    //swap elements
    let temp = newTasks[index];
    newTasks[index] = newTasks[index-1];
    newTasks[index-1] = temp;

    //update the actual tasks
    setTasks(newTasks);
  }

  const moveDown = (index) => {
    if(index === tasks.length-1) return;
    
    let newTasks = [...tasks]; //create copy of tasks array

    //swap elements
    let temp = newTasks[index];
    newTasks[index] = newTasks[index+1];
    newTasks[index+1] = temp;

    //update the actual tasks
    setTasks(newTasks);
  }

  //e is the event handler automatically passed, we want its target (the input field) 's value (whatever is searched)

  return (
    <div className='container'>
      <h1 className='header'>To-Do List</h1>

      <div className='userInput'>
        <input
            placeholder='What needs to be done?'
            value = {newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}>
          </input>
        <button onClick={() => addTask()}>Add Task</button>
        <button onClick={() => clearAll()}>Clear All</button>
      </div>

      <div className='count'>
        <p>You have logged {count} task(s).</p>
      </div>

      <div className='list'>
        <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => moveUp(index)}>Move Up</button>
                <button onClick={() => moveDown(index)}>Move Down</button>
                <input type='checkBox'></input>
              </li>
              ))}
        </ul>
      </div>

    
      
    </div>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
