import {
  FETCH_SWEEPSTAKE_LIST_SUCCESS,
  FETCH_SWEEPSTAKE_LIST_FAILURE,
  FETCH_SWEEPSTAKE_REGISTER_SUCCESS,
  FETCH_SWEEPSTAKE_REGISTER_FAILURE,
} from "./sweepstakeTypes";

const initialData = {
  sweepStakeList: [],
  sweepStakeListTotalRecordCount: 0,
  sweepStakeListError: "",
  registerToSweepstakeMessage: "",
  isClickedRegisterButton: false,
};

const sweepstakeReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_SWEEPSTAKE_LIST_SUCCESS:
      return {
        ...state,
        sweepStakeList: action.payload.data,
        sweepStakeListTotalRecordCount: action.payload.totalRecordCount,
        sweepStakeListError: "",
      };
    case FETCH_SWEEPSTAKE_LIST_FAILURE:
      return {
        ...state,
        sweepStakeList: [],
        sweepStakeListTotalRecordCount: 0,
        sweepStakeListError: action.payload,
      };
    case FETCH_SWEEPSTAKE_REGISTER_SUCCESS:
      return {
        ...state,
        registerToSweepstakeMessage: action.payload,
        isClickedRegisterButton: !state.isClickedRegisterButton,
      }
    case FETCH_SWEEPSTAKE_REGISTER_FAILURE:
      return {
        ...state,
        registerToSweepstakeMessage: action.payload,
        isClickedRegisterButton: !state.isClickedRegisterButton
      }
    default:
      return state;
  }
};

export default sweepstakeReducer;
