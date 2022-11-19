import { bannerConstant, messageConstants } from '../actions/Constants';

const initialState = {
    bannerDetail: [],
    message: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case bannerConstant.ADD_BANNER_SUCCESS:
        case bannerConstant.DELETE_BANNER_SUCCESS:
        case bannerConstant.UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case bannerConstant.ADD_BANNER_FAIL:
        case bannerConstant.GET_BANNER_FAIL:
        case bannerConstant.DELETE_BANNER_FAIL:
        case bannerConstant.UPDATE_BANNER_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case bannerConstant.GET_BANNER_SUCCESS:
            return {
                ...state,
                bannerDetail: action.payload.bannerDetail
            }

        case messageConstants.REMOVE_BANNER_MESSAGE_AND_ERROR:
            return {
                ...state,
                error: null,
                message: null
            }

        default:
            return state
    }
}