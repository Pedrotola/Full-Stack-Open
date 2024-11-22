import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET_NOTIFICATION":
          return action.payload
      case "CLEAR_NOTIFICATION":
          return ''
      default:
          return state
    }
}

export const NotificationContext = createContext()

export const useNotificationValue = () => {
  const dispatch = useContext(NotificationContext)[1]
  const setNotification = (message, timeout = 5000) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message })
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), timeout)
  }
  return setNotification
}

export const useNotification = () => {
  return useContext(NotificationContext)[0]
}

export const NotificationContextProvider = (props) => {
  const [notifications, notificationDispatch] = useReducer(notificationReducer, [])

  return (
    <NotificationContext.Provider value={[notifications, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}


export default NotificationContext