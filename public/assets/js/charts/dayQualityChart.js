
function countDayQualities(dayQualities) {
    var numberOfGoodDays = 0;
    var numberOfBadDays = 0;
    var numberOfMehDays = 0;

    for (let i = 0; i < dayQualities.length; i++) {
        const dayQuality = dayQualities[i];

        if (dayQuality === "good") {
            numberOfGoodDays++
        } else if (dayQuality === "bad") {
            numberOfBadDays++
        } else if (dayQuality === "meh") {
            numberOfMehDays++
        }
    }
    return [ numberOfGoodDays, numberOfBadDays, numberOfMehDays ];
}


function getDayQualities(posts) {
    var dayQualities = [];
    for (let i = 0; i < posts.length; i++) {
        const postDayQuality = posts[i].day_quality

        dayQualities.push(postDayQuality);
    }
    return dayQualities;
}

function createDayQualityChart(userPosts, chartId) {

    var dayQualityData = countDayQualities(getDayQualities(userPosts));

    var data = {
        labels: ["Good Day", "Bad Day", "Meh Day"],
        datasets: [{
            data: dayQualityData,
            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        },],
    };

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var text = "75%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    });

    var chart = new Chart(document.getElementById(chartId), {
        type: "doughnut",
        data: data,
        options: {
            responsive: true,
            legend: {
                display: false,
            },
        },
    });
}




// $(document).ready(function () {
//     // This file just does a GET request to figure out which user is logged in
//     // and updates the HTML on the page
//     $.get("/api/user_data").then(function (data) {

//         $(".member-name").text(data.name);  

    // }).then(
    //   $.get("/api/reasons").then(function (data) {
    //     // existingUserReasons =     
    //     var usersReasons = data.filter(reason => reason.user_id === currentUserId);
    //     userReasons = [...usersReasons];
    //     console.log(userReasons);
    //     // getuserReasons(data);

    //   })).then(
    //     $.get("/api/posts").then(function (data) {

    //       // console.log(data);    
    //       var userPosts = data.filter(post => post.user_id === currentUserId);
    //       userPosts = [...userPosts];  
    //       console.log(userPosts);  

    //       getDayQualities(userPosts, postDayQualities);
    //     })
    //     .then(function () {
    //         countDayQualities();    
    //         console.log(numberOfGoodDays);


    //     }))



    // });




