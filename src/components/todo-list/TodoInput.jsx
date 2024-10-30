import React from 'react';

const TodoInput = ({ newTodo, editingJob, editingId, onChange, onSubmit }) => (
  <div className="flex items-center gap-4 mb-6">
    <input
      type="text"
      value={editingId === null ? newTodo : editingJob}
      onChange={onChange}
      placeholder={editingId === null ? 'Add a new todo' : 'Edit todo'}
      className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={onSubmit}
      className={`p-3 text-white rounded-md shadow-lg transition-all duration-200 ${editingId === null ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
    >
      {editingId === null ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
        </svg>
      )}
    </button>
  </div>
);

export default TodoInput;
