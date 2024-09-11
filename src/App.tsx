import React from 'react';
import RoutesConfig from './routes';
import './styles/App.css';
import { useTheme } from './contexts/ThemeContext';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header />
      <RoutesConfig />
    </div>
  );
};

export default App;
