import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  }

  const addTask = async () => {
    await axios.post('http://localhost:5000/tasks', { title: newTask });
    setNewTask("");
    fetchTasks();
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>Task Manager</h1>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => <li key={task.id}>{task.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
