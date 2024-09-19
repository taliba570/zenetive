import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Label, TaskPriority } from '../../types';
import { fetchLabels } from '../../services/apis/Labels';

interface TaskInputProps {
  taskInput: string;
  setTaskInput: (input: string) => void;
  addTask: () => void;
  priority: TaskPriority;
  setPriority: (priority: TaskPriority) => void;
  labels: Label[];
  setLabels: (labels: Label[]) => void;
  creatingTask: boolean;
  setCreatingTask: (arg: boolean) => void;
  selectedLabels: Label | null,
  setSelectedLabels: (arg: Label) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ 
  taskInput, 
  setTaskInput, 
  addTask, 
  priority, 
  setPriority, 
  labels, 
  setLabels, 
  creatingTask, 
  setCreatingTask,
  selectedLabels, 
  setSelectedLabels
}) => {

  const handlePriorityClick = (selectedPriority: TaskPriority) => {
    if (selectedPriority === priority) {
      setPriority(null);
    } else {
      setPriority(selectedPriority);
    }
  };

  const handleLabelClick = (label: Label) => {
    setSelectedLabels(label);
    // setLabels([label]);
    // prevLabels => {
    //   const newLabels = prevLabels.includes(label._id) ? prevLabels.filter(l => l !== label._id) : [...prevLabels, label._id];
    //   setLabels(newLabels);
    //   return newLabels;
    // }
  };

  const handleCancel = () => {
    setTaskInput('');
    setPriority(null);
    setCreatingTask(false);
    setLabels([]);
  };

  return (
    <div className=''>
      <div className="flex space-x-2 mb-2">
        <input 
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onFocus={() => setCreatingTask(true)}
          placeholder='Add new task'
          className='w-full px-3 py-2 rounded bg-gray-100 border dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={addTask}
          className='p-2 bg-gradient-to-br from-[#ffb88c] to-[#ff616d] text-white rounded-lg font-semibold shadow-2xl hover:from-[#ff616d] hover:to-[#ffb88c] transition transform active:scale-95 flex items-center justify-center'
        >
          <FontAwesomeIcon icon={faPlus} /> <span className='px-2'>Add</span>
        </button>
      </div>
      {creatingTask && (
        <>
          <h3 className='text-gray-100 font-semibold text-md py-1'>Labels</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {labels.map((label) => (
              <button
                key={label.name}
                onClick={() => handleLabelClick(label)}
                className={`px-3 py-1 rounded-full text-white focus:outline-none ${
                  selectedLabels && selectedLabels?._id === label._id ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                {label.name}
              </button>
            ))}
          </div>
        </>
      )}
      {creatingTask && (
        <>
          <h3 className='text-gray-100 font-semibold text-md py-1'>Priority</h3>
          <div className="flex space-x-2 mb-2 justify-between">
            <div className='space-x-2'>
            {['LOW', 'MEDIUM', 'HIGH'].map((level) => (
            <button
              key={level}
              onClick={() => handlePriorityClick(level as TaskPriority)}
              className={`px-3 py-1 rounded-full text-white focus:outline-none ${
                priority === level && level === 'LOW' ? 'bg-green-500' : priority === level && level === 'MEDIUM' ? 'bg-yellow-500' : priority === level && level === 'HIGH' ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              {level}
            </button>
          ))}
          </div>
          <button
            onClick={handleCancel}
            className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 focus:outline-none'
          >
            Cancel
          </button>  
        </div>
        </>
    )}
    </div>
  );
};

export default TaskInput;