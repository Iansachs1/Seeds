var currentUserId;
var userReasons;

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {

    $(".member-name").text(data.name);

    $.get("/api/user_data").then(function (data) {

      $(".member-name").text(data.name);
      currentUserId = data.id

    }).then(
      $.get("/api/reasons").then(function (data) {
        userReasons = data.filter(reason => reason.user_id === currentUserId);

      })).then(
        $.get("/api/posts").then(function (data) {

          var userPosts = data.filter(post => post.user_id === currentUserId);
          console.log(userPosts);
          // if (userPosts.length() < 1) {
          //   $("#dayQualityChart").hide()
          //   $("#goodReasons").hide()
          //   $("#badReasons").hide()
          //   $("#mehReasons").hide()
          // } else {
          createDayQualityChart(userPosts, "dayQualityChart");
          createReasonsForDayChart(userPosts, "good", "goodReasons")
          createReasonsForDayChart(userPosts, "bad", "badReasons")
          createReasonsForDayChart(userPosts, "meh", "mehReasons")
          // }

        }))
  });
});
