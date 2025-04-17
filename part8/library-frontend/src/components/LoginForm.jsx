import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({setToken, show, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            const message = error.graphQLErrors[0].message
            console.log(message);
        },
        onCompleted: () => setPage("authors")
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            localStorage.setItem("library-user-token", token)
            setToken(token)
        }
    }
    , [result.data, setToken])
    
    if (!show) {
        return null
    }

    const submit = (e) => {
        e.preventDefault()
        login({variables: {username, password}})
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username: 
                    <input type="text" 
                        id="username"
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password: 
                    <input type="password" 
                    id="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm