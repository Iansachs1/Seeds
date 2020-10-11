var currentUserId;
var userReasons;

$(document).ready(function() {
    //hides the navbar post button when user isn't signed in
    if (currentUserId !== 0) {
        $("#newPostButton").removeClass("hidden");
    } else {
        $("#newPostButton").addClass("hidden");
    }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.name);

        $.get("/api/user_data")
            .then(function(data) {
                $(".member-name").text(data.name);
                currentUserId = data.id;
            })
            .then(
                $.get("/api/reasons").then(function(data) {
                    userReasons = data.filter(
                        (reason) => reason.user_id === currentUserId
                    );
                })
            )
            .then(
                $.get("/api/posts").then(function(data) {
                    var userPosts = data.filter((post) => post.user_id === currentUserId);
                    console.log(userPosts);

                    createDayQualityChart(userPosts, "dayQualityChart");
                    createReasonsForDayChart(userPosts, "good", "goodReasons");
                    createReasonsForDayChart(userPosts, "bad", "badReasons");
                    createReasonsForDayChart(userPosts, "meh", "mehReasons");
                })
            );
    });
});