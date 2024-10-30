import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Xóa thông tin đăng nhập
    navigate('/'); // Chuyển về trang đăng nhập
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
              navigate('/change-password'); // Chuyển đến trang đổi mật khẩu
            }}
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
          >
            Đổi mật khẩu
          </button>
          <button
            onClick={handleLogout} // Gọi hàm đăng xuất
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
