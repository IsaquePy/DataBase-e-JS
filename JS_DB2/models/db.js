const Sequelize = require("sequelize")

const sequelize = new Sequelize('teste','root','123456',{
    host:'localhost',
    dialect:'mysql',
    query:{raw:true}
})

module.exports={
    Sequelize:Sequelize,
    sequelize:sequelize
}