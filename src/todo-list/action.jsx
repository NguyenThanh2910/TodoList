import axios from 'axios';

const API_URL = 'https://6715c7b733bc2bfe40bb1b32.mockapi.io/Jobs';

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TODOS_REQUEST' });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: error.message });
  }
};

export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, newTodo);
    dispatch({ type: 'ADD_TODO_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};
export const removeTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: 'REMOVE_TODO_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error removing todo:', error);
  }
};
export const updateTodo = (id, newJobs) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { Jobs: newJobs });
    dispatch({
      type: 'UPDATE_TODO',
      payload: { id, newJobs: response.data.Jobs },
    });
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

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
