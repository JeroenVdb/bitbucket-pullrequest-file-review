chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
  chrome.tabs.executeScript(null,{file:"bitbucket-pr-file-review.js"});
});
