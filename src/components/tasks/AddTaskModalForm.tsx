import React, { useEffect } from 'react';
import moment from 'moment';
import Select from 'react-select';
import { AddTaskSelectStyle } from './styles/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TaskPriority } from '../../utils/types';
import { AddTaskModalFormProps } from './interface/Task.interface';

const AddTaskModalForm: React.FC<AddTaskModalFormProps> = ({ taskName, setTaskName, priority, setPriority, dueDate, setDueDate, estimatedPomodoroSessions, setEstimatedPomodoroSessions, linkToPomodoro, setLinkToPomodoro, selectedLabels, setSelectedLabels }) => {
  const { labels, loading, error } = useSelector((state: RootState) => state.labels);

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

  useEffect(() => {
    if (!loading && !error && labels) {
      setSelectedLabels([]);
    }
  }, [loading, error, labels]);

  return (<>
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
  </>);
};

export default AddTaskModalForm;