const mongoose = require('mongoose');
const boardInfoSchema = mongoose.Schema({
    name: { type: String, require: true },
    userId: {
        type: String, require: true,
    },
    todoList: { type: [], default: [] }
})
module.exports = mongoose.model('BoardInfo', boardInfoSchema);
