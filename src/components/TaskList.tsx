import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput/TaskInput';
import TaskListContainer from './TaskListContainer/TaskListContainer';
import Modal from './Modal/Modal';
import Toast from './Toast/Toast';
import { createTask, fetchTasks, updateTask, deleteTask } from '../services/apis/Tasks';
import { CreateTaskDto, Label, Task, TaskPriority } from '../types';
import { fetchLabels } from '../services/apis/Labels';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [priority, setPriority] = useState<TaskPriority>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [selectedLabels, setSelectedLabels] = useState<Label | null>(null);

  useEffect(() => {
    const loadLabels = async () => {
      try {
        const data: any = await fetchLabels();
        setLabels(data.data);
      } catch (error) {
        console.error('Error loading labels:', error);
      }
    };
    loadLabels();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    if (taskInput) {
      try {
        const newTask: CreateTaskDto = {
          name: taskInput,
          duration: 0,
          isCompleted: false,
          priority: priority,
          labels: selectedLabels ? [selectedLabels] : undefined,
        };
        const createdTask = await createTask(newTask);
        setTasks([...tasks, createdTask]);
        setTaskInput('');
        setPriority(null);
        setCreatingTask(false);
        setToast({ message: 'Task added successfully!', type: 'success' });
      } catch (error) {
        console.error('Error adding task:', error);
        setToast({ message: 'Unable to create task!', type: 'error' });
      }
    } else {
      setToast({ message: 'Unable to create task with empty title!', type: 'error' });
    }
  };

  const deleteTaskHandler = async () => {
    if (deletingIndex !== null) {
      try {
        await deleteTask(tasks[deletingIndex]._id);
        const newTasks = tasks.filter((_, index) => index !== deletingIndex);
        setTasks(newTasks);
        setDeletingIndex(null);
        setToast({ message: 'Task deleted successfully!', type: 'success' });
      } catch (error) {
        console.error('Error deleting task:', error);
        setToast({ message: 'Unable to delete task!', type: 'error' });
      } finally {
        closeModal();
      }
    } else {
      setToast({ message: 'Can not find task ID to delete.', type: 'error' });
    }
  };

  const editTask = (index: number) => {
    setEditingIndex(index);
    setEditedText(tasks[index].name);
  };

  const saveTask = async (index: number) => {
    if (editedText !== '') {
      try {
        if (tasks[index].name === editedText) {
          cancelEdit();
          return;
        }
        const updatedTask = { ...tasks[index], name: editedText };
        await updateTask(updatedTask._id, updatedTask);
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
        setEditingIndex(null);
        setCreatingTask(false);
        setToast({ message: 'Task updated successfully!', type: 'success' });
      } catch (error) {
        console.error('Error updating task:', error);
        setToast({ message: 'Unable to update task!', type: 'error' });
      }
    } else {
      setToast({ message: 'Task title can not be empty!', type: 'error' });
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedText('');
  };

  const toggleTaskCompletion = async (index: number) => {
    const updatedTask = { ...tasks[index], isCompleted: !tasks[index].isCompleted };
    try {
      await updateTask(updatedTask._id, updatedTask);
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
      setToast({ message: 'Task completed status updated!', type: 'success' });
    } catch (error) {
      console.error('Error updating task completion status:', error);
      setToast({ message: 'Unable to update task status!', type: 'error' });
    }
  };

  const openModal = (index: number) => {
    setDeletingIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen w-full mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl w-full m-auto">
        <TaskInput  
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={addTask}
          priority={priority}
          setPriority={setPriority}
          labels={labels}
          setLabels={setLabels}
          creatingTask={creatingTask}
          setCreatingTask={setCreatingTask}
          selectedLabels={selectedLabels}
          setSelectedLabels={setSelectedLabels}
        />
        <h2 className='text-2xl py-2 text-gray-800 font-semibold dark:text-gray-100'>Current Tasks</h2>
        <TaskListContainer
          tasks={tasks}
          editingIndex={editingIndex}
          deletingIndex={deletingIndex}
          editedText={editedText}
          setEditedText={setEditedText}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
          deleteTask={openModal}
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
        onConfirm={deleteTaskHandler}
        onCancel={closeModal} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default TaskList;
