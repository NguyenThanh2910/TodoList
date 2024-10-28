import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  fetchTodos,
  removeTodo,
  toggleTodo,
  updateTodo,
} from './action';
import TodoItem from './TodoItem';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, loading, error } = useSelector((state) => state.todoReducer);
  const [editingId, setEditingId] = useState(null);
  const [editingJob, setEditingJob] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState(null);
  const dispatch = useDispatch();

  const [currentPageUnfinished, setCurrentPageUnfinished] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ Jobs: newTodo, completed: false }));
      setNewTodo('');
      toast.success('Todo added successfully!');
    }
  };

  const openModal = (todo) => {
    setTodoToRemove(todo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTodoToRemove(null);
  };

  const handleRemoveTodo = () => {
    if (todoToRemove) {
      dispatch(removeTodo(todoToRemove.id));
      closeModal();
      toast.error('Todo removed successfully!');
    }
  };

  const handleUpdateTodo = () => {
    if (editingJob.trim()) {
      dispatch(updateTodo(editingId, editingJob));
      setEditingId(null);
      setEditingJob('');
      toast.warning('Todo updated successfully!');
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditingJob(todo.Jobs);
  };

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleToggle = (id, completed) => {
    dispatch(toggleTodo(id, completed));
  };

  const indexOfLastJobUnfinished = currentPageUnfinished * jobsPerPage;
  const indexOfFirstJobUnfinished = indexOfLastJobUnfinished - jobsPerPage;
  const currentUnfinishedJobs = incompleteTodos.slice(
    indexOfFirstJobUnfinished,
    indexOfLastJobUnfinished
  );
  const totalPagesUnfinished = Math.ceil(incompleteTodos.length / jobsPerPage);

  const indexOfLastJobCompleted = currentPageCompleted * jobsPerPage;
  const indexOfFirstJobCompleted = indexOfLastJobCompleted - jobsPerPage;
  const currentCompletedJobs = completedTodos.slice(
    indexOfFirstJobCompleted,
    indexOfLastJobCompleted
  );
  const totalPagesCompleted = Math.ceil(completedTodos.length / jobsPerPage);

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <div className="w-full min-h-screen  max-w-4xl bg-white shadow-xl rounded-lg p-8 space-y-8">
        <ToastContainer />
        <h1 className="text-3xl font-semibold text-center text-blue-600">
          Todo List
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={editingId === null ? newTodo : editingJob}
            onChange={(e) =>
              editingId === null
                ? setNewTodo(e.target.value)
                : setEditingJob(e.target.value)
            }
            placeholder={editingId === null ? 'Add a new todo' : 'Edit todo'}
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={editingId === null ? handleAddTodo : handleUpdateTodo}
            className={`p-3 text-white rounded-md shadow-lg transition-all duration-200 ${
              editingId === null
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {editingId === null ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="size-6"
              >
                <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="size-6"
              >
                <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            )}
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Unfinished Todos
            </h2>
            <ul className="space-y-3">
              {currentUnfinishedJobs.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onRemove={() => openModal(todo)}
                  onEdit={() => handleEditClick(todo)}
                  onToggle={handleToggle}
                />
              ))}
            </ul>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() =>
                  setCurrentPageUnfinished((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPageUnfinished === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                </svg>
              </button>
              <span className="px-2 py-3">{`${currentPageUnfinished} / ${totalPagesUnfinished}`}</span>
              <button
                onClick={() =>
                  setCurrentPageUnfinished((prev) =>
                    Math.min(prev + 1, totalPagesUnfinished)
                  )
                }
                disabled={currentPageUnfinished === totalPagesUnfinished}
                className="px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="h-120">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Completed Todos
            </h2>
            <ul className="space-y-3">
              {currentCompletedJobs.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onRemove={() => openModal(todo)}
                  onEdit={() => handleEditClick(todo)}
                  onToggle={handleToggle}
                />
              ))}
            </ul>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() =>
                  setCurrentPageCompleted((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPageCompleted === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                </svg>
              </button>
              <span className="px-2 py-3">{`${currentPageCompleted} / ${totalPagesCompleted}`}</span>
              <button
                onClick={() =>
                  setCurrentPageCompleted((prev) =>
                    Math.min(prev + 1, totalPagesCompleted)
                  )
                }
                disabled={currentPageCompleted === totalPagesCompleted}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
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
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleRemoveTodo}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TodoList;
