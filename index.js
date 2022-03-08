const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');
const home = require('./routes/home')
const animals = require('./routes/animals')
const newsMiddleware = require('./lib/middleware')

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("Yummy"));
app.use(newsMiddleware)
app.use('/', home)
app.use('/animals', animals)


// set up handlebars view engine
var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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