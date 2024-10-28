const Sequelize = require("sequelize") // Modulo

//Conexão com o banco de dados!
    const sequelize = new Sequelize('TutorTime','root','123456',{
        host:'localhost',
        dialect:'mysql',
        query:{raw:true}
    }) 

//Exportação do banco de dados!
    module.exports={
        Sequelize:Sequelize,
        sequelize:sequelize
    }