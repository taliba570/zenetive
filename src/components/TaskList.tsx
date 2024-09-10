import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faCheckCircle,
  faList,
  faTimesCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal/Modal';
import Toast from './Toast/Toast';

interface Task {
  text: string;
  isCompleted: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' } | null>(null);

  const openModal = () => {
    setModalOpen(true)
  };
  const closeModal = () => setModalOpen(false);

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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput) {
      setTasks([...tasks, { text: taskInput, isCompleted: false }]);
      setTaskInput('');
      setToast({ message: 'Task added successfully!', type: 'success' });
    } else {
      setToast({ message: 'Unable to create task with empty title!', type: 'error' });
    }
  };

  const confirmAndRemoveTask = () => {
    if (deletingIndex) {
      setDeletingIndex(deletingIndex);
      setTimeout(() => {
        removeTask(deletingIndex);
        setDeletingIndex(null);
      }, 300);
      setToast({ message: 'Task deleted successfully!', type: 'success' });
      closeModal();
    } else {
      setToast({ message: 'Can not find task ID to delete.', type: 'error' });
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
    setToast({ message: 'Task completed successfully!', type: 'success' });
  }

  const editTask = (index: number) => {
    setEditingIndex(index);
    setEditedText(tasks[index].text);
  }

  const saveTask = (index:number) => {
    if (editedText !== '') {
      const newTasks = [...tasks];
      newTasks[index].text = editedText;
      setTasks(newTasks);
      setEditingIndex(null);
      setToast({ message: 'Task updated successfully!', type: 'success' });
    } else {
      setToast({ message: 'Task title can not be empty!', type: 'error' });
    }
  }

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedText('');
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4 w-full">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl w-full m-auto">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300"><span><FontAwesomeIcon icon={faList} className='pr-1'/> </span>Task List</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add new task"
            className="w-full px-4 py-2 rounded bg-gray-100 border dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="p-2 bg-gradient-to-br from-[#b446cf] to-[#d60884] text-white rounded-lg font-semibold shadow-2xl hover:from-[#d60884] hover:to-[#b446cf] transition transform active:scale-95 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPlus} /> <span className="px-2">Add</span>
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.filter(task => !task.isCompleted).length < 1 ? (
            (<li className='text-gray-900 dark:text-white text-center py-3 px-2 text-2xl'>
              🎉🎉 Huurrry! You have no pending task 🥳🥳!
            </li>)
          ) : (
            tasks.map((task, index) => { 
              if (task.isCompleted) { return <div key={index}></div>;}
              else {
                return (
                  <li
                    key={index}
                    className={`${deletingIndex === index ? 'animate-pulse' : ''} flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow`}
                  >
                    { 
                      editingIndex === index ? (
                        <div className='flex space-x-2 w-full'>
                          <input 
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className='flex-grow px-4 py-2 rounded bg-gray-100 border dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none'
                          />
                          <button
                            onClick={() => saveTask(index)}
                            className='text-green-500 hover:text-green-700 dark:hover:text-green-400 transition flex items-center justify-center'
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className='text-red-500 hover:text-red-700 dark:hover:text-red-400 transition flex items-center justify-center'
                          >
                            <FontAwesomeIcon icon={faTimesCircle} />
                          </button>
                        </div>
                      ) : (
                        <>
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
                              onClick={() => editTask(index)}
                              className='text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition flex items-center justify-center pr-3'
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => {setDeletingIndex(index);openModal();}}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition flex items-center justify-center"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </>
                      )}
                  </li>
              )}})
          )}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        title='Delete Task'
        message='Are you sure you want to delete this task? This action can not be undone.'
        iconType='warning'
        modalType='confirmation'
        onConfirm={confirmAndRemoveTask}
        onCancel={closeModal}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default TaskList;
