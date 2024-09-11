import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface TaskInputProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  addTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ taskInput, setTaskInput, addTask }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <input 
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder='Add new task'
        className='w-full px-3 py-2 rounded bg-gray-100 border dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        onClick={addTask}
        className='p-2 bg-gradient-to-br from-[#b446cf] to-[#2bc8f8] text-white rounded-lg font-semibold shadow-2xl hover:from-[#2bc8f8] hover:to-[#b446cf] transition transform active:scale-95 flex items-center justify-center'
      >
        <FontAwesomeIcon icon={faPlus} /> <span className='px-2'>Add</span>
      </button>
    </div>
  );
};

export default TaskInput;