// src/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const response = await axios.get(
      `https://6715c7b733bc2bfe40bb1b32.mockapi.io/User`
    );

    // Kiểm tra nếu email và password có khớp
    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Lưu userId vào localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user.userId); // Lưu userId vào localStorage

      // Gửi thông tin người dùng đến Redux
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Email or password is incorrect!',
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: 'An error occurred during login!',
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
  localStorage.removeItem('userId'); // Xóa userId khỏi localStorage
  dispatch({ type: 'LOGOUT' }); // Thay đổi trạng thái trong Redux
};
export const register = (email, password) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });

  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUsersResponse = await fetch(
      'https://6715c7b733bc2bfe40bb1b32.mockapi.io/User'
    );

    const existingUsers = await existingUsersResponse.json();
    const emailExists = existingUsers.some((user) => user.email === email);

    if (emailExists) {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: 'Email already exists!',
      });
      return;
    }

    // Nếu email chưa tồn tại, thực hiện đăng ký
    const response = await fetch(
      'https://6715c7b733bc2bfe40bb1b32.mockapi.io/User',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errorData.message || 'Registration failed!',
      });
      return;
    }

    const data = await response.json();
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: 'An error occurred!' });
  }
};
export const changePassword =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: 'CHANGE_PASSWORD_REQUEST' });

    try {
      const response = await axios.get(
        `https://6715c7b733bc2bfe40bb1b32.mockapi.io/User`
      );

      // Kiểm tra mật khẩu cũ
      const user = response.data.find((user) => user.userId === userId);

      if (!user || user.password !== oldPassword) {
        dispatch({
          type: 'CHANGE_PASSWORD_FAILURE',
          payload: 'Old password is incorrect!',
        });
        return;
      }

      // Nếu mật khẩu cũ đúng, gọi API để đổi mật khẩu
      const updateResponse = await axios.put(
        `https://6715c7b733bc2bfe40bb1b32.mockapi.io/User/${userId}`,
        { password: newPassword }
      );

      dispatch({
        type: 'CHANGE_PASSWORD_SUCCESS',
        payload: updateResponse.data,
      });
    } catch (error) {
      dispatch({
        type: 'CHANGE_PASSWORD_FAILURE',
        payload: 'An error occurred while changing password!',
      });
    }
  };

const generateRandomPassword = (length = 8) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });

  try {
    const newPassword = generateRandomPassword();
    const response = await axios.get(
      'https://6715c7b733bc2bfe40bb1b32.mockapi.io/User'
    );
    const user = response.data.find((user) => user.email === email);

    if (user) {
      await axios.put(
        `https://6715c7b733bc2bfe40bb1b32.mockapi.io/User/${user.userId}`,
        { password: newPassword }
      );

      dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: 'New password created successfully!',
      });
      return newPassword; // Trả về mật khẩu mới
    } else {
      dispatch({
        type: 'FORGOT_PASSWORD_FAILURE',
        payload: 'Email does not exist!',
      });
    }
  } catch (error) {
    dispatch({
      type: 'FORGOT_PASSWORD_FAILURE',
      payload: 'An error occurred while sending the request!',
    });
  }
};
