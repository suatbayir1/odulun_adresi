import {
  FETCH_TOURNAMENT_LIST_SUCCESS,
  FETCH_TOURNAMENT_LIST_FAILURE,
  FETCH_REGISTER_TO_TOURNAMENT_SUCCESS,
  FETCH_REGISTER_TO_TOURNAMENT_FAILURE,
  FETCH_GET_UNFILLED_TEAM_LIST_SUCCESS,
  FETCH_GET_UNFILLED_TEAM_LIST_FAILURE,
} from "./tournamentTypes";

const initialData = {
  tournamentList: [],
  tournamentListError: "",
  tournamentListTotalRecordCount: 0,
  registerToTournamentMessage: "",
  unfilledTeamList: [],
  unfilledTeamListMessage: "",
  isClickedRegister: false,
};

const tournamentReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENT_LIST_SUCCESS:
      return {
        ...state,
        tournamentList: action.payload.data,
        tournamentListError: "",
        tournamentListTotalRecordCount: action.payload.totalRecordCount,
      };
    case FETCH_TOURNAMENT_LIST_FAILURE:
      return {
        ...state,
        tournamentList: [],
        tournamentListError: action.payload,
        tournamentListTotalRecordCount: 0,
      };
    case FETCH_REGISTER_TO_TOURNAMENT_SUCCESS:
      return {
        ...state,
        registerToTournamentMessage: action.payload,
        isClickedRegister: !state.isClickedRegister,
      }
    case FETCH_REGISTER_TO_TOURNAMENT_FAILURE:
      return {
        ...state,
        registerToTournamentMessage: action.payload,
        isClickedRegister: !state.isClickedRegister,
      }
    case FETCH_GET_UNFILLED_TEAM_LIST_SUCCESS:
      return {
        ...state,
        unfilledTeamList: action.payload,
        unfilledTeamListMessage: "",
      }
    case FETCH_GET_UNFILLED_TEAM_LIST_FAILURE:
      return {
        ...state,
        unfilledTeamList: [],
        unfilledTeamListMessage: action.payload,
      }
    default:
      return state;
  }
};

export default tournamentReducer;
