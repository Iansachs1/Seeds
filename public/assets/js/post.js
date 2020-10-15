var currentUserId = "";
var existingUserReasons = [];

$(document).ready(function() {
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    if (currentUserId !== 0) {
        $("#logButton").text("Logout")
        $("#logButton").attr("href", "logout")

    } else {
        $("#logButton").text("Login")
        $("#logButton").attr("href", "login")

    }

    $("#reasons").hide();
    $("#gratitude").hide();

    $.get("/api/user_data").then(function(data) {
            currentUserId = data.id
            $(".mobileNavName").text(data.name);
            $(".mobileNavEmail").text(data.email);
        })
        .then(
            $.get("/api/reasons").then(function(data) {
                console.log(data);
                // existingUserReasons = 
                var usersReasons = data.filter(reason => reason.user_id === currentUserId);
                existingUserReasons = [...usersReasons];
                // getuserReasons(data);
            }));

});

var newPost = {};
var newReason = {};


function reasonsChoices() {
    newPost = {};
    $("#reasons").show();
    $("#dayQuality").hide();
    // console.log((`${this}`))
    var dayQualityResponse = $(this).attr("id");
    newPost.day_quality = dayQualityResponse;

    switch (dayQualityResponse) {
        case "good":
            $("#genericResponse").text("Awesome! Why was it so good?")
            break;
        case "bad":
            $("#genericResponse").text("That's okay! Why was it bad?")
            break;
        case "meh":
            $("#genericResponse").text("What caused your day to be meh?")
            break;
        default:
            break;
    };
};

function gratitudeQuery() {
    $("#reasons").hide();
    $("#gratitude").show();

    var reasonResponse = $(this).attr("id");
    console.log(reasonResponse);
    newPost.reason = reasonResponse;
    // newReason.reason = reasonResponse;
}

function gratitudeSubmit() {
    var gratitudeResponse = $("#gratitudeResponse").val().trim();
    newPost.gratitude = gratitudeResponse;
    console.log(newPost);
    submitNewPost(newPost.day_quality, newPost.gratitude, newPost.reason, currentUserId);

}

function submitNewPost(dayQuality, gratitude, reason, userId) {
    $.post("/api/post", {
            day_quality: dayQuality,
            gratitude: gratitude,
            reason: reason,
            user_id: userId
        })
        .then(submitNewReason(newReason.reason, currentUserId))
        .then(function() {
            location.href = "/members";
        })
        .catch(function(err) {
            console.log(err);
        });
}

function submitNewReason(reason, userId) {
    $.post("/api/reason", {
            reason: reason,
            user_id: userId,
        })
        .catch(function(err) {
            console.log(err);
        });
}

function countCharacters() {
    // setup some variables 
    var textEntered, countRemaining, counter;
    // get the number of characters in the tweet box 
    textEntered = document.getElementById("gratitudeResponse").value;
    // number left = number of characters - our maximum (140) 
    counter = (255 - (textEntered.length));
    // access the div for characters remaining 
    countRemaining = document.getElementById('charactersRemaining');
    // put the number of characters left into that div! 
    countRemaining.textContent = counter;
}

$("#gratitudeResponse").keydown(countCharacters);

$(".day_quality").on("click", reasonsChoices)
$(".reasonSelected").on("click", gratitudeQuery)
$("#gratitudeSubmit").on("click", gratitudeSubmit)