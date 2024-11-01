import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiLockClosed, HiLogout, HiOutlineCog } from 'react-icons/hi';
import { logout } from 'action/authActions';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  // Lấy userId từ localStorage
  const userId = localStorage.getItem('userId');

  const handleLogout = async () => {
    try {
      // Gọi action logout và xóa thông tin người dùng
      await dispatch(logout());
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId'); // Xóa userId khi logout
      navigate('/login'); // Điều hướng đến trang đăng nhập
    } catch (error) {
      console.error('Logout failed:', error); // Xử lý lỗi nếu cần
      navigate('/login'); // Điều hướng đến trang đăng nhập ngay cả khi có lỗi
    }
  };

  const handleChangePassword = () => {
    if (userId) {
      // Điều hướng tới trang đổi mật khẩu với userId
      navigate(`/change-password/${userId}`);
    } else {
      console.error('User ID not found'); // Thông báo lỗi nếu userId không tồn tại
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className="p-2 bg-gray-800 text-white rounded-full focus:outline-none hover:bg-gray-700 transition duration-200"
      >
        <HiOutlineCog className="h-6 w-6" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <button
            onClick={() => {
              setShowDropdown(false); // Đóng dropdown trước khi thực hiện hành động
              handleChangePassword();
            }}
            className="flex items-center     w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            <HiLockClosed className="mr-2 h-5 w-5 text-gray-500" />
            Change password
          </button>
          <button
            onClick={() => {
              setShowDropdown(false); // Đóng dropdown trước khi logout
              handleLogout(); // Chỉ gọi logout khi người dùng nhấn vào nút "Đăng xuất"
            }}
            className="flex items-center  w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 transition-colors duration-200"
          >
            <HiLogout className="mr-2 h-5 w-5 text-gray-500" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
