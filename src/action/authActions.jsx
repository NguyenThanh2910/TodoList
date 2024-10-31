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
      localStorage.setItem('isLoggedIn', 'true');
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Email hoặc mật khẩu không đúng!',
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: 'Có lỗi xảy ra trong quá trình đăng nhập!',
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi localStorage
  dispatch({ type: 'LOGOUT' }); // Thay đổi trạng thái trong Redux
};
export const changePassword =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: 'CHANGE_PASSWORD_REQUEST' });

    try {
      // Gọi API để thay đổi mật khẩu và lưu lại mật khẩu mới
      const response = await axios.put(
        `https://6715c7b733bc2bfe40bb1b32.mockapi.io/User/${userId}`,
        { password: newPassword }
      );

      if (response.status === 200) {
        dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' });
        alert('Đổi mật khẩu thành công!');
      }
    } catch (error) {
      dispatch({
        type: 'CHANGE_PASSWORD_FAILURE',
        payload: error.message || 'Đã xảy ra lỗi khi đổi mật khẩu.',
      });
    }
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
        payload: 'Email đã tồn tại!',
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
        payload: errorData.message || 'Đăng ký thất bại!',
      });
      return;
    }

    const data = await response.json();
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: 'Có lỗi xảy ra!' });
  }
};
