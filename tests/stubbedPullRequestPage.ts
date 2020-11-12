const pullRequestPage = document.createElement('div');

const overviewItem = document.createElement('a');
overviewItem.setAttribute('href', '#chg-foo/bar.js');

const overviewItems = document.createElement('div');
overviewItems.setAttribute('id', 'PullRequestWelcomeTourTarget-Files')
overviewItems.append(overviewItem)


const codeItemAnchor = document.createElement('div');
codeItemAnchor.setAttribute('id', 'chg-foo/bar.js');


const codeItemHeaderClickableArea = document.createElement('div');
codeItemHeaderClickableArea.setAttribute('aria-label', 'Expand/collapse file');

const codeItemHeader = document.createElement('div');
codeItemHeader.setAttribute('data-qa', 'bk-file__header');
codeItemHeader.append(codeItemHeaderClickableArea);

const codeItem = document.createElement('article');
codeItem.setAttribute('data-qa', 'pr-diff-file-styles');
codeItem.setAttribute('aria-label', 'Diff of file foo/bar.js');
codeItem.append(codeItemHeader);

pullRequestPage.append(overviewItems, codeItemAnchor, codeItem);

export { pullRequestPage, codeItem, codeItemAnchor, codeItemHeader, overviewItem, overviewItems, codeItemHeaderClickableArea }
