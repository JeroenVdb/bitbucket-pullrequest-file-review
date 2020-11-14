chrome.webNavigation.onHistoryStateUpdated.addListener(function () {
  chrome.tabs.executeScript(null, { file: 'bb-pr-markfilesreviewed.js' });
}, {url: [{hostEquals: 'bitbucket.org', pathContains : 'pull-requests'}]});
