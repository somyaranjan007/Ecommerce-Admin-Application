import Axios from '../axios/Axios';
import { productConstants, messageConstants } from './Constants';


export const showProducts = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('/product/get')
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: {
                    allProducts: res.data.allProducts
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: productConstants.GET_ALL_PRODUCT_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const addProducts = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/product/add', data)
            dispatch({
                type: productConstants.ADD_PRODUCT_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: productConstants.ADD_PRODUCT_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/product/delete', { productId })
            dispatch({
                type: productConstants.DELETE_PRODUCT_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })

        } catch (error) {
            error.response &&
                dispatch({
                    type: productConstants.DELETE_PRODUCT_SUCCESS,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}

export const editProduct = (productDetail) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('product/edit', productDetail)
            dispatch({
                type: productConstants.EDIT_PRODUCT_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: productConstants.EDIT_PRODUCT_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}

export const productMessageAndErrorRemove = () => {
    return (dispatch) => {
        dispatch({
            type: messageConstants.REMOVE_PRODUCT_MESSAGE_AND_ERROR
        })
    }
}