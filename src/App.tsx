import React, { useState } from 'react';
import RoutesConfig from './routes';
import { Link, useLocation } from 'react-router-dom';
import './styles/App.css';
import Switch from './components/Switch/Switch';

const App: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className={`p-4 ${darkMode ? 'navbar-dark' : 'navbar-light'} flex justify-center space-x-4`}>
        <div className='flex space-x-4'>
          <Link 
            to="/"
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-center ${
              location.pathname === '/'
                ? 'bg-gradient-to-br from-[#b446cf] to-[#d60884] text-white'
                : 'text-gray-900 dark:text-white hover:bg-gradient-to-br hover:from-[#d60884] hover:to-[#b446cf] hover:text-white'
            } `}
          >Timer</Link>
          <Link 
            to="/settings"
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-center ${
              location.pathname === '/settings'
                ? 'bg-gradient-to-br from-[#b446cf] to-[#d60884] text-white'
                : 'text-gray-900 dark:text-white hover:bg-gradient-to-br hover:from-[#d60884] hover:to-[#b446cf] hover:text-white'
            }`}
          >Settings</Link>
          <Link 
            to="/todos"
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 text-center ${
              location.pathname === '/todos'
                ? 'bg-gradient-to-br from-[#b446cf] to-[#d60884] text-white'
                : 'text-gray-900 dark:text-white hover:bg-gradient-to-br hover:from-[#d60884] hover:to-[#b446cf] hover:text-white'
            }`}
          >Todos</Link>
        </div>
        <div className='flex flex-grow justify-end'>
          <Switch isChecked={darkMode} onChange={toggleDarkMode} />
        </div>
        
      </nav>
      <RoutesConfig darkMode={darkMode} />
    </div>
  );
};

export default App;
