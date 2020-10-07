module.exports = function (app) {
    
    app.get('/', function(request, response) {
        response.render('index', {});
    });

    app.get('/posts', function(request, response) {
        response.render('posts', {});
    });

};