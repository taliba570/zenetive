import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Modal from '../common/Modal';
import { setCurrentTask } from '../../redux/slices/taskSlice';
import { resetTimer } from '../../redux/slices/timerSlice';
import { useSound } from '../../services/providers/SoundContext';
import { SelectedTaskDisplayStyles } from './styles/styles';

const SelectedTaskDisplay: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTask } = useSelector((state: RootState) => state.tasks);
  const [detachTaskModal, setDetachTaskModal] = useState<boolean>(false);
  const { stopAllSounds } = useSound();

  const removeTask = () => {
    dispatch(setCurrentTask(null));
    dispatch(resetTimer());
    stopAllSounds();
    closeDetachTaskModal();
  }

  const closeDetachTaskModal = () => {
    setDetachTaskModal(false);
  }

  return (
    <div style={SelectedTaskDisplayStyles.container}>
      <div className='flex justify-between'>
        <h3 style={SelectedTaskDisplayStyles.title}>Current Task</h3>
        <button
          onClick={()=>setDetachTaskModal(true)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ✖
        </button>
      </div>

      
      {detachTaskModal && (
        <Modal 
          isOpen={detachTaskModal}
          title={`Remove Task`}
          message={`Are you sure you want to remove attached task?`}
          iconType='warning'
          modalType='confirmation'
          onConfirm={removeTask}
          onCancel={closeDetachTaskModal}
        />
      )}
      
      <p style={SelectedTaskDisplayStyles.taskName}>{currentTask?.name}</p>
    </div>
  );
};

export default SelectedTaskDisplay;
