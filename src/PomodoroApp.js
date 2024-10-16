import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PomodoroApp() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(25 * 60);
        setIsBreak(false);
      } else {
        setTime(5 * 60);
        setIsBreak(true);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask && newTaskTime) {
      try {
        const response = await axios.post('http://localhost:5000/api/tasks', {
          name: newTask,
          estimatedTime: parseInt(newTaskTime)
        });
        setTasks([...tasks, response.data]);
        setNewTask('');
        setNewTaskTime('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Pomodoro Timer</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-6xl font-bold mb-4 text-center">{formatTime(time)}</div>
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => {
              setTime(25 * 60);
              setIsActive(false);
              setIsBreak(false);
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
        <div className="text-center mb-4">{isBreak ? 'Break Time!' : 'Work Time'}</div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="number"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            placeholder="Estimated time (minutes)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <button
            onClick={addTask}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Task
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center mb-2">
              <span>{task.name} ({task.estimatedTime} min)</span>
              <button
                onClick={() => removeTask(task._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}