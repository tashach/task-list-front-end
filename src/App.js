import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
// import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const initialcopy = TASKS.map((task) =>{
    return{...task};
  });

  const [taskData, setTaskData] = useState(initialcopy)

  const updateIsComplete = (taskId, updatedIsComplete) => {
    console.log('UpdateIs complete is being called');
    const newTaskData = taskData.map((task) => {
      if (task.id !== taskId){
        return task
      } else {
        const newTask = {
          ...task,
          isComplete:updatedIsComplete
        }
        return newTask;
      }
    });
    setTaskData(newTaskData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} updateIsComplete={updateIsComplete}/>}</div>
      </main>
    </div>
  );
};



export default App;
