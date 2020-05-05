var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dataBaseConnetion = require("./modules/dataBaseConnection");



var connection = dataBaseConnetion.getConnetion();
connection.connect();

connection.query('SELECT * from JOBS', function (err, rows, fields) {
    if (err) throw err;
    // console.log('The solution is: ', rows);
    console.log(JSON.parse(JSON.stringify(rows)));
});

connection.end();

// $query = 'SELECT * from JOBS';
// connection.query($query, function(err, rows, fields) {
//     if(err){
//         console.log("An error ocurred performing the query.");
//         return;
//     }
//     console.log("Query succesfully executed: ", rows);
// });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.get('/', function (req, resp) {
    console.log("/////");
    resp.render('index', {title: "FIRST page"});
});

app.get('/main', function (req, resp) {
    resp.render('main', {title: "SECOND page"});
});

app.get('/back', function (req, resp) {
    resp.render('index', {title: "FIRST page"});
});

app.get('/ajax', function (req, resp) {
    resp.json({text: 'text'});
});

app.get('/getUsers', function (req, resp) {
    resp.json({
        responseUsers: {
            users:
                {name: 'lesha', age: '22'},
        }
    });
});

app.get('/register', function (req, resp) {
    console.log('Registration success');
    var firstName = req.query.firstNameIP;
    var lastName = req.query.lastNameIP;
    var age = req.query.ageIP;
    console.log(firstName + ' ' + lastName + ' ' + age);
    resp.render('index', {text: 'text'});
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
