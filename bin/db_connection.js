require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST_IP_ADDRESS,
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true
});
/*
pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected!");

    if (connection) connection.release();

    return;
});
*/
module.exports = pool;