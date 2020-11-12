import { PullRequest } from './PullRequest';

declare global {
	interface Window {
		pullRequest: any;
	}
}

import { PullRequestPage } from './PullRequestPage';
import { PullRequestItem } from './PullRequestItem';

const checkCodeReviewLoadedAndInitialize = window.setInterval(() => {
	if (PullRequestPage.codeReviewLoaded()) {
		window.clearInterval(checkCodeReviewLoadedAndInitialize);
		window.pullRequest = new PullRequest();
		document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').forEach((item: Element) => {
			const link = item.getAttribute('href');
			if (link !== null) {
				const filePath = PullRequestPage.getFilePathFromOverviewItemUrl(link);
				const prItem = new PullRequestItem(window.pullRequest, filePath);
				window.pullRequest.addItem(filePath, prItem);
			}
		});

		/*window.addEventListener("scroll", () => {
				window.pullRequest.syncState();
			}, {passive: true});*/

		/*const syncStateInterval = window.setInterval(() => {
			window.pullRequest.syncState();
			if (PullRequestPage.CodeAndOverviewItemsLoaded()) {
				window.clearInterval(syncStateInterval);
			}
		}, 2500)*/

		window.pullRequest.syncState();

		// @ts-ignore
		document.addEventListener('scroll', syncState);

		let debounce_timer: number | undefined;
		function syncState() {
			if (debounce_timer) {
				window.clearTimeout(debounce_timer);
			}

			debounce_timer = window.setTimeout(function () {
				console.log('sync state with localstorage');
				window.pullRequest.syncState();

				if (PullRequestPage.CodeAndOverviewItemsLoaded()) {
					console.log('code and overview items are loaded remove eventListener');
					document.removeEventListener('scroll', syncState);
				}
			}, 300);
		}
	}
}, 1000);
