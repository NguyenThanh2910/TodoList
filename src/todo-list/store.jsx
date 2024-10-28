import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TODOS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'FETCH_TODOS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_TODO_SUCCESS':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, Jobs: action.payload.newJobs }
            : todo
        ),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  todoReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
