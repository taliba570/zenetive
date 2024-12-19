
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faCheckToSlot, 
  faEdit, 
  faTrash 
} from '@fortawesome/free-solid-svg-icons';
import { TaskItemProps } from './interface/Task.interface';

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const dueDate = new Date(task.dueDate || '');  // Fallback to current date if `task.dueDate` is falsy
  const currentDay = new Date().getDay();
  const currentYear = new Date().getFullYear();

  // Build options for the date formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: dueDate.getDay() === currentDay ? undefined : 'short',  // Use the correct literal type for `weekday`
    year: dueDate.getFullYear() !== currentYear ? 'numeric' : undefined, // Show year if not the current year
    month: 'short',  // Show month unless it's the current month
    day: 'numeric',
  };

  // Generate human-readable date
  const humanReadableDate = dueDate.toLocaleDateString('en-US', options);

  return (
    <li key={task._id} className={`hover:scale-[1.1] duration-300 ease-in-out
        ${task.priority != null ? 'border-l-8' : ''} 
        ${task.priority === 'LOW' ? 'border-l-green-500' : 
          task.priority === 'MEDIUM' ? 'border-l-yellow-500' : 
          task.priority === 'HIGH' ? 'border-l-red-500' : ''} 
      flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow`
    }>
      <div>
        <h3 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
          {task.name}
        </h3>
        <p className="flex flex-row xs:flex-col text-sm text-gray-600 dark:text-gray-300">
          <p>Priority: {task.priority}</p>
          <span className='xxs:hidden'>|</span>
          <p>Due: {task.dueDate ? humanReadableDate : 'No due date'}</p>
        </p>
        <div className="flex space-x-2 mt-2">
          {task?.labels?.map((label) => (
            <span key={label._id} className="px-2 py-1 text-xs bg-blue-200 text-blue-800 rounded">
              {label.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleComplete(task)}
          className={`p-2 rounded ${task.isCompleted ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'} transition`}
          aria-label={task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <FontAwesomeIcon icon={task.isCompleted ? faCheckCircle : faCheckToSlot} />
        </button>
        <button
          onClick={() => onEdit(task)}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={() => onDelete(task?._id || '')}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;