chrome.tabs.executeScript(
    null,                      // Current tab
    { file: "jquery.js" },        // Script to inject
    function () {               // Something to do afterwards
        var checkPageButton = document.getElementById('checkPage');
        checkPageButton.addEventListener('click', function () {
            chrome.tabs.executeScript(null, { file: "contentScript.js" });
        });
    }
);