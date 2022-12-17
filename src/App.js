import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
// import { useState } from 'react';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  // const initialcopy = TASKS.map((task) => {
  //   return { ...task };
  // });

  const [taskData, setTaskData] = useState([]);

  const URL = 'http://localhost:5000/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log('calling API');
        const taskAPICOPY = response.data.map((task) => {
          return { ...task };
        });
        setTaskData(taskAPICOPY);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateIsComplete = (taskId, updatedIsComplete) => {
    console.log('UpdateIs complete is being called');
    const newTaskData = [];
    axios
      .patch(`${URL}/${taskId}/mark_complete`)
      .then(() => {
        for (const task of taskData) {
          if (task.id !== taskId) {
            newTaskData.push(task);
          } else {
            const newTask = {
              ...task,
              isComplete: updatedIsComplete,
            };
            newTaskData.push(newTask);
          }
        }
        setTaskData(newTaskData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (taskId) => {
    console.log('delete task called');
    axios
      .delete(`${URL}/${taskId}`)
      .then(() => {
        const newTaskData = [];
        for (const task of taskData) {
          if (task.id !== taskId) {
            newTaskData.push(task);
          }
        }
        setTaskData(newTaskData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            updateIsComplete={updateIsComplete}
            deleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};
export default App;
