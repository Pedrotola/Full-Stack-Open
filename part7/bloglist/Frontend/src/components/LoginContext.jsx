import { createContext, useContext, useReducer } from "react"

const loginReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return null
        default: 
            return state        
    }
}

const LoginContext = createContext()

export const useLoginValue = () => useContext(LoginContext)[0]

export const useLogout = () => {
    const dispatch = useContext(LoginContext)[1]
    return () => dispatch({type: 'LOGOUT'})
}

export const useLogin = () => {
    const dispatch = useContext(LoginContext)[1]
    return (user) => dispatch({type: 'LOGIN', payload: user})
}

export const LoginContextProvider = ( props ) => {
    const [login, loginDispatch] = useReducer(loginReducer, null)
    return(
        <LoginContext.Provider value={[login, loginDispatch]}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext