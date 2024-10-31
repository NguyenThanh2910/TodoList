// src/reducers/authReducer.js
const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    case 'CHANGE_PASSWORD_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CHANGE_PASSWORD_SUCCESS':
      return { ...state, loading: false, error: null };
    case 'CHANGE_PASSWORD_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
