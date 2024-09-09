import React from 'react';
import RoutesConfig from './routes';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Timer</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <RoutesConfig />
    </Router>
  );
};

export default App;
