import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const URL = 'http://localhost:5000/tasks';

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log('calling API');
        const taskAPICOPY = response.data.map((task) => {
          // return { ...task, isComplete: task.is_complete };
          return {
            description: task.description,
            id: task.id,
            isComplete: task.is_complete,
            title: task.title,
          };
        });
        setTaskData(taskAPICOPY);
        console.log('taskAPICOPY:', taskAPICOPY);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateIsComplete = (taskId, updatedIsComplete) => {
    console.log('UpdateIs complete is being called:');
    console.log(updatedIsComplete);
    const newTaskData = [];

    if (updatedIsComplete === true) {
      // mark complete
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
              console.log(newTask);
            }
          }
          setTaskData(newTaskData);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // mark incomplete
      axios
        .patch(`${URL}/${taskId}/mark_incomplete`)
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
              console.log(newTask);
            }
          }
          setTaskData(newTaskData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const createTask = () => {
  //   console.log('create task called');
  //   axios.post(`${URL}`).then(() => {
  //     const newTaskData = [];
  //   });
  // };

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
