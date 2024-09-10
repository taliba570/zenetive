import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput/TaskInput';
import TaskListContainer from './TaskListContainer/TaskListContainer';
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

  const deleteTask = (index: number) => {
    setDeletingIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

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
    <div className="min-h-screen w-full mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl w-full m-auto">
        <TaskInput taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} />

        <TaskListContainer
          tasks={tasks}
          editingIndex={editingIndex}
          deletingIndex={deletingIndex}
          editedText={editedText}
          setEditedText={setEditedText}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          deleteTask={deleteTask}
          saveTask={saveTask}
          cancelEdit={cancelEdit}
        />
      </div>

      {isModalOpen && <Modal 
        isOpen={isModalOpen}
        title='Delete Task'
        message='Are you sure you want to delete this task? This action can not be undone.'
        iconType='warning'
        modalType='confirmation'
        onConfirm={confirmAndRemoveTask}
        onCancel={closeModal} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default TaskList;
