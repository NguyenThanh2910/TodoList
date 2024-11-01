const initialState = {
  isLoggedIn: false,
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CHANGE_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
        changePasswordError: null,
        changePasswordSuccess: false,
      };
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        changePasswordSuccess: true,
        changePasswordError: null,
      };
    case 'CHANGE_PASSWORD_FAILURE':
      return {
        ...state,
        isLoading: false,
        changePasswordError: action.payload,
        changePasswordSuccess: false,
      };
    case 'FORGOT_PASSWORD_REQUEST':
      return { ...state, loading: true, error: null, message: null };
    case 'FORGOT_PASSWORD_SUCCESS':
      return { ...state, loading: false, message: action.payload };
    case 'FORGOT_PASSWORD_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
