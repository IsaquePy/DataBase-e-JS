/*
1 - Pegar databases e tabelas
2 - Exibir
*/
const express = require ("express")
const app = express()
const BodyParser = require('body-parser')
const handlebars =require('express-handlebars')
const bodyParser = require("body-parser")
const Monitorias = require('./models/monitorias')


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
    
//Rotas 
    app.get('/form',function(req,res){
        res.render('formulario')
    })

    app.post('/add',function(req,res){
        Monitorias.create({
            Materia : req.body.materia,
            Descricao : req.body.descricao,
            Professor : req.body.professor,
            Horario : req.body.horario
        }).then(function(){
            console.log(req.body.titulo)
            res.redirect('/home')
        }).catch(function(erro){
            res.send("Erro! : "+erro)
        })
    })

    app.get('/home/deletar/:id',function(req,res){
        
        Monitorias.destroy({where:{'id':req.params.id}})
        res.redirect('/home')
    })

    app.get('/home/deletar',function(req,res){
        Monitorias.findAll().then(function (monitorias) {
            res.render('deletar',{monitorias:monitorias})
        })
    })

    app.get('/home',function(req,res){
        Monitorias.findAll().then(function (monitorias) {
            res.render('home',{monitorias:monitorias})
        })
    })
    

//Inicializando
    app.listen(3000,function () {
        console.log("Servidor rodando na url 192.168.101.10:3000")
    })
