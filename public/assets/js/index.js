$(document).ready(function() {
    var login = $("#login")
    var signup = $("#signup")
    var newpost = $("#newpost")
    
    login.click(function() {
        window.location.href='/login';
      });
    
    signup.click(function() {
        window.location.href='/signup'
    })

    newpost.click(function() {
        window.location.href='/posts'
    })
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser
});