import axios from 'axios';

const API_URL = 'https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs';

//get data
export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TODOS_REQUEST' });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: error.message });
  }
};
//add data
export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, newTodo);
    dispatch({ type: 'ADD_TODO_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};
//remove data
export const removeTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(fetchTodos()); // Gọi lại fetchTodos để cập nhật danh sách todos
  } catch (error) {
    console.error('Error removing todo:', error);
  }
};
//update data
export const updateTodo = (id, newJobs) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/${id}`, { Jobs: newJobs });
    dispatch(fetchTodos()); // Gọi lại fetchTodos để cập nhật danh sách todos
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};
//convert completed
export const toggleTodo = (id, completed) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      completed: !completed,
    });
    dispatch({
      type: 'TOGGLE_TODO',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error toggling todo:', error);
  }
};
export const setEditingTodo = (id) => (dispatch) => {
  dispatch({ type: 'SET_EDITING_TODO', payload: id });
};
