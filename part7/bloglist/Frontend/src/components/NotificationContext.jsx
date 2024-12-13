import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.payload
        case 'CLEAR_NOTIFCATION':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)[0]

export const useNotificationValue = () => {
    const dispatch = useContext(NotificationContext)[1]
    const setNotification = (message, timeout = 5000) => {
        dispatch({type: 'ADD_NOTIFICATION', payload: message})
        setTimeout(()=> {
            dispatch({ type: 'CLEAR_NOTIFCATION'})
        }, timeout)
    }
    return setNotification
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, [])
    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext