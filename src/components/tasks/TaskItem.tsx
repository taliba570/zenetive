import { faCheckCircle, faEdit, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Label, TaskPriority } from '../../utils/types';

interface TaskItemProps {
  task: { 
    name: string;
    duration: number;
    isCompleted: boolean;
    priority?: TaskPriority;
    labels?: Label[];
  };
  isEditing: boolean;
  isDeleting: boolean;
  taskText: string;
  setTaskText: (text: string) => void;
  toggleCompletion: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancelEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isEditing,
  isDeleting,
  taskText,
  setTaskText,
  toggleCompletion,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit
}) => {
  return (
    <li 
      className={`
        ${task.priority != null ? 'border-l-8' : ''} 
        ${task.priority === 'LOW' ? 'border-l-green-500' : 
          task.priority === 'MEDIUM' ? 'border-l-yellow-500' : 
          task.priority === 'HIGH' ? 'border-l-red-500' : ''} 
        ${isDeleting ? 'animate-pulse' : ''} 
        flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow
      `}
    >
      {isEditing ? (
        <div className="flex space-x-2 w-full">
          <input 
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className='flex-grow px-4 py-2 rounded bg-gray-100 border dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none'
          />
          <button onClick={onSave} className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckCircle} />
          </button>
          <button onClick={onCancelEdit} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition flex items-center justify-center">
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex space-x-2">
            <button onClick={toggleCompletion} className={`text-green-500 hover:text-green-700 dark:hover:text-green-400 transition flex items-center justify-center pr-3 ${task.isCompleted ? 'opacity-50' : ''}`}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          </div>
          <span className={`flex-grow ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
            {task.name}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
            {task.duration} mins
          </span>
          {task.labels?.map(label => {
            return (
              <span className={`w-fit font-bold text-gray-700 dark:text-gray-100 m-1 px-2 py-1 text-sm rounded-lg text-center`} style={{backgroundColor: label?.color}}>
                {label.name}
              </span>
            );
          })}
          <div className="flex space-x-2 ml-4">
            <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition flex items-center justify-center pr-3">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition flex items-center justify-center">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;