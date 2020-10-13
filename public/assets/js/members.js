var currentUserId;
var userReasons;

$(document).ready(function () {
    //hides the navbar post button when user isn't signed in
    if (currentUserId !== 0) {
        $("#newPostButton").removeClass("hidden");
    } else {
        $("#newPostButton").addClass("hidden");
    }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.name);

        $.get("/api/user_data")
            .then(function (data) {
                $(".member-name").text(data.name);
                currentUserId = data.id;
            })
            .then(
                $.get("/api/reasons").then(function (data) {
                    userReasons = data.filter(
                        (reason) => reason.user_id === currentUserId
                    );
                })
            )
            .then(
                $.get("/api/posts").then(function (data) {
                    var userPosts = data.filter((post) => post.user_id === currentUserId);
                    console.log(userPosts);

                    createDayQualityChart(userPosts, "dayQualityChart");
                    createReasonsForDayChart(userPosts, "good", "goodReasons");
                    createReasonsForDayChart(userPosts, "bad", "badReasons");
                    createReasonsForDayChart(userPosts, "meh", "mehReasons");

                    renderUserPosts(userPosts);
                })
            );
    });
});

function renderUserPosts(userPosts) {


    var table = $(".postTable")
    for (let i = 0; i < userPosts.length; i++) {
        const post = userPosts[i];
        var tableRow = $("<tr>")

        var date = post.createdAt;
        var shortdate = date.substring(0, 10);
        

        var tableValue = `
    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        ${shortdate}
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        ${post.day_quality}
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        ${post.reason}
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        ${post.gratitude}
    </td>
    <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
    </td>`

        tableRow.html(tableValue);

        table.append(tableRow);


    }

    $("#carousel-text").text(`You should always try to remember something to be grateful for: ` + userPosts[6].gratitude);
    $("#carousel-text2").text(`You should always try to remember something to be grateful for: ` + userPosts[7].gratitude);
    $("#carousel-text3").text(`You should always try to remember something to be grateful for: ` + userPosts[8].gratitude);
}


