import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        newNotification(state, action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

export const { newNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
    return dispatch => {
        dispatch(newNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000 )
    }
}

export default notificationSlice.reducer