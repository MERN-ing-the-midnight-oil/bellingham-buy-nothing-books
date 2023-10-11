// src/App.tsx
import React from 'react';
import './App.css';
import LendForm from './components/LendForm';
import RegisterForm from './components/RegisterForm'; 
import LoginForm from './components/LoginForm'; 
import Dashboard from './components/Dashboard';
import MyLendingLibrary from './components/MyLendingLibrary'; 
import { Typography } from '@mui/material';
import { useAuth } from './context/AuthContext'; // Adjust the path as needed

function App() {
  const { token } = useAuth(); // Now it should work without error

  return (
    <div className="App">
      <header className="App-header">
        <h1>Other's Covers: A Neighborhood Book Sharing App</h1>
        <h2>Because good pensives make good neighbors.</h2>
      </header>
      
      <img src={process.env.PUBLIC_URL + '/libraries.png'} alt="Library" style={{ width: '90%', margin: '1rem 0' }} />

      <main>
          {/* Conditional rendering based on auth status */}
          { !token ? (
            <>
              <RegisterForm />
              <hr style={{ margin: '2rem 0' }} /> {/* Add a divider or style as needed */}
              <LoginForm />
            </>
          ) : (
            <>
              <Dashboard />
              <hr style={{ margin: '2rem 0' }} />
              <h1>My Lending Library:</h1>
              <MyLendingLibrary />        
              <LendForm />
        <hr style={{ margin: '2rem 0' }} /> 
            </>
          )}
      
        {/* The components below might or might not need access to the auth context. Adjust as necessary. */}

      </main>
    </div>
  );
}

export default App;
