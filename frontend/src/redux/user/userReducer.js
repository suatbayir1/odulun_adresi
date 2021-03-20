import {
    FETCH_GET_USER_INFO_SUCCESS,
    FETCH_GET_USER_INFO_FAILURE,
    FETCH_UPDATE_USER_SUCCESS,
    FETCH_UPDATE_USER_FAILURE,
} from "./userTypes";

const initialState = {
    userInfo: {},
    userInfoError: "",
    updateUserMessage: "",
    updateUserClick: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GET_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                userInfoError: "",
            }
        case FETCH_GET_USER_INFO_FAILURE:
            return {
                ...state,
                userInfo: {},
                userInfoError: action.payload
            }
        case FETCH_UPDATE_USER_SUCCESS:
            return {
                ...state,
                updateUserMessage: action.payload,
                updateUserClick: !state.updateUserClick,
            }
        case FETCH_UPDATE_USER_FAILURE:
            return {
                ...state,
                updateUserMessage: action.payload,
                updateUserClick: !state.updateUserClick,
            }
        default:
            return state;
    }
}

export default userReducer;