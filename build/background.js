chrome.webNavigation.onHistoryStateUpdated.addListener(
	function () {
		chrome.tabs.executeScript(null, { file: 'bb-pr-markfilesreviewed.js' });
		chrome.tabs.insertCSS(null, { file: 'styles.css' });
	},
	{ url: [{ hostEquals: 'bitbucket.org', pathContains: 'pull-requests' }] }
);
