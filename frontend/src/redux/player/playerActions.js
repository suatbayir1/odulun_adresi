import {
  FETCH_GET_BEST_PLAYER_SUCCESS,
  FETCH_GET_BEST_PLAYER_FAILURE,
  FETCH_GET_PLAYER_SUCCESS,
  FETCH_GET_PLAYER_FAILURE,
} from "./playerTypes";
import { API_URL } from "../../config";
import axios from "axios";

const fetchGetBestPlayerSuccess = (payload) => {
  return {
    type: FETCH_GET_BEST_PLAYER_SUCCESS,
    payload: payload,
  };
};

const fetchGetBestPlayerFailure = (error) => {
  return {
    type: FETCH_GET_BEST_PLAYER_FAILURE,
    error: error,
  };
};

export const fetchGetBestPlayer = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}user/getBestPlayerByNumber`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "users_empty") {
          dispatch(fetchGetBestPlayerFailure(response.data.message.text[0]));
        } else if (
          response.data.message.text[0] === "get_best_users_successfully"
        ) {
          dispatch(fetchGetBestPlayerSuccess(response.data.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetBestPlayerFailure(errorMsg));
      });
  };
};

const fetchGetPlayerSuccess = (payload) => {
  return {
    type: FETCH_GET_PLAYER_SUCCESS,
    payload: payload,
  };
};

const fetchGetPlayerFailure = (error) => {
  return {
    type: FETCH_GET_PLAYER_FAILURE,
    error: error,
  };
};

export const fetchGetPlayer = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}user/getBestPlayerByNumber`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "users_empty") {
          dispatch(fetchGetPlayerFailure(response.data.message.text[0]));
        } else if (
          response.data.message.text[0] === "get_best_users_successfully"
        ) {
          const params = {
            data: response.data.data,
            totalRecordCount: response.data.summary.totalRecordCount,
          };
          console.log(params);
          dispatch(fetchGetPlayerSuccess(params));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetPlayerFailure(errorMsg));
      });
  };
};
