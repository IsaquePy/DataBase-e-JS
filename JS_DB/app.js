const {Sequelize,DataTypes} = require("sequelize");
const Express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const app = Express();
const port = 3000;

let bd = ""
let nm = ""
let eml = ""
let sxo = ""
let Usuario=''
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

bd = new Sequelize('mysql', 'root', '123456', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

// Rota para receber o request do formulário
app.post('/', (req, res) => {

    nm = req.body.Nome
    eml = req.body.Email
    sxo = req.body.Sexo
    console.log(`Nome : ${nm} \nEmail : ${eml} \nSexo : ${sxo}\n--------------`);

    if (nm!="") {

        bd.authenticate()
            .then(() => {
                console.log("Conectado!!");
            })
            .catch((erro) => {
                console.log("Falha: " + erro);
            });
        
        
        Usuario = bd.define('Teste', {
            nome: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            sexo: {
                type: DataTypes.STRING
            }
        });
        
        
        bd.sync()
            .then(() => {
                console.log("Tabela sincronizada");
                return Usuario.create({
                    nome: nm,
                    email: eml,
                    sexo: sxo
                });
            }).catch(error => {
                console.error("Erro:", error);
            })
            
    }
});

app.get('/dados' , async(req,res)=>{
    async function TodosOsIds() {
        const usuarios = await Usuario.findAll({
            attributes:['id'],
        }) 

        const ids = usuarios.map(usuario=>usuario.id)
        return ids
    }
    let x=''
    async function navariavel() {
        x = await TodosOsIds()
        console.log(`Todos os ids : ${x}`)
    }
    navariavel()
})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

