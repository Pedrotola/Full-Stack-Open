const moongose = require('mongoose')

const schema = new moongose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

module.exports = moongose.model('User', schema)