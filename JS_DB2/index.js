const express = require ("express")
const app = express()
const BodyParser = require('body-parser')
const handlebars =require('express-handlebars')
const bodyParser = require("body-parser")
const Post = require('./models/monitorias')

//Config
    //Template Engine
        app.engine('handlebars', handlebars.engine({defaultLayout:'main',runtimeOptions:{
            allowProtoMethodsByDefault:true,
            allowedProtoProperties:true
        }}))
        app.set('view engine','handlebars')
    //BodyParser
        app.use(bodyParser.urlencoded({extended:false}))
        app.use(bodyParser.json())
//Conexao com o DataBase
    
    

//Rotas

    app.get('/',function (req,res){
        Post.findAll().then(function (posts) {
            res.render('home',{posts:posts})
        })
    })

    app.get("/cad" , function(req , res){
        res.render('formulario')
    })

    app.post('/add',function(req,res){
        Post.create({
            titulo : req.body.titulo,
            conteudo : req.body.conteudo
        }).then(function(){
            console.log(req.body.titulo)
            res.redirect('/')
        }).catch(function(erro){
            res.send("Erro! : "+erro)
        })
        
    })

    app.get('/deletar/:id',function(req,res){
        Post.destroy({where:{'id':req.params.id}})
        res.render('sucesso')
    })


app.listen(3000,function () {
    console.log("Servidor rodando na url 192.168.101.10:3000")
})
