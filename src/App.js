import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginForm from 'loginPage/LoginForm';
import TodoList from 'components/todo-list/TodoList';
import ChangePassword from 'loginPage/ChangePassword';
import Register from 'register/Register';
import ForgotPassword from 'loginPage/ForgotPassword';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    if (loggedInStatus === 'true' && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId); // Cập nhật userId vào state nếu tồn tại
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <TodoList />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/change-password/:userId"
          element={
            isLoggedIn && userId ? (
              <ChangePassword />
            ) : (
              <Navigate to="/login" /> // Điều hướng về login nếu không có userId
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
