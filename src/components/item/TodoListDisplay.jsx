import React, { useState } from 'react';
import TodoItem from 'components/item/TodoItem';
import Pagination from 'components/pagination/Pagination';

const TodoListDisplay = ({
  todos,
  currentPage,
  setCurrentPage,
  jobsPerPage,
  openModal,
  handleEditClick,
  handleToggle,
  loadingId,
  editingId,
}) => {
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = incompleteTodos.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(incompleteTodos.length / jobsPerPage);
  const [currentCompletedPage, setCurrentCompletedPage] = useState(1);
  const completedJobsPerPage = 10;

  const indexOfLastCompletedJob = currentCompletedPage * completedJobsPerPage;
  const indexOfFirstCompletedJob =
    indexOfLastCompletedJob - completedJobsPerPage;
  const currentCompletedJobs = completedTodos.slice(
    indexOfFirstCompletedJob,
    indexOfLastCompletedJob
  );
  const totalCompletedPages = Math.ceil(
    completedTodos.length / completedJobsPerPage
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Unfinished Todos
        </h2>
        <ul className="space-y-3">
          {currentJobs.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={() => openModal(todo)}
              onEdit={handleEditClick}
              onToggle={handleToggle}
              editingId={editingId} // Truyền editingId vào đây
              loadingId={loadingId}
            />
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Completed Todos
        </h2>
        <ul className="space-y-3">
          {currentCompletedJobs.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onRemove={() => openModal(todo)}
              onToggle={handleToggle}
              loadingId={loadingId}
            />
          ))}
        </ul>
        <Pagination
          currentPage={currentCompletedPage}
          setCurrentPage={setCurrentCompletedPage}
          totalPages={totalCompletedPages}
        />
      </div>
    </div>
  );
};

export default TodoListDisplay;
