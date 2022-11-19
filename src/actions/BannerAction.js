import Axios from '../axios/Axios';
import { bannerConstant, messageConstants } from './Constants';


export const addBanner = (form) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/banner/addBanner', form);
            dispatch({
                type: bannerConstant.ADD_BANNER_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })

        } catch (error) {
            error.response &&
                dispatch({
                    type: bannerConstant.ADD_BANNER_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const getBanner = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.get('/banner/getBanner')
            dispatch({
                type: bannerConstant.GET_BANNER_SUCCESS,
                payload: {
                    bannerDetail: res.data.bannerDetail
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: bannerConstant.GET_BANNER_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const deleteBanner = (bannerId) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/banner/deleteBanner', { bannerId })
            dispatch({
                type: bannerConstant.DELETE_BANNER_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: bannerConstant.DELETE_BANNER_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const editBanner = (updatedBanner) => {
    return async (dispatch) => {
        try {
            const res = await Axios.post('/banner/editBanner', updatedBanner)
            dispatch({
                type: bannerConstant.UPDATE_BANNER_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: bannerConstant.UPDATE_BANNER_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}

export const bannerMessageAndErrorRemove = () => {
    return (dispatch) => {
        dispatch({
            type: messageConstants.REMOVE_BANNER_MESSAGE_AND_ERROR
        })
    }
}