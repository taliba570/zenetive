import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

interface Task {
  text: string;
  isCompleted: boolean;
}

interface TaskListProps {
  darkMode: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ darkMode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever `tasks` state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, { text: taskInput, isCompleted: false }]);
      setTaskInput('');
    }
  };

  const confirmAndRemoveTask = (index: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeletingIndex(index);
      setTimeout(() => {
        removeTask(index);
        setDeletingIndex(null); // Reset the deleting index after animation
      }, 300); // Match this duration with your animation time
    }
  };

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-4 w-full">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl w-full m-auto">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">Task List</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add new task"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            onClick={addTask}
            className="p-2 bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white rounded-lg font-semibold shadow-2xl hover:from-green-500 hover:to-green-700 transition transform active:scale-95 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlus} /> <span className="px-2">Add</span>
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`${deletingIndex === index ? 'animate-pulse' : ''} flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow`}
            >
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`text-green-500 hover:text-green-700 dark:hover:text-green-400 transition flex items-center justify-center pr-3 ${
                    task.isCompleted ? 'opacity-50' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
              </div>
              <span
                className={`flex-grow ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={() => toggleTaskCompletion(index)}
              >
                {task.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => confirmAndRemoveTask(index)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
