const express = require('express');
const handlebars = require('express-handlebars');
const admin = require('./routs/admin');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const app = express();

// Body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Banco de Mongo
require('./config/db')

//session
app.use(session({
  secret:'silviojodasilva',
  resave: true,
  saveUninitialized:true
}))

//flash
  app.use(flash())

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

// Public (arquivos estáticos)
app.use('/public',express.static(path.join(__dirname, 'public'))); 

//middleware
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next()
})


// Rotas
app.use('/admin', admin);

// Página inicial
app.get('/', (req, res) => {
  res.render('home');
});

// Servidor
const PORT = 2004;
app.listen(PORT, () => {
  console.log('Servidor Rodando');
});