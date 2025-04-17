const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      dummy: () => 0 ,
      bookCount: async () =>  Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const books = await Book.find({}).populate("author")
        if (args.author) {
          const booksFilter = books.filter(a => a.author.name === args.author)
          return booksFilter
        }
        if (args.genre) {
          const booksFilter = books.filter(a => a.genres.includes(args.genre))
          return booksFilter
        }  
        return books
      },    
      allAuthors: async (root, args) => {
        return Author.find({}) 
      },
      me: (root, args, context) => context.currentUser
    },
    Book: {
      author: (params) => params.author
    },
    Author: {
      bookCount: (root, args, context) => context.loaders.bookCountLoader.load(root.id)
    },
    Mutation: {
      addBook: async (root, args, context) => {
        let author = await Author.findOne({ name: args.author })
  
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated',{
            extensions:{
              code: 'BAD_USER_INPUT'
            }
          });
                    
        }
  
        if(!author){
          author = new Author({ name:args.author })
          try{
            await author.save()
          }catch (error) {
            throw new GraphQLError('Creating the user failed',{
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidsArg: args.username,
                error
              }
            })
          }
        }
  
        const books = new Book({ ...args, author: author._id })
  
        try {
          const newBook = await books.save()
          pubsub.publish('BOOK_ADDED', { bookAdded: newBook})
          return newBook.populate('author')
        } catch (error) {
          throw new GraphQLError('Creating the book failed',{
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidsArg: args.username,
              error
            }
          })
        }

      },
      editAuthor: async (root, args, context) => {
        const author = await Author.findOne({ name: args.name })
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions:{
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        try{
          await author.save()
        }catch (error){
          throw new UserInputError(error.message, {
            InvalidArgs: args
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({...args})
        return user.save()
          .catch((error) => {
            throw new GraphQLError('creating the user failed', {
              extensions:{
                code: 'BAD_USER_INPUT',
                invalidsArg: args.username,
                error
              }
            });
            
          })
  
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if (!user || args.password !== 'secret') {
          throw new GraphQLError('credentials wrong', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          });
        }
        const userForToken = {
          username: user.username,
          id: user._id,
          favoriteGenre: user.favoriteGenre
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription:{
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers