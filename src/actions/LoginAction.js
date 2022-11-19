import { loginConstants, messageConstants } from "./Constants";
import Axios from '../axios/Axios';


export const adminLogin = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: loginConstants.LOGIN_REQUEST })

            const params = { email, password }
            const res = await Axios.post('/admin/signin', params)

            sessionStorage.setItem('__xyz__', "true")

            dispatch({
                type: loginConstants.LOGIN_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })

        } catch (error) {
            error.response &&
                dispatch({
                    type: loginConstants.LOGIN_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }

    }
}


export const isAdminLogin = () => {
    return (dispatch) => {

        const token = sessionStorage.getItem("__xyz__")
        if (token) {
            dispatch({
                type: loginConstants.LOGIN_SUCCESS,
                payload: {
                    message: "Admin Already Login"
                }
            })
        }
        // else {
        //     dispatch({
        //         type: loginConstants.LOGIN_FAIL,
        //         payload: {
        //             error: "Login first"
        //         }
        //     })
        // }

    }
}


export const adminLogout = () => {
    return async (dispatch) => {
        try {
            const res = await Axios.post("/admin/signout")
            sessionStorage.clear()
            dispatch({
                type: loginConstants.LOGOUT_SUCCESS,
                payload: {
                    message: res.data.message
                }
            })
        } catch (error) {
            error.response &&
                dispatch({
                    type: loginConstants.LOGOUT_FAIL,
                    payload: {
                        error: error.response.data.error
                    }
                })
        }
    }
}


export const loginErrorRemove = () => {
    return (dispatch) => {
        dispatch({
            type: messageConstants.REMOVE_LOGIN_MESSAGE_AND_ERROR
        })
    }
}