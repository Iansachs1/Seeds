function countDayQualities(dayQualities) {
    var numberOfGoodDays = 0;
    var numberOfBadDays = 0;
    var numberOfMehDays = 0;

    for (let i = 0; i < dayQualities.length; i++) {
        const dayQuality = dayQualities[i];

        if (dayQuality === "good") {
            numberOfGoodDays++;
        } else if (dayQuality === "bad") {
            numberOfBadDays++;
        } else if (dayQuality === "meh") {
            numberOfMehDays++;
        }
    }
    //determines how many days you've logged
    $("#totalSubmissions").text(dayQualities.length);
    //determines percent of good days vs bad
    var a = parseInt(numberOfGoodDays);
    var b = parseInt(numberOfBadDays);
    var calc = parseInt(Math.round((a / (a + b)) * 100));
    if (dayQualities.length == 0) {
        $("#totalGoodDayCalc").text("0");
    } else {
        $("#totalGoodDayCalc").text(calc + "%");
    }

    //checks to see if inputs are blank. If yes then the chart will not be displayed on members page
    if (numberOfGoodDays !== 0) {
        $("#goodReasonsDiv").removeClass("hidden");
    } else {
        $("#goodReasonsDiv").addClass("hidden");
    }
    if (numberOfBadDays !== 0) {
        $("#badReasonsDiv").removeClass("hidden");
    } else {
        $("#badReasonsDiv").addClass("hidden");
    }
    if (numberOfMehDays !== 0) {
        $("#mehReasonsDiv").removeClass("hidden");
    } else {
        $("#mehReasonsDiv").addClass("hidden");
    }

    //determines how many good days have occurred in a row
    const reversedDayQualities = dayQualities.reverse();
    var counter = 0;
    var i = 0;
    while (reversedDayQualities[i] === "good") {
        counter++;
        i++;
    }
    console.log(counter);
    $("#totalGoodDayStreak").text(counter);
    return [numberOfGoodDays, numberOfBadDays, numberOfMehDays];
}

function getDayQualities(posts) {
    var dayQualities = [];
    for (let i = 0; i < posts.length; i++) {
        const postDayQuality = posts[i].day_quality;

        dayQualities.push(postDayQuality);
    }
    return dayQualities;
}

function createDayQualityChart(userPosts, chartId) {
    var dayQualityData = countDayQualities(getDayQualities(userPosts));

    if (
        dayQualityData[0] == 0 &&
        dayQualityData[1] == 0 &&
        dayQualityData[2] == 0
    ) {
        $("#" + chartId).hide();
        console.log("working");
    } else {
        var data = {
            labels: ["Good Day", "Bad Day", "Meh Day"],
            datasets: [{
                data: dayQualityData,
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            }, ],
        };

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
}