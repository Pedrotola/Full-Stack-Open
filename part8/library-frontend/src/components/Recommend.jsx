import { useLazyQuery, useQuery } from "@apollo/client"
import { FILTER_BOOKS, ME } from "../queries"
import { useEffect, useState } from "react"

const Recommend = ({ show }) => {
    const [ getBooks, result ] = useLazyQuery(FILTER_BOOKS)
    const [ book, setBooks ] = useState(null)
    const userResult = useQuery(ME)

    useEffect(()=> {
        if (userResult.data && userResult.data.me) {
            getBooks({variables: {genres: userResult.data.me.favoriteGenre}})
        }
    }, [userResult.data, getBooks])

    useEffect(()=>{
        if (result.data && result.data.allBooks) {
            setBooks(result.data.allBooks)            
        }
    }, [result.data])

    if (!show) {
        return null
    }

    if (userResult.loading && result.loading) return <div>Loading...</div>
    
    const genreFavorite = userResult.data.me.favoriteGenre
    
    return(
        <div>
            <h3>Recommendations</h3>
            <p>books in your favorite genres <strong>{genreFavorite}</strong></p>
            <table>
                <tbody>
                    <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                    </tr>
                    {book.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend