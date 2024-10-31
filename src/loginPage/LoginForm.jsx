import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from 'action/authActions';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Vui lòng nhập email và mật khẩu!');
      return;
    } else {
      setErrorMessage('');
    }

    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Login Account
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 w-full pl-10 pr-3 py-2 border ${
                errorMessage || error ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật Khẩu
          </label>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 w-full pl-10 pr-3 py-2 border ${
                errorMessage || error ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          You do not have an account ?
          <Link to="/register" className="text-blue-600 hover:underline ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
