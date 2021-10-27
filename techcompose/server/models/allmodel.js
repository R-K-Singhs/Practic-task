const sequelize = require("../database");
const DataTypes  =require("sequelize").DataTypes

const user =(sequelize)=>{
    return sequelize.define('user', {
        // Model attributes are defined here
        username: {
          type: DataTypes.STRING,
          allowNull: false

        },
        password: {
          type: DataTypes.STRING
          
        },
        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        }
    } )
}



const business =(sequelize)=>{
    return sequelize.define('business', {

        business_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        
        },
        name: {
          type: DataTypes.STRING
        }
    })
}


const models=(sequelize)=>{
  const businesses =business(sequelize);
   const users= user(sequelize);
   
    // sequelize.sync({ force: true });

    return({
      businesses,users
    })


}

module.exports =models(sequelize);


