import { useEffect } from 'react';
import './App.css';
import { getJwt } from './api/requests.js';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) {
      getJwt();
    }
  }, []);
  return (
    <div className="App">
      {localStorage.getItem('token')}
    </div>
  );
}

export default App;
