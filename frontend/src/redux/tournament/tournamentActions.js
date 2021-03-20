import axios from "axios";
import {
  FETCH_TOURNAMENT_LIST_SUCCESS,
  FETCH_TOURNAMENT_LIST_FAILURE,
  FETCH_REGISTER_TO_TOURNAMENT_FAILURE,
  FETCH_REGISTER_TO_TOURNAMENT_SUCCESS,
  FETCH_GET_UNFILLED_TEAM_LIST_SUCCESS,
  FETCH_GET_UNFILLED_TEAM_LIST_FAILURE,
} from "./tournamentTypes";
import { API_URL } from "../../config";

const fetchTournamentListSuccess = (payload) => {
  return {
    type: FETCH_TOURNAMENT_LIST_SUCCESS,
    payload: payload,
  };
};

const fetchTournamentListFailure = (error) => {
  return {
    type: FETCH_TOURNAMENT_LIST_FAILURE,
    payload: error,
  };
};

export const fetchTournamentList = (payload) => {
  console.log(payload);
  return (dispatch) => {
    let url = `${API_URL}tournament/getTournament`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (
          response.data.message.text[0] === "tournament_list_get_successfully"
        ) {
          const params = {
            data: response.data.data,
            totalRecordCount: response.data.summary.totalRecordCount,
          };
          dispatch(fetchTournamentListSuccess(params));
        } else {
          dispatch(fetchTournamentListFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchTournamentListFailure(errorMsg));
      });
  };
};

const fetchRegisterToTournamentSuccess = (payload) => {
  return {
    type: FETCH_REGISTER_TO_TOURNAMENT_SUCCESS,
    payload: payload,
  }
}

const fetchRegisterToTournamentFailure = (error) => {
  return {
    type: FETCH_REGISTER_TO_TOURNAMENT_FAILURE,
    payload: error,
  }
}

export const fetchRegisterToTournament = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}tournament/registerToTournament`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        console.log(response);

        if (
          response.data.message.text[0] === "record_saved_successfully"
        ) {
          dispatch(fetchRegisterToTournamentSuccess(response.data.message.text[0]));
        } else {
          console.log(response.data.message.text[0]);

          dispatch(fetchRegisterToTournamentFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegisterToTournamentFailure(errorMsg));
      });
  };
};

const fetchGetUnfilledTeamListSuccess = (payload) => {
  return {
    type: FETCH_GET_UNFILLED_TEAM_LIST_SUCCESS,
    payload: payload,
  }
}

const fetchGetUnfilledTeamListFailure = (error) => {
  return {
    type: FETCH_GET_UNFILLED_TEAM_LIST_FAILURE,
    payload: error,
  }
}

export const fetchGetUnfilledTeamList = (payload) => {
  return (dispatch) => {
    let url = `${API_URL}tournament/getUnfilledTeamList`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status !== 200) return;

        if (
          response.data.message.text[0] === "get_unfilled_team_list_successfully"
        ) {
          dispatch(fetchGetUnfilledTeamListSuccess(response.data.data));
        } else {
          dispatch(fetchGetUnfilledTeamListFailure(response.data.message.text[0]));
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchGetUnfilledTeamListFailure(errorMsg));
      });
  };
};
