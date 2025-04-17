import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_BORN } from "../queries"

const BirthdayForm = ({ authors }) => {
    const [ name, setName ] = useState('')
    const [ born, setBorn ] = useState(0)
    const [ updateAuthor, result ] = useMutation(EDIT_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }], 
        onError: (error) => {
            const message = error.graphQLErrors[0].message
            console.log(message);            
        }
    })

    useEffect(() => {        
        if (result.data && !result.data.editAuthor) {
            console.log('Author not found');            
        }
    }, [result.data])

    const changeBorn = (e) => {
        e.preventDefault()
        updateAuthor({ variables: {name, setBornTo: Number(born)} })
        console.log(name, " ", born);        
        setName('')
        setBorn(0)
    }

    return(
        <div>
            <h2>Set Birthday</h2>
            <form onSubmit={changeBorn}>
                <select id="author" value={name} onChange={({ target }) => setName(target.value)}>
                    <option key="null" value=''>--</option>
                    {authors.map((a) => (
                        <option key={a.name} value={a.name}>{a.name}</option>
                    ))}
                </select>                
                <div>born <input id={born} type="number" value={born} onChange={({ target }) => setBorn(target.value)}/></div>
                <button type="submit">update birthday</button>
            </form>
        </div>
    )
}

export default BirthdayForm