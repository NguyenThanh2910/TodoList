import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { changePassword } from 'action/authActions';

const ChangePassword = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy trạng thái từ authReducer
  const { isLoading, changePasswordError, changePasswordSuccess } = useSelector(
    (state) => state.auth
  );

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Điều hướng về trang chính khi đổi mật khẩu thành công
  useEffect(() => {
    if (changePasswordSuccess) {
      navigate('/login'); // Điều hướng về trang chính ngay khi đổi mật khẩu thành công
      window.location.reload();
    }
  }, [changePasswordSuccess, navigate]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (!oldPassword) {
      setErrorMessage('Please enter old password!');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please enter new password!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Confirmation password does not match!');
      return;
    }

    // Gọi action đổi mật khẩu
    dispatch(changePassword(userId, oldPassword, newPassword)).catch(
      (error) => {
        setErrorMessage('Password change failed:' + error);
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleChangePassword}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Change Password
        </h2>

        {/* Input cho mật khẩu cũ */}
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu cũ"
          />
        </div>

        {/* Input cho mật khẩu mới */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Input cho xác nhận mật khẩu mới */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
        {changePasswordSuccess && (
          <p className="text-green-500 text-xs">
            Password changed successfully!
          </p>
        )}
        {changePasswordError && (
          <p className="text-red-500 text-xs">{changePasswordError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold rounded-md transition duration-200`}
        >
          {isLoading ? 'Loading...' : 'Change Password'}
        </button>
        <div className=" text-sm text-gray-600 mt-4">
          <Link
            to="/"
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            <HiArrowLeft className="h-5 w-5 mr-1" />
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
