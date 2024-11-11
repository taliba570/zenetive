import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Settings from '../../pages/Settings';
import NotFound from '../../pages/NotFound';
import TaskList from '../tasks/TaskList';
import PhoneAuth from '../PhoneAuth';

const RoutesConfig: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [soundNotification, setSoundNotification] = useState<boolean>(() => {
    const savedState = localStorage.getItem('soundNotification');
    return savedState ? JSON.parse(savedState) : true;
  });
  
  const handleSoundNotificationChange = () => {
    setSoundNotification(() => !soundNotification);
  }

  useEffect(() => {
    localStorage.setItem('soundNotification', JSON.stringify(soundNotification));
  }, [soundNotification]);

  return (
    <Routes>
      <Route path="/" element={<Home
        mode={mode}
        setMode={setMode}
        soundNotification={soundNotification} />} />
      <Route path="/settings" element={<Settings
        soundNotification={soundNotification}
        handleSoundNotificationChange={handleSoundNotificationChange}  />} />
      <Route path="/todos" element={<TaskList />} />
      <Route path="/signin" element={<PhoneAuth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;