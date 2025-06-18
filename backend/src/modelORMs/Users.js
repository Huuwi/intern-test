const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../ORM/orm");

class Users extends Model { }

Users.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nickName: {
        type: DataTypes.STRING(30)
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING(50)
    },
    phone: {
        type: DataTypes.STRING(10)
    },
    avatar: {
        type: DataTypes.STRING(100)
    },
    status: {
        type: DataTypes.ENUM('single', 'married'),
        defaultValue: 'single',
        allowNull: false
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false
});

module.exports = Users;
