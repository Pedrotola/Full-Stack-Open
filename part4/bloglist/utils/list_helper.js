const _ = require('lodash')

/* Exercise 4.3 */
const dummy = ( blogs ) => { return 1 }
/* Exercise 4.4 */
const totalLikes = ( blogs ) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}
/* Exercise 4.5 */
const favoriteBlog = ( blogs ) =>{
    if (blogs.length === 0) { return {} }

    const max = blogs.reduce((prev, current) => {
        return current.likes > prev.likes ? current : prev
    })
    delete max._id
    delete max.url
    delete max.__v
    return max
}
/* Exercise 4.6 */
const mostBlogs = ( blogs ) => {
    if (blogs.length === 0) { return {} }
    /* Exercise without the use of libraries */
    const countBlogs = blogs.reduce((count, blog) => {
        (count[blog.author] = (count[blog.author] || 0 ) + 1)
        return count
    }, {})

    console.log(countBlogs);

    const mostBlogsWrite = Object.keys(countBlogs).reduce((prev, current) => {
        return countBlogs[prev] > countBlogs[current] ? prev : current
    })

    console.log(mostBlogsWrite);
    /* Build of the mostLikes with lodash */
    /* groupAuthor = _.groupBy(blogs, 'author') 
    countBlogs = _.mapValues(groupAuthor, (author) => author.length)
    mostBlogsWrite = _.maxBy(Object.keys(countBlogs), (author) => countBlogs[author])*/
    return { 
        author: mostBlogsWrite,
        blogs: countBlogs[mostBlogsWrite]
    }
}
/* Exercise 4.7 */
const mostLikes = ( blogs ) => {
    if (blogs.length === 0) { return {} }
    /* Exercise without the use of libraries */
    const countLikes = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0 ) + blog.likes
        return count
    }, {})
    
    const mostLikesBlog = Object.keys(countLikes).reduce((prev, current) => {
        return countLikes[prev] > countLikes[current] ? prev : current
    })
    /* Build of the mostLikes with lodash */
    /* groupAuthor= _.groupBy(blogs, 'author')
    countLikes = _.mapValues(groupAuthor, (author) => _.sumBy(author, 'likes'))
    mostLikesBlog = _.maxBy(Object.keys(countLikes), (author) => countLikes[author]) */
    return {
        author: mostLikesBlog,
        likes: countLikes[mostLikesBlog]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }