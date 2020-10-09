$(document).ready(function () {
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    $("#reasons").hide();
    $("#gratitude").hide();

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

    console.log(newPost);
    console.log(newReason);
}




    
$(".day_quality").on("click", reasonsChoices)
$(".reasonSelected").on("click", gratitudeQuery)
$("#gratitudeSubmit").on("click", gratitudeSubmit)

