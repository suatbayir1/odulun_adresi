import {
  FETCH_GET_BEST_TEAM_FAILURE,
  FETCH_GET_BEST_TEAM_SUCCESS,
  FETCH_GET_TEAM_SUCCESS,
  FETCH_GET_TEAM_FAILURE,
  FETCH_GET_FOUND_TEAM_SUCCESS,
  FETCH_GET_FOUND_TEAM_FAILURE,
  FETCH_REGISTER_TO_TEAM_SUCCESS,
  FETCH_REGISTER_TO_TEAM_FAILURE,
  FETCH_CREATE_TEAM_FAILURE,
  FETCH_CREATE_TEAM_SUCCESS,
} from "./teamTypes";

const initialData = {
  bestTeamList: [],
  bestTeamListError: "",
  teamList: [],
  teamListError: "",
  teamListTotalRecordCount: 0,
  foundTeamList: [],
  registerToTeamMessage: "",
  registerToTeamClick: false,
  createTeamMessage: "",
  createTeamClick: false,
};

const teamReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_GET_BEST_TEAM_SUCCESS:
      return {
        ...state,
        bestTeamList: action.payload,
        bestTeamListError: "",
      };
    case FETCH_GET_BEST_TEAM_FAILURE:
      return {
        ...state,
        bestTeamList: [],
        bestTeamListError: action.payload,
      };
    case FETCH_GET_TEAM_SUCCESS:
      return {
        ...state,
        teamList: action.payload.data,
        teamListTotalRecordCount: action.payload.totalRecordCount,
        teamListError: "",
      };
    case FETCH_GET_TEAM_FAILURE:
      return {
        ...state,
        teamList: [],
        teamListTotalRecordCount: action.payload.totalRecordCount,
        teamListError: action.payload,
      };
    case FETCH_GET_FOUND_TEAM_SUCCESS:
      return {
        ...state,
        foundTeamList: action.payload,
      };
    case FETCH_GET_FOUND_TEAM_FAILURE:
      return {
        ...state,
        foundTeamList: [],
      };
    case FETCH_REGISTER_TO_TEAM_SUCCESS:
      return {
        ...state,
        registerToTeamMessage: action.payload,
        registerToTeamClick: !state.registerToTeamClick
      }
    case FETCH_REGISTER_TO_TEAM_FAILURE:
      return {
        ...state,
        registerToTeamMessage: action.payload,
        registerToTeamClick: !state.registerToTeamClick,
      }
    case FETCH_CREATE_TEAM_SUCCESS:
      return {
        ...state,
        createTeamMessage: action.payload,
        createTeamClick: !state.createTeamClick,
      }
    case FETCH_CREATE_TEAM_FAILURE:
      return {
        ...state,
        createTeamMessage: action.payload,
        createTeamClick: !state.createTeamClick,
      }
    default:
      return state;
  }
};

export default teamReducer;
