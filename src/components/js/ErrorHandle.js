import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";

const ErrorHandle = ({ message = null, error, removeAction }) => {
    const [showMessageOrError, setShowMessageOrError] = useState()
    const [alertSeverity, setAlertSeverity] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            if (message) {
                setShowMessageOrError(message)
                setAlertSeverity("success")

                setTimeout(() => {
                    setShowMessageOrError('')
                    dispatch(removeAction())
                }, 2000)
            }
            if (error) {
                setShowMessageOrError(error)
                setAlertSeverity("error")

                setTimeout(() => {
                    setShowMessageOrError('')
                    dispatch(removeAction())
                }, 2000)
            }
        }, 300)
    }, [message, error])

    return (
        <div style={{
            position: 'fixed',
            bottom: '5%',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '25%',
            zIndex: '5'
        }}>
            {
                showMessageOrError && <Alert severity={alertSeverity} style={{ marginRight: "15px" }}>{showMessageOrError}</Alert>
            }
        </div>
    )
}

export default ErrorHandle;