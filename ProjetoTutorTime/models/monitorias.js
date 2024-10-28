const db =require ('./db')

const Monitorias = db.sequelize.define('monitorias',{
    //             Nome
    Materia:{
        type:db.Sequelize.STRING
    },
    //            Descrição
    Descricao:{
        type:db.Sequelize.STRING
    },
    //           Professor
    Professor:{
        type:db.Sequelize.STRING
    },
    //           Horário
    Horario:{
        type:db.Sequelize.STRING
    }
})

module.exports=Monitorias