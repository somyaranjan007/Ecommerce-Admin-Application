import { loginConstants, messageConstants } from "../actions/Constants";

const initialState = {
    adminInfo: {},
    authenticate: false,
    authenticating: false,
    error: null,
    message: null
}

// login and logout Reducer
const loginReducer = (state = initialState, action) => {

    switch (action.type) {

        // login cases
        case loginConstants.LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true
            }

        case loginConstants.LOGIN_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                authenticating: false,
                authenticate: true
            }

        case loginConstants.LOGIN_FAIL:
            return {
                ...state,
                authenticating: false,
                error: action.payload.error
            }


        // logout cases
        case loginConstants.LOGOUT_SUCCESS:
            return {
                ...initialState,
                message: action.payload.message
            }

        case loginConstants.LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case messageConstants.REMOVE_LOGIN_MESSAGE_AND_ERROR:
            return {
                ...state,
                error: null,
                message: null
            }

        default:
            return state
    }
}

export default loginReducer;