import axios from "axios";
import { API_URL } from "../../config";
import {
  FETCH_GET_USER_INFO_SUCCESS,
  FETCH_GET_USER_INFO_FAILURE,
  FETCH_UPDATE_USER_SUCCESS,
  FETCH_UPDATE_USER_FAILURE,
  FETCH_CHANGE_PASSWORD_SUCCESS,
  FETCH_CHANGE_PASSWORD_FAILURE,
} from "./userTypes";

const fetchGetUserInfoSuccess = (payload) => {
  return {
    type: FETCH_GET_USER_INFO_SUCCESS,
    payload: payload,
  };
};

const fetchGetUserInfoFailure = (error) => {
  return {
    type: FETCH_GET_USER_INFO_FAILURE,
    payload: error,
  };
};

export const fetchGetUserInfo = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}user/getUserInfo`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response);

        if (response.data.message.text[0] === "get_user_successfully") {
          dispatch(fetchGetUserInfoSuccess(response.data.data));
        } else {
          dispatch(fetchGetUserInfoFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetUserInfoFailure(errorMsg));
      });
  }
}

const fetchUpdateUserSuccess = (payload) => {
  return {
    type: FETCH_UPDATE_USER_SUCCESS,
    payload: payload,
  }
}

const fetchUpdateUserFailure = (error) => {
  return {
    type: FETCH_UPDATE_USER_FAILURE,
    payload: error,
  }
}

export const fetchUpdateUser = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}user/updateUser`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "update_user_successfully") {
          dispatch(fetchUpdateUserSuccess(response.data.message.text[0]));
        } else {
          dispatch(fetchUpdateUserFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUpdateUserFailure(errorMsg));
      });
  }
}

const fetchChangePasswordSuccess = (payload) => {
  return {
    type: FETCH_CHANGE_PASSWORD_SUCCESS,
    payload: payload,
  }
}

const fetchChangePasswordFailure = (error) => {
  return {
    type: FETCH_CHANGE_PASSWORD_FAILURE,
    payload: error,
  }
}

export const fetchChangePassword = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}user/changeUserPassword`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response);

        // if (response.data.message.text[0] === "update_user_successfully") {
        //   dispatch(fetchChangePasswordSuccess(response.data.message.text[0]));
        // } else {
        //   dispatch(fetchChangePasswordFailure(response.data.message.text[0]));
        // }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchChangePasswordFailure(errorMsg));
      });
  }
}