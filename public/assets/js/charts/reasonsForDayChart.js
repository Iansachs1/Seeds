function getPostsByDayQuality (userPosts, dayQuality) {
    var postsByDayQuality = userPosts.filter(post => post.day_quality === dayQuality)
    return postsByDayQuality;
}

function countReasons(dayQualities) {
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


function getReasons(postsByDayQuality) {
    var dayQualities = [];
    for (let i = 0; i < postsByDayQuality.length; i++) {
        const postDayQuality = postsByDayQuality[i].reason

        dayQualities.push(postDayQuality);
    }
    return dayQualities;
}

function createReasonsForDayChart (userPosts, dayQuality, chartId) {

}