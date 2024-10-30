import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => (
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Confirm Delete"
    className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-md"
    overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <h2 className="text-lg font-semibold mb-3">Confirm Deletion</h2>
    <p className="text-gray-600 mb-6">
      Are you sure you want to delete this todo?
    </p>
    <div className="flex justify-end gap-4">
      <button
        onClick={onRequestClose}
        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
      >
        Cancel
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  </Modal>
);

export default DeleteModal;
