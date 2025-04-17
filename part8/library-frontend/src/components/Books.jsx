import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, FILTER_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const GenresFilter = ({ books, setGenres }) => {  
  const genres = books.flatMap(b => b.genres)
  const allGenres = [...new Set(genres)]
  return(
    <div>
      {allGenres.map( (b) => ( 
        <button key={b} onClick={() => {setGenres(b)}}>{b}</button>
      ))}
      <button onClick={() => {setGenres(null)}}>all Genres</button>
    </div>
  )
}


const Books = (props) => {

  const [ getBooks, result ] = useLazyQuery(FILTER_BOOKS)
  const [ books, setBooks ] = useState([])
  const [ allBooks, setAllBooks ] = useState([])
  const [ genres, setGenres ] = useState(null)

  const booksResult = useQuery(ALL_BOOKS) 

  useEffect(()=> {
    if (booksResult.data && booksResult.data.allBooks) {
      setAllBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  useEffect(()=>{
    if (genres) {
      getBooks({variables: {genres: genres}})
    }else {
      getBooks()
    }

  }, [getBooks, genres])

  useEffect(()=>{
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (result.loading && booksResult.loading) {
    return <div><h3>Loading...</h3></div>    
  }
  if (!props.show) return null

  return (
    <div>
      <h2>books</h2>
      {genres && <p>in genres <strong>{genres}</strong> </p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenresFilter books={allBooks} setGenres={setGenres}/>
    </div>
  )
}

export default Books
