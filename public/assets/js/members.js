var currentUserId;
var userReasons;



$(document).ready(function() {
    //hides the navbar post button when user isn't signed in
    if (currentUserId !== 0) {
        $("#newPostButton").removeClass("hidden");
        $(".logButton").text("Logout")
        $(".logButton").attr("href", "logout")

    } else {
        $("#newPostButton").addClass("hidden");
        $(".logButton").text("Login")
        $(".logButton").attr("href", "login")

    }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.name);
        $(".mobileNavName").text(data.name);
        $(".mobileNavEmail").text(data.email);

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
                    createReasonsBarChart(userPosts, "reasonsBarChart");

                    renderUserPosts(userPosts);
                })
            );
    });
});

function renderUserPosts(userPosts) {

    $("#carousel-text").text(userPosts[0].gratitude);
    $("#carousel-text2").text(userPosts[1].gratitude);
    $("#carousel-text3").text(userPosts[2].gratitude);


    var table = $(".postTable")
    for (let i = 0; i < 5; i++) {
        const post = userPosts[i];
        var tableRow = $("<tr>")
        console.log(post)
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
}