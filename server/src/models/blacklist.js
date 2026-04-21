const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

const blacklist = new mongoose.model("blacklist", blacklistSchema)

module.exports = blacklist;