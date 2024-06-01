const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME || 'blog_management', process.env.DB_USER || 'root', process.env.DB_PASSWORD ||'Avani@2001', {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging:true
});
(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;