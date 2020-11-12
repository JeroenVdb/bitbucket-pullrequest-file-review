import { PullRequest } from './PullRequest';
import { PullRequestPage } from './PullRequestPage';
import { PullRequestItem } from './PullRequestItem';

declare global {
	interface Window {
		pullRequest: any;
	}
}

console.log('[bitbucket-pr-files-review] is loaded');

const checkCodeReviewLoadedAndInitialize = window.setInterval(() => {
	if (PullRequestPage.codeReviewLoaded()) {
		console.log('[bitbucket-pr-files-review] pull request is ready to be initiated');

		window.clearInterval(checkCodeReviewLoadedAndInitialize);
		window.pullRequest = new PullRequest();
		document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').forEach((item: Element) => {
			const link = item.getAttribute('href');
			if (link !== null) {
				const filePath = PullRequestPage.getFilePathFromOverviewItemUrl(link);
				window.pullRequest.addItem(
					new PullRequestItem(window.pullRequest, filePath)
				);
			}
		});

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
	console.log('[bitbucket-pr-files-review] pull request is not loaded enough yet, try again in 1s');
}, 1000);
