const path = require("path");

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get('/', function (request, response) {
        response.render('index', {});
    });

    app.get("/signup", function (request, response) {
        // If the user already has an account send them to the members page
        if (request.user) {
            response.redirect("/members");
        }
        response.render('signup', {})
        // res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (request, response) {
        // If the user already has an account send them to the members page
        if (request.user) {
            response.redirect("/members");
        }
        response.render('login', {});
        // res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get('/members', isAuthenticated, function (request, response) {
        // get all body stuff from request.body object
        // get all request parameter stuff from request.params object
        
        // respond with: response.send()
        response.render('members', {});
    });

    app.get('/posts', isAuthenticated, function (request, response) {
        response.render('posts', {});
    });

    app.get('/about', function (request, response) {
        response.render('about', {});
    });
    


};