const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoria = new Schema ({
 nome:{
    type: String,
    require: true
 },
 slog:{
    type: String,
    require: true
 },
 data: {
    type: Date,
    default: Date.now()
 }
})

mongoose.model('categorias', categoria)