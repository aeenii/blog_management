const { DataTypes } = require('sequelize');
const db = require('../db')
const sequelize = db.sequelize
const commentModel = sequelize.define("comment", {
    id:  {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    blogId:{
        type:DataTypes.NUMBER,
        allowNull:false,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    deletedAt:{
        type: DataTypes.DATE,
        defaultValue: null,
    }
})
sequelize.sync()
module.exports = commentModel
