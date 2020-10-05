module.exports = function (app) {
    
    app.get('/', function(request, response) {
        response.render('index', {});
    });

    app.get('/log', function(request, response) {
        response.render('log', {});
    });

};