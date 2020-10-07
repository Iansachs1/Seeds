$(document).ready(function(){
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser

    $("#reasons").hide();
});

$("#bad").on("click", reasonsChoices);   function reasonsChoices(){
    $("#badDay").show();
    $("#dayQuality").hide();
}