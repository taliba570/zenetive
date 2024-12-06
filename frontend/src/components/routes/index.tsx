import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Settings from '../../pages/Settings';
import GithubCallback from '../GithubCallback';
import GoogleCallback from '../GoogleCallback';
import HomePage from '../homepage/Homepage';
import PhoneAuth from '../PhoneAuth';
import Signup from '../Signup';
import TaskList from '../tasks/TaskList';

const RoutesConfig: React.FC = () => {
  const location = useLocation();
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [soundNotification, setSoundNotification] = useState<boolean>(() => {
    const savedState = localStorage.getItem('soundNotification');
    return savedState ? JSON.parse(savedState) : true;
  });
  const hideHeaderRoutes = ['/signin', '/signup', '/auth/github/callback'];
  
  const handleSoundNotificationChange = () => {
    setSoundNotification(() => !soundNotification);
  }

  useEffect(() => {
    localStorage.setItem('soundNotification', JSON.stringify(soundNotification));
  }, [soundNotification]);

  return (
    <div>
      {/* {!hideHeaderRoutes.includes(location.pathname) && <Header />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Home
          mode={mode}
          setMode={setMode}
          soundNotification={soundNotification} />} />
        <Route path="/settings" element={<Settings
          soundNotification={soundNotification}
          handleSoundNotificationChange={handleSoundNotificationChange}  />} />
        <Route path="/todos" element={<TaskList />} />
        <Route path="/signin" element={<PhoneAuth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default RoutesConfig;