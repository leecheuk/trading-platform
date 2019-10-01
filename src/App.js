import React from 'react';
// styles
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

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
