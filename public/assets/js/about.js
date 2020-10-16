var currentUserId;

$(document).ready(function(){
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser
    $.get("/api/user_data")
    .then(function(data) {
        $(".member-name").text(data.name);
        currentUserId = data.id;

        console.log(currentUserId)

        if (currentUserId !== undefined) {
            $(".homeButton").attr("href", "members")
            $(".logButton").text("Logout")
            $(".logButton").attr("href", "logout")
        } else {
            $(".homeButton").attr("href", "/")
            $(".logButton").text("Login")
            $(".logButton").attr("href", "login")
        }
    })
    

});
