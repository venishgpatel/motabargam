const mysql = require('mysql');
const { databseIPAddress, databseUserName, databsePassword, databseName } = require('./config.js');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: databseIPAddress,
    user: databseUserName,
    password: databsePassword,
    database: databseName,
    multipleStatements: true
});

module.exports = pool;