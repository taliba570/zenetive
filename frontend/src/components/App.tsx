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
    <div className='bg-black'>
      <RoutesConfig />
    </div>
  );
};

export default App;
