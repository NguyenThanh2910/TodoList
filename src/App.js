import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginForm from './loginPage/LoginForm';
import TodoList from './components/todo-list/TodoList';
import ChangePassword from './loginPage/ChangePassword';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/todolist"
          element={
            isLoggedIn ? (
              <TodoList />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/change-password"
          element={
            isLoggedIn ? (
              <ChangePassword />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
