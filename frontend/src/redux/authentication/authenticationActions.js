import axios from "axios";
import { API_URL } from "../../config";
import { history } from "../../history"
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  SET_IS_LOGIN,
  FETCH_LOGOUT,
  FETCH_ADMIN_LOGIN_SUCCESS,
  FETCH_ADMIN_LOGIN_FAILURE,
  FETCH_ADMIN_LOGOUT,
} from "./authenticationTypes";

/* LOGIN */
export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

const fetchLoginSuccess = (payload) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: payload,
  };
};

const fetchLoginFailure = (error) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error,
  };
};

export const fetchLogin = (payload) => {
  return (dispatch) => {
    dispatch(fetchLoginRequest);
    let url = `${API_URL}authentication/login`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "user_matched") {
          dispatch(fetchLoginSuccess(response.data.data));
          window.localStorage.setItem('username', `${payload["username"]}`)
          history.push("/");
        } else {
          dispatch(fetchLoginFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchLoginFailure(errorMsg));
      });
  };
};

/* SIGNUP */
export const fetchSignupRequest = () => {
  return {
    type: FETCH_SIGNUP_REQUEST,
  };
};

const fetchSignupSuccess = (payload) => {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    payload: payload,
  };
};

const fetchSignupFailure = (error) => {
  return {
    type: FETCH_SIGNUP_FAILURE,
    payload: error,
  };
};

export const fetchSignup = (payload) => {
  return (dispatch) => {
    dispatch(fetchSignupRequest());
    let url = `${API_URL}authentication/signup`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "user_saved_successfully") {
          dispatch(fetchSignupSuccess(response.data.message.text[0]));
          window.localStorage.setItem('username', `${payload["username"]}`)
          history.push("/");
        } else {
          dispatch(fetchSignupFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchSignupFailure(errorMsg));
      });
  };
};


export const setIsLogin = (payload) => {
  return {
    type: SET_IS_LOGIN,
    payload: payload,
  }
}

export const fetchLogout = () => {
  return {
    type: FETCH_LOGOUT,
  }
}

export const fetchAdminLogout = () => {
  return {
    type: FETCH_ADMIN_LOGOUT,
  }
}


const fetchAdminLoginSuccess = (payload) => {
  return {
    type: FETCH_ADMIN_LOGIN_SUCCESS,
    payload: payload
  }
}

const fetchAdminLoginFailure = (error) => {
  return {
    type: FETCH_ADMIN_LOGIN_FAILURE,
    payload: error
  }
}

export const fetchAdminLogin = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}authentication/adminLogin`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response);

        if (response.data.message.text[0] === "user_matched") {
          dispatch(fetchAdminLoginSuccess(response.data.data));
          window.localStorage.setItem('admin', `${payload["username"]}`)
          history.push("/admin");
        } else {
          dispatch(fetchAdminLoginFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        dispatch(fetchAdminLoginFailure(error.message));
      });
  };
};