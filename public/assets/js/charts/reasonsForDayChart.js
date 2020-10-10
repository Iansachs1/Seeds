
function getPostsByDayQuality(userPosts, dayQuality) {

    var postsByDayQuality = userPosts.filter(post => post.day_quality === dayQuality)
    return postsByDayQuality;
}

function countReasons(reasons) {
    var workCount = 0;
    var familyCount = 0;
    var friendsCount = 0;
    var schoolCount = 0;
    var relationshipCount = 0;
    var healthCount = 0;
    var otherCount = 0;

    for (let i = 0; i < reasons.length; i++) {
        const dayQuality = reasons[i];

        if (dayQuality === "Work") {
            workCount++
        } else if (dayQuality === "Family") {
            familyCount++
        } else if (dayQuality === "Friends") {
            friendsCount++
        } else if (dayQuality === "School") {
            schoolCount++
        } else if (dayQuality === "Relationship") {
            relationshipCount++
        } else if (dayQuality === "Health") {
            healthCount++
        } else if (dayQuality === "Other") {
            otherCount++
        }
    }
    return [workCount, familyCount, friendsCount, schoolCount, relationshipCount, healthCount, otherCount];
}


function getReasons(postsByDayQuality) {
    var reasons = [];
    for (let i = 0; i < postsByDayQuality.length; i++) {
        const postReason = postsByDayQuality[i].reason

        reasons.push(postReason);
    }
    return reasons;
}

function createReasonsForDayChart(userPosts, dayQuality, chartId) {
    var reasonsData = countReasons(getReasons(getPostsByDayQuality(userPosts, dayQuality)));

    if (reasonsData[0] == 0 && 
        reasonsData[1] == 0 && 
        reasonsData[2] == 0 &&
        reasonsData[3] == 0 &&
        reasonsData[4] == 0 &&
        reasonsData[5] == 0 &&
        reasonsData[6] == 0
        ) {
        $("#" + chartId).hide();
        console.log("working");
    } else {

        var data = {
            labels: ["Work", "Family", "Friends", "School", "Relationship", "Health", "Other"],
            datasets: [{
                data: reasonsData,
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#36A200", "#FF1184", "#FF2256", "#3633EB"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#36A200", "#FF1184", "#FF2256", "#3633EB"],
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
}