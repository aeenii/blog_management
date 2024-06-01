const { DataTypes } = require('sequelize');
const db = require('../db');
const commentModel = require('./commentModel');
const sequelize = db.sequelize
const blogModel = sequelize.define("blogs", {
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull:false,
    }, 
    content: {
        type: DataTypes.STRING,
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

blogModel.hasMany(commentModel, {
    as: "comments",
    onDelete: "cascade",
    foreignKey: "blogId",
  });
  
  commentModel.belongsTo(blogModel, {
    as: "blogData",
    onDelete: "cascade",
    foreignKey: "blogId",
  });

sequelize.sync()
module.exports = blogModel
