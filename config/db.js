const mongoose = require('mongoose')

//Mongoose
const conexao = 'mongodb://127.0.0.1:27017/blogapp' 

mongoose.Promise = global.Promise
mongoose.connect(conexao).then(()=>{console.log('ON')}).catch((err)=>{console.log('off '+err)})
