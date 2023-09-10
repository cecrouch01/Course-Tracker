const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(userpassword){
        return bcrypt.compareSync(userpassword, this.password)
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        },
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
},
{
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData
        }
    },
    sequelize,
    modelName:'users',
    timestamps: false
})

module.exports = User;