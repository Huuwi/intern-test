const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    }
);

async function initDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        setTimeout(async () => {
            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
            } catch (error) {
            }
        }, 2000);
    }
}

initDB();



module.exports = { sequelize };