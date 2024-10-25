const Sequelize = require("sequelize");
const Express = require('express')
const bodyParser = require('body-parser');
const path = require('path');

const app = Express();
const port = 3000;
let inputValue = ""
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para servir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para receber o request do formulário
app.post('/', (req, res) => {
    inputValue = req.body.inputName; // "inputName" deve ser o nome do seu input no HTML
    console.log(inputValue);
    if (inputValue!="") {
        const bd = new Sequelize('mysql', 'isaq', '123456', {
            host: "localhost",
            dialect: "mysql",
            port: 3306
        });
        
        
        bd.authenticate()
            .then(() => {
                console.log("Conectado!!");
            })
            .catch((erro) => {
                console.log("Falha: " + erro);
            });
        
        
        const Usuario = bd.define('Teste', {
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sexo: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
        
        
        bd.sync()
            .then(() => {
                console.log("Tabela sincronizada");
                return Usuario.create({
                    nome: inputValue,
                    email: 'teste@email.com',
                    sexo: "Masculino"
                });
            }).catch(error => {
                console.error("Erro:", error);
            })
            
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

