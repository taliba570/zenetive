import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { TaskPriority } from '../../utils/types';
import { AddTaskModalProps } from './interface/Task.interface';
import { addTask, updateTask } from '../../redux/slices/asyncThunks.ts/taskThunks';
import AddTaskModalForm from './AddTaskModalForm';

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, task = null }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState<TaskPriority | null | undefined>('LOW');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [estimatedPomodoroSessions, setEstimatedPomodoroSessions] = useState(task ? task.estimatedPomodoroSessions : 0);
  const [linkToPomodoro, setLinkToPomodoro] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<any[] | undefined>(
    task
      ? task?.labels?.map((label) => ({
          value: label.name,
          l: label,
          label: label.name,
        }))
      : []
  );

  useEffect(() => {
    if (task && task?.linkedPomodoroSessions && task?.linkedPomodoroSessions.length > 0) {
      setLinkToPomodoro(true);
    }
  }, [task]);
  
  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setPriority(task.priority);
      setDueDate(task.dueDate);
      setSelectedLabels(
        task?.labels?.map((label) => ({
          value: label.name,
          l: label,
          label: label.name,
        }))
      );
    } else {
      resetForm();
    }
  }, [task]);

  const handleSubmit = () => {
    if (!taskName.trim()) return;

    const taskData = {
      name: taskName,
      labels: selectedLabels?.map((label: any) => label.l),
      priority,
      isCompleted: task ? task.isCompleted : false,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      estimatedPomodoroSessions,
    };

    if (task) {
      // Edit mode: dispatch updateTask
      dispatch(updateTask({ ...task, ...taskData }));
    } else {
      // Add mode: dispatch addTask
      dispatch(addTask(taskData));
    }

    resetModal();
  };

  const resetForm = () => {
    setTaskName('');
    setPriority('LOW');
    setDueDate(null);
    setSelectedLabels([]);
    setModalOpen(false);
  };

  const resetModal = () => {
    resetForm();
    onClose();
  }

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-md p-6 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {task ? 'Edit Task' : 'Add New Task'}
            </h2>
            <button
              onClick={resetModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✖
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-4 space-y-4">
            <AddTaskModalForm
              taskName={taskName}
              setTaskName={setTaskName}
              priority={priority}
              setPriority={setPriority}
              dueDate={dueDate}
              setDueDate={setDueDate}
              estimatedPomodoroSessions={estimatedPomodoroSessions}
              setEstimatedPomodoroSessions={setEstimatedPomodoroSessions}
              linkToPomodoro={linkToPomodoro}
              setLinkToPomodoro={setLinkToPomodoro}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              task={task}
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gradient-to-br from-[#ffb88c] to-[#ff616d] text-white rounded-lg font-semibold shadow-2xl hover:from-[#ff616d] hover:to-[#ffb88c] transition transform active:scale-95"
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
            <button
              onClick={resetModal}
              className="ml-2 px-4 py-2 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
