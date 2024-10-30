import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addTodo,
  fetchTodos,
  removeTodo,
  toggleTodo,
  updateTodo,
} from '../../action/action';
import TodoInput from './TodoInput';
import TodoListDisplay from '../Item/TodoListDisplay';
import DeleteModal from '../deleteModal/DeleteModal';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, loading, error } = useSelector((state) => state.todoReducer);
  const [editingId, setEditingId] = useState(null);
  const [editingJob, setEditingJob] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoToRemove, setTodoToRemove] = useState(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ Jobs: newTodo, completed: false }));
      setNewTodo('');
      toast.success('Todo added successfully!');
    } else {
      toast.error('Please enter a todo!');
    }
  };

  const handleUpdateTodo = () => {
    if (editingJob.trim()) {
      dispatch(updateTodo(editingId, editingJob));
      setEditingId(null);
      setEditingJob('');
      toast.warning('Todo updated successfully!');
    } else {
      toast.error('Please enter a todo!');
    }
  };

  const handleRemoveTodo = () => {
    if (todoToRemove) {
      dispatch(removeTodo(todoToRemove.id));
      closeModal();
      toast.error('Todo removed successfully!');
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

  const handleToggle = (id, completed) => {
    setLoadingId(id); // Bắt đầu loading
    dispatch(toggleTodo(id, completed)).then(() => {
      setLoadingId(null); // Kết thúc loading
    });
  };

  const handleEditClick = (todo) => {
    setEditingId(todo.id);
    setEditingJob(todo.Jobs);
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center">
      <div className="w-full min-h-screen  max-w-4xl bg-white shadow-xl rounded-lg p-8 space-y-8">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <TodoInput
          newTodo={newTodo}
          editingJob={editingJob}
          editingId={editingId}
          onChange={(e) =>
            editingId === null
              ? setNewTodo(e.target.value)
              : setEditingJob(e.target.value)
          }
          onSubmit={editingId === null ? handleAddTodo : handleUpdateTodo}
        />
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <TodoListDisplay
          todos={todos}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          jobsPerPage={jobsPerPage}
          openModal={openModal}
          handleEditClick={handleEditClick}
          editingId={editingId} // Truyền editingId vào đây
          handleToggle={handleToggle}
          loadingId={loadingId}
        />
        <DeleteModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onDelete={handleRemoveTodo}
        />
      </div>
    </div>
  );
};

export default TodoList;