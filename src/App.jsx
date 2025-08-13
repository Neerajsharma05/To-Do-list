import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [input, setinput] = useState("");
  const [task, settask] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("Task");

    if (todoString) {
      let task = JSON.parse(todoString);
      settask(task);
    }
  }, []);

  const SaveToLS = () => {
    localStorage.setItem("Task", JSON.stringify(task));
  };

  const inputhandler = (e) => {
    setinput(e.target.value);
    // console.log(input)
    // console.log(task)
    // settask([...task, input])
    // console.log(task)
    // setinput('')
  };

  const addBtn = (e) => {
    e.preventDefault();

    if (task.includes(input)) {
      alert(`You Already added this Task `);
      return;
    }

    if (input.trim() === "") return;
    settask([...task, input]);
    console.log(task);
    setinput("");
    SaveToLS();
  };

  const deleteHandler = (index) => {
    const newTask = [...task];
    newTask.splice(index, 1);
    settask(newTask);
    SaveToLS();
  };

  const edithandler = (index) => {
    setinput(task[index])   
    const newTask = [...task];
    newTask.splice(index, 1);
    settask(newTask);
    SaveToLS();
  }
  

  return (
    <div id="container">
      <h1>To Do List</h1>
      <div id="inputContainer">
        <form>
          <input
            value={input}
            onChange={(e) => inputhandler(e)}
            type="text"
            placeholder="Eneter your task..."
          />
          <button onClick={(e) => addBtn(e)}>Add Task</button>
        </form>
      </div>
      <ul id="todoList">
          {task.length === 0 && <div className="notask">No task to Display </div>}

        {task.map((task, idx) => {
          return (
            <li key={idx}>
              <span id={idx} className={isChecked ? "striked" : ""}>
                {task}
              </span>

              <div>
                <button 
                onClick={()=>{
                  edithandler(idx)
                }}
                id="edit">Edit</button>
                <button
                  onClick={() => {
                    deleteHandler(idx);
                  }}
                >
                  Delete Task
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
