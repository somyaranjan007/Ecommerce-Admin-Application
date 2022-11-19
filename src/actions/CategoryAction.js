import { categoryConstants, messageConstants } from './Constants';
import Axios from '../axios/Axios';

export const getAllCategory = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get("/category/get")
            dispatch({
                type: categoryConstants.GET_CATEGORY_SUCCESS,
                payload: {
                    categories: res.data.categories
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: categoryConstants.GET_CATEGORY_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const createCategory = (data) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/category/create', data)
            dispatch({
                type: categoryConstants.CREATE_CATEGORY_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: categoryConstants.CREATE_CATEGORY_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/category/delete', { categoryId })
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })

        } catch (error) {
            error.response &&
                dispatch({
                    type: categoryConstants.DELETE_CATEGORY_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const editCategory = (categoryDetail) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post("/category/edit", categoryDetail)
            dispatch({
                type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORY_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const categoryMessageAndErrorRemove = () => {
    return (dispatch) => {
        dispatch({
            type: messageConstants.REMOVE_CATEGORY_MESSAGE_AND_ERROR
        })
    }
}