import axios from "axios";
import {
  FETCH_SWEEPSTAKE_LIST_SUCCESS,
  FETCH_SWEEPSTAKE_LIST_FAILURE,
  FETCH_SWEEPSTAKE_REGISTER_SUCCESS,
  FETCH_SWEEPSTAKE_REGISTER_FAILURE,
} from "./sweepstakeTypes";
import { API_URL } from "../../config";

const fetchSweepstakeListSuccess = (payload) => {
  return {
    type: FETCH_SWEEPSTAKE_LIST_SUCCESS,
    payload: payload,
  };
};

const fetchSweepstakeListFailure = (error) => {
  return {
    type: FETCH_SWEEPSTAKE_LIST_FAILURE,
    payload: error,
  };
};

export const fetchSweepstakeList = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}sweepstake/getSweepstake`;

    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (
          response.data.message.text[0] === "sweepstake_list_get_successfully"
        ) {
          const params = {
            data: response.data.data,
            totalRecordCount: response.data.summary.totalRecordCount,
          };
          dispatch(fetchSweepstakeListSuccess(params));
        } else {
          dispatch(fetchSweepstakeListFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        dispatch(fetchSweepstakeListFailure(error.message));
      });
  };
};

const fetchSweepstakeRegisterSuccess = (payload) => {
  return {
    type: FETCH_SWEEPSTAKE_REGISTER_SUCCESS,
    payload: payload,
  }
}

const fetchSweepstakeRegisterFailure = (error) => {
  return {
    type: FETCH_SWEEPSTAKE_REGISTER_FAILURE,
    payload: error,
  }
}

export const fetchSweepstakeRegister = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}sweepstake/registerToSweepstake`;

    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (
          response.data.message.text[0] === "record_saved_successfully"
        ) {
          dispatch(fetchSweepstakeRegisterSuccess(response.data.message.text[0]));
        } else {
          dispatch(fetchSweepstakeRegisterFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        dispatch(fetchSweepstakeRegisterFailure(error.message));
      });
  };
};