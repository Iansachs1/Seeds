$(document).ready(function(){
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    $("#reasons").hide();

});


$(".day_quality").on("click", reasonsChoices);   function reasonsChoices(){
    $("#reasons").show();
    $("#dayQuality").hide();
    // console.log((`${this}`))
    console.log($(this).attr("id"))
};



