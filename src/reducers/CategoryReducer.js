import { categoryConstants, messageConstants } from "../actions/Constants"

const initialState = {
    categories: [],
    error: null,
    message: null
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case categoryConstants.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories
            }

        case categoryConstants.GET_CATEGORY_FAIL:
        case categoryConstants.CREATE_CATEGORY_FAIL:
        case categoryConstants.DELETE_CATEGORY_FAIL:
        case categoryConstants.UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case categoryConstants.CREATE_CATEGORY_SUCCESS:
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case messageConstants.REMOVE_CATEGORY_MESSAGE_AND_ERROR:
            return {
                ...state,
                message: null,
                error: null
            }

        default:
            return state
    }
}

export default categoryReducer;