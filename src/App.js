import React from 'react';
import './App.css';
// components
import Sidebar from './components/Sidebar';
// routes
import {routes} from './router';

function App() {
  return (
    <div className="App">
      <Sidebar />
      {routes}
    </div>
  );
}

export default App;
