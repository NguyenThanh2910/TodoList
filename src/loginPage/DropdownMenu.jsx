import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'action/authActions';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  // Lấy userId từ localStorage
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); // Xóa userId khi logout
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none"
      >
        Tùy chọn
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button
            onClick={() => {
              setShowDropdown(false);
              navigate(`/change-password/${userId}`); // Chuyển đến trang đổi mật khẩu với userId
            }}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
          >
            Đổi mật khẩu
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
