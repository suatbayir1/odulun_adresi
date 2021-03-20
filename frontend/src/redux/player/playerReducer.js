import {
  FETCH_GET_BEST_PLAYER_SUCCESS,
  FETCH_GET_BEST_PLAYER_FAILURE,
  FETCH_GET_PLAYER_SUCCESS,
  FETCH_GET_PLAYER_FAILURE,
} from "./playerTypes";

const initialData = {
  bestPlayerList: [],
  bestPlayerListError: "",
  playerList: [],
  playerListRecordCount: 0,
};

const playerReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_GET_BEST_PLAYER_SUCCESS:
      return {
        ...state,
        bestPlayerList: action.payload,
        bestPlayerListError: "",
      };
    case FETCH_GET_BEST_PLAYER_FAILURE:
      return {
        ...state,
        bestPlayerList: [],
        bestPlayerListError: action.payload,
      };
    case FETCH_GET_PLAYER_SUCCESS:
      return {
        ...state,
        playerList: action.payload.data,
        playerListRecordCount: action.payload.totalRecordCount,
      };
    case FETCH_GET_PLAYER_FAILURE:
      return {
        ...state,
        playerList: [],
        playerListRecordCount: 0,
      };
    default:
      return state;
  }
};

export default playerReducer;
