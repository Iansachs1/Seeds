var currentUserId = "";
var existingUserReasons = [];

$(document).ready(function () {
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    $("#reasons").hide();
    $("#gratitude").hide();

    $.get("/api/user_data").then(function (data) {
        currentUserId = data.id
    })
    .then(
        $.get("/api/reasons").then(function (data) {
            console.log(data);
            // existingUserReasons = 
            var usersReasons = data.filter(reason => reason.user_id === currentUserId);
            existingUserReasons = [...usersReasons];
            // getuserReasons(data);
        })
    );
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
            $("#genericResponse").text("What caused your day to be good?")
            break;
        case "bad":
            $("#genericResponse").text("What caused your day to be bad?")
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
    newReason.reason = reasonResponse;
}

function gratitudeSubmit() {
    var gratitudeResponse = $("#gratitudeResponse").val().trim();
    newPost.gratitude = gratitudeResponse;

    submitNewPost(newPost.day_quality, newPost.gratitude, currentUserId);

}

function submitNewPost (dayQuality, gratitude, userId) {
    $.post("/api/post", {
        day_quality: dayQuality,
        gratitude: gratitude,
        user_id: userId
    })
    .then(submitNewReason(newReason.reason, currentUserId))
    .then(function () {
        location.href = "/members";
    })
    .catch(function (err) {
            console.log(err);
        });
}

function submitNewReason (reason, userId) {
    $.post("/api/reason", {
        reason: reason,
        user_id: userId
    })
    .catch(function (err) {
        console.log(err);
    });
}



$(".day_quality").on("click", reasonsChoices)
$(".reasonSelected").on("click", gratitudeQuery)
$("#gratitudeSubmit").on("click", gratitudeSubmit)

