import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { forgotPassword } from 'action/authActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState(''); // Thêm trạng thái để lưu thông báo copy

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleForgotPassword = () => {
    if (email) {
      dispatch(forgotPassword(email))
        .then((password) => setNewPassword(password))
        .catch(() => setNewPassword(''));
    }
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(newPassword);
    setCopySuccess('Password copied to clipboard!'); // Cập nhật thông báo
    setTimeout(() => setCopySuccess(''), 2000); // Xóa thông báo sau 2 giây
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Retrieve Password
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Retrieve Password'}
        </button>

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {message && <p className="text-green-500 text-xs">{message}</p>}

        {newPassword && (
          <div className="text-center mt-4 flex items-center justify-center space-x-2">
            <p className="text-blue-700">
              Your new password is: <strong>{newPassword}</strong>
            </p>
            <ClipboardIcon
              onClick={handleCopyPassword}
              className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
              title="Copy password"
            />
          </div>
        )}

        {/* Thông báo copy */}
        {copySuccess && (
          <p className="text-green-500 text-sm text-center mt-2">
            {copySuccess}
          </p>
        )}

        {/* Nút Trở lại trang Đăng nhập */}
        <p className="text-center text-sm text-gray-600 mt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Back to Login page
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
