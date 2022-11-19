import { productConstants, messageConstants } from '../actions/Constants';

const initialState = {
    products: [],
    error: null,
    message: null
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload.allProducts
            }

        case productConstants.GET_ALL_PRODUCT_FAIL:
        case productConstants.ADD_PRODUCT_FAIL:
        case productConstants.DELETE_PRODUCT_FAIL:
        case productConstants.EDIT_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload.error
            }

        case productConstants.ADD_PRODUCT_SUCCESS:
        case productConstants.DELETE_PRODUCT_SUCCESS:
        case productConstants.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                message: action.payload.message
            }

        case messageConstants.REMOVE_PRODUCT_MESSAGE_AND_ERROR:
            return {
                ...state,
                message: null,
                error: null
            }

        default:
            return state
    }
}

export default productReducer;