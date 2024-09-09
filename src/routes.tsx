import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound';
import TaskList from './components/TaskList';

interface RoutesConfigProps {
  darkMode: boolean;
};

const RoutesConfig: React.FC<RoutesConfigProps> = ({ darkMode }) => {
  const [workTime, setWorkTime] = useState<number>(
    Number(process.env.REACT_APP_WORK_TIME) | 1500
  );
  const [shortBreakTime, setShortBreakTime] = useState<number>(
    Number(process.env.REACT_APP_SHORT_BREAK) | 300
  );
  const [longBreakTime, setLongBreakTime] = useState<number>(
    Number(process.env.REACT_APP_LONG_BREAK) | 900
  );
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');

  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      const { workTime, shortBreakTime, longBreakTime } = JSON.parse(savedSettings);
      setWorkTime(workTime);
      setShortBreakTime(shortBreakTime);
      setLongBreakTime(longBreakTime);
    }
  }, []);

  const updateLocalStorage = () => {
    localStorage.setItem(
      'pomodoroSettings',
      JSON.stringify({ workTime, shortBreakTime, longBreakTime })
    );
  }

  const handleWorkTimeChange = (time: number) => {
    setWorkTime(time);
  };

  const handleShortBreakTimeChange = (time: number) => {
    setShortBreakTime(time);
  };

  const handleLongBreakTimeChange = async (time: number) => {
    setLongBreakTime(time);
  };

  useEffect(() => {
    updateLocalStorage();
  }, [workTime, shortBreakTime, longBreakTime]);

  return (
    <Routes>
      <Route path="/" element={<Home 
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        mode={mode}
        setMode={setMode}
        darkMode={darkMode} />} />
      <Route path="/settings" element={<Settings 
        workTime={workTime}
        shortBreakTime={shortBreakTime}
        longBreakTime={longBreakTime}
        onWorkTimeChange={handleWorkTimeChange}
        onShortBreakTimeChange={handleShortBreakTimeChange}
        onLongBreakTimeChange={handleLongBreakTimeChange}
        darkMode={darkMode}  />} />
      <Route path="/todos" element={<TaskList
        darkMode={darkMode}  />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;