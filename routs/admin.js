const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../model/Categoria')
const categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
  res.render('admin/index'); // corresponde a views/admin/index.handlebars
})

router.get('/posts', (req,res) => {
    res.send('Lisatagem de posts')
})

router.get('/categorias', (req, res) => {
  categoria.find().sort({data:'desc'}).lean().then((categorias) => {
    res.render('admin/categorias', { categorias });
  }).catch((err) => {
    req.flash('error_msg', 'Erro ao listar categorias');
    res.redirect('/admin');
  });
});

router.get('/categorias/add', ((req,res) => {
    res.render('admin/addcategorias')
}))

router.post('/novacategoria',(req, res) => {
   const erros = []
   

   if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
   }

   if(!req.body.slog || typeof req.body.slog == undefined || req.body.slog == null){
        erros.push({texto: "Slog invalido"})
   }

   if(req.body.nome.length < 3){
        erros.push({texto: "Nome muito pequeno"})
   }

   if(erros.length > 0){
        res.render('admin/addcategorias',{erros: erros})
   }else{
    console.log(erros)

        const novacategoria = {
            nome: req.body.nome,
            slog: req.body.slog
        } 
        console.log(novacategoria)
        new categoria (novacategoria).save().then(() => {
            req.flash('success_msg', 'Categoria registada com sucesso')          
            res.redirect("/admin/categorias" )

        }).catch((err) => {
            req.flash('error_msg', 'Problema ao registada com sucesso tente novamente')
            res.redirect('/admin')
        })
    

   }

       
})

router.get('/categorias/edit/:id', (req,res)=>{
    categoria.findOne().lean({_id: req.params.id}).then((categorias)=>{
        res.render('admin/edit',{categorias:categorias})
    }).catch((err)=>{
        res.flash('error_msg','categoria não existe')
        res.render('/admin/edit')
    })
    
})

module.exports=router