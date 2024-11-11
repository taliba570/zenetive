import React, { useEffect, useState } from 'react';
import { TaskListContainerProps } from './interface/Task.interface';
import TaskItem from './TaskItem';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../utils/debounce';
import { fetchTasks } from '../../redux/slices/asyncThunks.ts/taskThunks';
import { fetchLabels } from '../../redux/slices/asyncThunks.ts/labelThunks';

const TaskListContainer: React.FC<TaskListContainerProps> = ({ onEdit, onDelete, onToggleComplete  }) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [labelHasMore, setLabelHasMore] = useState(true);
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  
  useEffect(() => {
    dispatch(fetchTasks({ page, limit })).then((action) => {
      if (fetchTasks.fulfilled.match(action)) {
        const { totalPages } = action.payload;
        if (page >= totalPages) {
          setHasMore(false);
        }
      }
    });

    dispatch(fetchLabels({ page, limit })).then((action) => {
      if (fetchLabels.fulfilled.match(action)) {
        const { totalPages } = action.payload;
        if (page >= totalPages) {
          setLabelHasMore(false);
        }
      }
    });
  }, [dispatch, page, limit]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, loading, hasMore]);
  
  if (loading && tasks.length === 0) {
    return <p className="text-center text-gray-700 dark:text-gray-300">Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-700 dark:text-gray-300">No tasks available.</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem 
          onToggleComplete={() => onToggleComplete(task)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task?._id || '')}
          key={task._id}
          task={task}
        />
      ))}
    </ul>
  );
};

export default TaskListContainer;
