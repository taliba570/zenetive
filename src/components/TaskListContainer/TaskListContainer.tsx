import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

interface TaskListContainerProps {
  tasks: { text: string; isCompleted: boolean }[];
  editingIndex: number | null;
  deletingIndex: number | null;
  editedText: string;
  setEditedText: (text: string) => void;
  toggleTaskCompletion: (index: number) => void;
  editTask: (index: number) => void;
  deleteTask: (index: number) => void;
  saveTask: (index: number) => void;
  cancelEdit: () => void;
}

const TaskListContainer: React.FC<TaskListContainerProps> = ({
  tasks,
  editingIndex,
  deletingIndex,
  editedText,
  setEditedText,
  toggleTaskCompletion,
  editTask,
  deleteTask,
  saveTask,
  cancelEdit,
}) => {
  return (
    <ul className="space-y-2">
      {tasks.filter((task) => !task.isCompleted).length < 1 
        ? (
          <li className='text-gray-900 dark:text-white text-center py-3 px-2 text-2xl'>
            🎉🎉 Huurrry! You have no pending task 🥳🥳!
          </li>
        ) : tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              isEditing={editingIndex === index}
              isDeleting={deletingIndex === index}
              taskText={editingIndex === index ? editedText : task.text}
              setTaskText={setEditedText}
              toggleCompletion={() => toggleTaskCompletion(index)}
              onEdit={() => editTask(index)}
              onDelete={() => deleteTask(index)}
              onSave={() => saveTask(index)}
              onCancelEdit={cancelEdit}
            />
      ))}
    </ul>
  );
};

export default TaskListContainer;