var playerIds = {}

function auto_fill_stats(stats) {
    stats.forEach(stat => {
        var current_gt = stat["Player ID"];
        var gtId = playerIds[current_gt];
        for (let [key, value] of Object.entries(stat)) {
            // iterate over each object in the file and input stats
            if (key === "Player ID") {
                continue;
            }
            var statName = key.replace(/\s+/g, '').toLowerCase();
            var id = 'sp_players[4855][' + gtId + '][' + statName + ']';
            console.log(id);
            $("input[name='" + id + "']").val(value)
          }
//        var indexGt = usernames.indexOf(stat["Player ID"]);
//        for (let [key, value] of Object.entries(stat)) {
//            // iterate over each object in the file and input stats
//            if (key === "Player ID") {
//                continue;
//            }
//            var indexStat = titles.indexOf(key);
//            var id = 'form_personAndStatisticsList_' + indexGt + '__cumulativeStatistics_'  + (indexStat - 3) +  '__statTypeValueString'
//            console.log(id);
//            $("#" + id).val(value);
//          }
    });
}

$(document).ready(function () {
    const url = chrome.runtime.getURL('team_stats.json');
    $(".sp-data-table.sp-performance-table tr td:nth-child(3)").each(function(i){
        var text = $(this).text().trim();
        if (text !== "Total") {
            gt = text
            id = $(this).parent().attr("data-player");
            console.log("gt:"+gt+" id:"+id);
            playerIds[gt] = id;
        }
    });
    fetch(url)
        .then((response) => response.json()) //assuming file contains json
        .then((json) => auto_fill_stats(json));

});