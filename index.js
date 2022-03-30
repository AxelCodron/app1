const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const app = express()
const port = 3000

const cookieParser = require('cookie-parser');


const {flashMiddleware} = require('./lib/middleware.js');
//const newsMiddleware = require('./lib/middleware')
//var flash = require('connect-flash');
const home = require('./routes/home')
const animals = require('./routes/animals')
const connectionString = 'mongodb://127.0.0.1:27017/SS2022'


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(session(
  {secret: "is that a secret???", 
  cookie: { maxage: 6000},
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser("Yummy"));
//app.use(newsMiddleware)
app.use(flashMiddleware);
//app.use(flash());
app.use('/', home)
app.use('/animals', animals)



// set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
  catch(error => {
    console.log('Database connection refused' + error);
    process.exit(2);
  })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});



// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})