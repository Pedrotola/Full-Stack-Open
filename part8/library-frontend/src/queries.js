import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
    }
`

export const ALL_AUTHORS = gql`
    query allAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            title
            published
            author {
            name
            }
            genres
        }
    }
`


export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]){
        addBook(
            title: $title, 
            published: $published, 
            author: $author, 
            genres: $genres) 
            {
            title
            published
            author{
                name
            }
        }
    }
`

export const EDIT_BORN = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!){
        editAuthor(name: $name, setBornTo: $setBornTo){
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`

export const ME = gql`
    query me{
        me{
            username
            favoriteGenre
        }
    }
`



export const FILTER_BOOKS = gql`
    query allBooks($author: String, $genres: String){
        allBooks(author: $author, genre: $genres){
            title
            published
            genres
            author{
                name
            }
        }
    }
`

export const FILTER_GENRE = gql`
    query allBooks($genres: String!){
        allBooks(genre: $genres){
            title
            published
            genres
            author{
                name
            }
        }
    }
`

export const BOOK_ADDED = gql`
    subscription{
        bookAdded{
            ...BookDetails
        }
    }${BOOK_DETAILS}
`