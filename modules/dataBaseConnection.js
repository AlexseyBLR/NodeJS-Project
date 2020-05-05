var mysql = require('mysql');

const HOST_PROP = 'mySql.host';
const PORT_PROP = 'mySql.port';
const USER_PROP = 'mySql.user';
const PASSWORD_PROP = 'mySql.password';
const DATABASE_PROP = 'mySql.database';

var propertiesReader = require('properties-reader');
var properties = propertiesReader('./public/properties/appProperties.properties');

var host = properties.get(HOST_PROP);
var port = properties.get(PORT_PROP);
var user = properties.get(USER_PROP);
var password = properties.get(PASSWORD_PROP);
var database = properties.get(DATABASE_PROP);

var connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});

function getConnetion(){
    console.log('Connection params: '+'\n'+
    '\t'+'host: '+host+'\n'+
    '\t'+'port: '+port+'\n'+
    '\t'+'darabase: '+database);
    return connection;
}

module.exports = {getConnetion};