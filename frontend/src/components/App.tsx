import React from 'react';
import RoutesConfig from './routes';
import './../styles/App.css';
import { useTheme } from '../services/providers/ThemeContext';

const App: React.FC = () => {
  const { darkMode } = useTheme();

  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <div className={darkMode ? `bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#24243e]` : 'bg-white'}>
      <RoutesConfig />
    </div>
  );
};

export default App;
