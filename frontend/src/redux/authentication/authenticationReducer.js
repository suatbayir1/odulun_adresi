import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_SIGNUP_SUCCESS,
  SET_IS_LOGIN,
  FETCH_LOGOUT,
  FETCH_ADMIN_LOGIN_SUCCESS,
  FETCH_ADMIN_LOGIN_FAILURE,
  FETCH_ADMIN_LOGOUT,
} from "./authenticationTypes";

const initialState = {
  isLogin: false,
  token: "",
  loading: "",
  error: "",
  user: {},
  isSaved: false,
  signupMessage: "",
  loginMessage: "",
  username: "",
  isAdminLogin: false,
  adminLoginMessage: "",
  admin: "",
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loginMessage: "login_success",
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        loginMessage: action.payload,
      };
    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        isSaved: true,
        signupMessage: action.payload,
        isLogin: true,
        user: action.payload,
        loginMessage: "login_success",
      };
    case FETCH_SIGNUP_FAILURE:
      return {
        ...state,
        isSaved: false,
        signupMessage: action.payload,
      };
    case SET_IS_LOGIN:
      return {
        ...state,
        isLogin: true,
        username: action.payload,
      }
    case FETCH_LOGOUT:
      window.localStorage.removeItem("username");
      return {
        ...state,
        isLogin: false,
        username: "",
        loginMessage: "",
      }
    case FETCH_ADMIN_LOGOUT:
      window.localStorage.removeItem("admin");
      return {
        ...state,
        isAdminLogin: false,
        admin: "",
        adminLoginMessage: "",
      }
    case FETCH_ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isAdminLogin: true,
        admin: action.payload,
        adminLoginMessage: "login_success",
      }
    case FETCH_ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isAdminLogin: false,
        admin: {},
        adminLoginMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
