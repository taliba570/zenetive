import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './App';
import { ThemeProvider } from './services/providers/ThemeContext';
import store from './store';
import { SoundProvider } from './services/providers/SoundContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SoundProvider>
          <Router>
            <App />
          </Router>
        </SoundProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
