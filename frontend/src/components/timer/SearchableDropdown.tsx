import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from 'react-select/async';
import { AppDispatch, RootState } from "../../redux/store";
import { debounce } from "../../utils/debounce";
import { Task } from "../tasks/interface/Task.interface";
import { SearchableDropdownProps } from "./interfaces/PomodoroRecord.interface";
import { customSelectStyles } from "./styles/styles";
import { searchTasks } from "../../redux/slices/asyncThunks.ts/taskThunks";

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ onChange, value }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchLoading, searchError } = useSelector((state: RootState) => state.tasks);

  const loadOptions = debounce((inputValue, callback) => {
    if (inputValue.length < 3) {
      callback([]);
      return;
    }

    dispatch(searchTasks(inputValue))
      .unwrap()
      .then((tasks) => {
        const options = tasks.map((task: Task) => ({
          value: task._id,
          label: task.name,
          task: task
        }));
        callback(options);
      })
      .catch((error) => {
        console.error(`Error searching tasks: ${error}`);
        callback([]);
      });
  }, 300);

  const getValue = () => {
    const { tasks } = useSelector((state: RootState) => state.tasks);
    const selectedTask = tasks.find(task => task._id === value);
    return selectedTask ? { value: selectedTask._id, label: selectedTask.name } : null;
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={false}
      loadOptions={loadOptions}
      onChange={(selectedOption: any) => onChange(selectedOption ? selectedOption.task : '')}
      value={getValue()}
      isClearable
      placeholder="Type at least 3 characters to search..."
      isLoading={searchLoading}
      noOptionsMessage={() => (searchError ? 'Error loading tasks' : 'No tasks found')}
      styles={customSelectStyles}
    />
  )
};

export default SearchableDropdown;