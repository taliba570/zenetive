import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Select from 'react-select';
import { TaskPriority } from '../../utils/types';
import { AddTaskModalProps } from './interface/Task.interface';
import { AddTaskSelectStyle } from './styles/styles';
import { addTask, updateTask } from '../../redux/slices/asyncThunks.ts/taskThunks';

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, task = null }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const { labels, loading, error } = useSelector((state: RootState) => state.labels);
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
      setTaskName('');
      setPriority('LOW');
      setDueDate(null);
      setSelectedLabels([]);
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

  useEffect(() => {
    if (!loading && !error && labels) {
      setSelectedLabels([]);
    }
  }, [loading, error, labels]);

  const options = labels
    .filter((label) => label?.name) // Ensure that the label has a valid name
    .map((label) => ({
      value: label.name as string,
      _id: label._id as string,
      l: label,
      label: label.name as string,
    }));

  const handleLabelChange = (selectedOptions: any) => {
    setSelectedLabels(selectedOptions);
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
            <textarea
              rows={3}
              style={{ resize: 'none' }}
              placeholder="Task Title"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-[#ff616d]"
            ></textarea>

            <Select
              isMulti
              options={options}
              value={selectedLabels}
              onChange={handleLabelChange}
              classNamePrefix="react-select"
              className="w-full text-gray-900 dark:text-gray-100"
              placeholder="Search and select labels"
              styles={AddTaskSelectStyle}
            />

            <select
              value={priority !== null ? priority : ''}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-[#ff616d]"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <input
              type="date"
              value={dueDate ? moment(dueDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-[#ff616d]"
            />

            <div>
              <label className='text-gray-600 dark:text-gray-300'>Estimated Pomodoro Sessions: <span className='text-red-500'>{!linkToPomodoro ? 'Disabled' : ''}</span></label>
              <input
                type="number"
                min="0"
                value={estimatedPomodoroSessions}
                onChange={(e) => setEstimatedPomodoroSessions(Number(e.target.value))}
                disabled={!linkToPomodoro}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring focus:ring-[#ff616d]"
              />
            </div>
      
            <div>
              <label
                  className='text-gray-600 dark:text-gray-300'>
                <input
                  type="checkbox"
                  checked={linkToPomodoro}
                  onChange={(e) => setLinkToPomodoro(e.target.checked)}
                />
                <span className='pl-2'>Link to Pomodoro Timer</span>
              </label>
            </div>
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
