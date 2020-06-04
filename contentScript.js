function cleanUsernames(usernames) {
    var firstUsername = usernames[0]
    var i;
    for (i = 1; i < usernames.length; i++) {
        if (usernames[i] === firstUsername) {
            break;
        }
    }
    var cleanUsernames = usernames.slice(0, i);
    return cleanUsernames;
}

function auto_fill_stats(stats, usernames, titles) {
    stats.forEach(stat => {
        var indexGt = usernames.indexOf(stat["Player ID"]);
        for (let [key, value] of Object.entries(stat)) {
            // iterate over each object in the file and input stats
            if (key === "Player ID") {
                continue;
            }
            var indexStat = titles.indexOf(key);
            var id = 'form_personAndStatisticsList_' + indexGt + '__cumulativeStatistics_'  + (indexStat - 3) +  '__statTypeValueString'
            console.log(id);
            $("#" + id).val(value);
          }
    });
}

$(document).ready(function () {
    var titles = [];
    var usernames = []

    $("table.width-100 thead.thead-dark-gray tr th").each(function(){
        titles.push($(this).text());
    });

    var elms = $.map($("th[data-label='Name']"), function (el, i) {
        var text = el.innerText;
        var splitText = text.split(" (")
        var username = splitText[0]
        usernames.push(username);
    });
    usernames = cleanUsernames(usernames);
    console.log(usernames);

    const url = chrome.runtime.getURL('team_stats.json');

    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => auto_fill_stats(json, usernames, titles));

});