const _ = require('lodash')

const dummy = ( blogs ) =>{
    return 1
}

const totalLikes = ( blogs ) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = ( blogs ) =>{
    const max = blogs.reduce((prev, current) => {
        return current.likes > prev.likes ? current : prev
    })
    delete max._id
    delete max.url
    delete max.__v
    return max
}

const mostBlogs = ( blogs ) => {
    /* Build of the mostLikes with lodash */
    groupAuthor = _.groupBy(blogs, 'author') 
    countBlogs = _.mapValues(groupAuthor, (author) => author.length)
    mostBlogsWrite = _.maxBy(Object.keys(countBlogs), (author) => countBlogs[author]) 
    return { 
        author: mostBlogsWrite,
        blogs: countBlogs[mostBlogsWrite]
    }
}

const mostLikes = ( blogs ) => {
    /* Build of the mostLikes with lodash */
    groupAuthor= _.groupBy(blogs, 'author')
    countLikes = _.mapValues(groupBlog, (author) => _.sumBy(author, 'likes'))
    mostLikesBlog = _.maxBy(Object.keys(countLikes), (author) => countLikes[author])

    return {
        author: mostLikesBlog,
        likes: countLikes[mostLikesBlog]
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }