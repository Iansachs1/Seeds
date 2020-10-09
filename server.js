const express = require('express');
const session = require("express-session");
const expressHandlebars = require('express-handlebars');
const passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;

var db = require("./models");

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./controllers/view-routes')(app);
require('./controllers/api-routes')(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });