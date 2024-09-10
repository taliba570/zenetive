import { faCheckCircle, faEdit, faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface TaskItemProps {
  task: { text: string; isCompleted: boolean };
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
    <li className={`${isDeleting ? 'animate-pulse' : ''} flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow`}>
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
          <span className={`flex-grow ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`} onClick={toggleCompletion}>
            {task.text}
          </span>
          <div className="flex space-x-2">
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