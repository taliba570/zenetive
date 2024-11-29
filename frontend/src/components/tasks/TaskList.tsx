// src/components/tasks/TaskList.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import AddTaskModal from './AddTaskModal';
import Modal from './../common/Modal';
import Toast from '../common/Toast';
import TaskListContainer from './TaskListContainer';
import { Task } from './interface/Task.interface';
import { deleteTask, toggleTaskComplete } from '../../redux/slices/asyncThunks/taskThunks';

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAddEditModalOpen, setAddEditModalOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Handle deleting a task
  const deleteTaskHandler = async () => {
    if (deletingTaskId) {
      try {
        await dispatch(deleteTask(deletingTaskId)).unwrap();
        setToast({ message: 'Task deleted successfully!', type: 'success' });
      } catch (error: any) {
        console.error('Error deleting task:', error);
        setToast({ message: 'Unable to delete task!', type: 'error' });
      } finally {
        setDeletingTaskId(null);
      }
    } else {
      setToast({ message: 'Cannot find task ID to delete.', type: 'error' });
    }
  };

  // Handle editing a task
  const editTaskHandler = (task: Task) => {
    setEditTask(task);
    setAddEditModalOpen(true);
  };

  // Open add task modal
  const openAddTaskModal = () => {
    setEditTask(null);
    setAddEditModalOpen(true);
  };

  // Close add/edit modal
  const closeAddEditModal = () => {
    setEditTask(null);
    setAddEditModalOpen(false);
  };

  // Open delete confirmation modal
  const openDeleteModal = (taskId: string) => {
    setDeletingTaskId(taskId);
  };

  const handleToggleTaskComplete = async (task: Task) => {
    try {
      await dispatch(toggleTaskComplete(task)).unwrap();
      setToast({ message: 'Task completion status updated!', type: 'success' });
    } catch (error: any) {
      console.error('Error toggling task completion:', error);
      setToast({ message: 'Unable to update task status!', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto p-4 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl w-full m-auto">
        {/* Add Task Button */}
        <button
          onClick={openAddTaskModal}
          className="mb-4 p-2 bg-gradient-to-br from-[#ffb88c] to-[#ff616d] text-white rounded-lg font-semibold shadow-2xl hover:from-[#ff616d] hover:to-[#ffb88c] transition transform active:scale-95 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faPlus} /> <span className="px-2">Add Task</span>
        </button>

        {/* Add/Edit Task Modal */}
        <AddTaskModal
          isOpen={isAddEditModalOpen}
          onClose={closeAddEditModal}
          task={editTask}
        />

        <h2 className="text-2xl py-2 text-gray-800 font-semibold dark:text-gray-100">Current Tasks</h2>
        <TaskListContainer
          onEdit={editTaskHandler}
          onDelete={openDeleteModal}
          onToggleComplete={handleToggleTaskComplete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {deletingTaskId && (
        <Modal 
          isOpen={!!deletingTaskId}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          iconType="warning"
          modalType="confirmation"
          onConfirm={deleteTaskHandler}
          onCancel={() => setDeletingTaskId(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default TaskList;
