import axios from "axios";
import {
  FETCH_GET_BEST_TEAM_SUCCESS,
  FETCH_GET_BEST_TEAM_FAILURE,
  FETCH_GET_TEAM_SUCCESS,
  FETCH_GET_TEAM_FAILURE,
  FETCH_GET_FOUND_TEAM_SUCCESS,
  FETCH_GET_FOUND_TEAM_FAILURE,
  FETCH_REGISTER_TO_TEAM_SUCCESS,
  FETCH_REGISTER_TO_TEAM_FAILURE,
  FETCH_CREATE_TEAM_SUCCESS,
  FETCH_CREATE_TEAM_FAILURE,
} from "./teamTypes";
import { API_URL } from "../../config";

const fetchGetBestTeamSuccess = (payload) => {
  return {
    type: FETCH_GET_BEST_TEAM_SUCCESS,
    payload: payload,
  };
};

const fetchGetBestTeamFailure = (error) => {
  return {
    type: FETCH_GET_BEST_TEAM_FAILURE,
    payload: error,
  };
};

export const fetchGetBestTeam = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}team/getBestTeamByNumber`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "team_empty") {
          dispatch(fetchGetBestTeamFailure(response.data.message.text[0]));
        } else if (
          response.data.message.text[0] === "get_best_team_successfully"
        ) {
          dispatch(fetchGetBestTeamSuccess(response.data.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetBestTeamFailure(errorMsg));
      });
  };
};

const fetchGetTeamSuccess = (payload) => {
  return {
    type: FETCH_GET_TEAM_SUCCESS,
    payload: payload,
  };
};

const fetchGetTeamFailure = (error) => {
  return {
    type: FETCH_GET_TEAM_FAILURE,
    payload: error,
  };
};

export const fetchGetTeam = (payload) => {
  console.log(payload);
  return (dispatch) => {
    let url = `${API_URL}team/getBestTeamByNumber`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response);

        if (response.data.message.text[0] === "team_empty") {
          dispatch(fetchGetTeamFailure(response.data.message.text[0]));
        } else if (
          response.data.message.text[0] === "get_best_team_successfully"
        ) {
          const params = {
            data: response.data.data,
            totalRecordCount: response.data.summary.totalRecordCount,
          };
          dispatch(fetchGetTeamSuccess(params));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetTeamFailure(errorMsg));
      });
  };
};

const fetchGetFoundTeamSuccess = (payload) => {
  return {
    type: FETCH_GET_FOUND_TEAM_SUCCESS,
    payload: payload,
  };
};

const fetchGetFoundTeamFailure = (error) => {
  return {
    type: FETCH_GET_FOUND_TEAM_FAILURE,
    payload: error,
  };
};

export const fetchGetFoundTeam = () => {
  return (dispatch) => {
    let url = `${API_URL}team/getFoundTeamList`;
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response.data.data);

        if (response.data.message.text[0] === "team_empty") {
          dispatch(fetchGetFoundTeamFailure(response.data.message.text[0]));
        } else if (
          response.data.message.text[0] === "get_found_team_successfully"
        ) {
          dispatch(fetchGetFoundTeamSuccess(response.data.data));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetFoundTeamFailure(errorMsg));
      });
  };
};


const fetchRegisterToTeamSuccess = (payload) => {
  return {
    type: FETCH_REGISTER_TO_TEAM_SUCCESS,
    payload: payload,
  };
};

const fetchRegisterToTeamFailure = (error) => {
  return {
    type: FETCH_REGISTER_TO_TEAM_FAILURE,
    payload: error,
  };
};

export const fetchRegisterToTeam = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}team/fetchRegisterToTeam`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (response.data.message.text[0] === "register_team_request_added") {
          dispatch(fetchRegisterToTeamSuccess(response.data.message.text[0]));
        } else {
          dispatch(fetchRegisterToTeamFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegisterToTeamFailure(errorMsg));
      });
  };
};


const fetchCreateTamSuccess = (payload) => {
  return {
    type: FETCH_CREATE_TEAM_SUCCESS,
    payload: payload,
  };
};

const fetchCreateTamFailure = (error) => {
  return {
    type: FETCH_CREATE_TEAM_FAILURE,
    payload: error,
  };
};

export const fetchCreateTeam = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}team/createTeam`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;


        if (response.data.message.text[0] === "team_created") {
          dispatch(fetchCreateTamSuccess(response.data.message.text[0]));
        } else {
          dispatch(fetchCreateTamFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCreateTamFailure(errorMsg));
      });
  };
};
