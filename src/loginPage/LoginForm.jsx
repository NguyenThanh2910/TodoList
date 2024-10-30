import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // State cho loading
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const mockEmail = 'user@example.com';
    const mockPassword = 'password123';

    let hasError = false;

    // Reset lỗi
    setEmailError('');
    setPasswordError('');

    // Kiểm tra email
    if (email === '') {
      setEmailError('Email không được để trống!');
      hasError = true;
    } else if (email !== mockEmail) {
      setEmailError('Email không đúng!');
      hasError = true;
    }

    // Kiểm tra mật khẩu
    if (password === '') {
      setPasswordError('Mật khẩu không được để trống!');
      hasError = true;
    } else if (password !== mockPassword) {
      setPasswordError('Mật khẩu không đúng!');
      hasError = true;
    }

    // Nếu không có lỗi, thực hiện đăng nhập
    if (!hasError) {
      setLoading(true); // Bắt đầu loading
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);

      // Mô phỏng một khoảng thời gian xử lý (ví dụ: 1 giây)
      setTimeout(() => {
        alert('Đăng nhập thành công!');
        setLoading(false); // Kết thúc loading
        navigate('/todolist');
      }, 1000); // Thời gian giả lập 1 giây
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Đăng nhập
        </h2>

        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <HiOutlineMail className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full px-3 py-2 border-none focus:outline-none ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="you@example.com"
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="mt-1 flex items-center border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <HiLockClosed className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full px-3 py-2 border-none focus:outline-none ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="••••••••"
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading} // Vô hiệu hóa nút khi loading
        >
          {loading ? (
            <span className="flex justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4zm16 0a8 8 0 01-8 8v-2a6 6 0 006-6h2z"
                ></path>
              </svg>
              Đang đăng nhập...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
