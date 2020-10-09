$(document).ready(function(){
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    $("#reasons").hide();

});

$(".day_quality").on("click", reasonsChoices);   function reasonsChoices(){
    $("#reasons").show();
    $("#dayQuality").hide();
    // console.log((`${this}`))
    var dayQualityResponse = $(this).attr("id");
    
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
    }
};
