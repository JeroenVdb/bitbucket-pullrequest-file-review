import { PullRequest } from './PullRequest';
import { PullRequestPage } from './PullRequestPage';
import { PullRequestItem } from './PullRequestItem';

declare global {
	interface Window {
		pullRequest: any;
	}
}

console.log('[bb-pr-markfilesreviewed] is loaded');

let pullRequest: PullRequest;

const checkCodeReviewLoadedAndInitialize = window.setInterval(() => {
	if (!PullRequestPage.isPullRequestDetailPage(location.href)) {
		console.log('this is not a pull request detail page, stop everything');
		window.clearInterval(checkCodeReviewLoadedAndInitialize);
	}

	if (PullRequestPage.codeReviewLoaded()) {
		console.log('[bb-pr-markfilesreviewed] pull request is ready to be initiated');

		pullRequest = new PullRequest();
		window.clearInterval(checkCodeReviewLoadedAndInitialize);
		document.querySelectorAll('[id^=chg-]').forEach((item: Element) => {
			const link = item.getAttribute('id');
			if (link !== null) {
				const filePath = PullRequestPage.getFilePathFromAnchorLink(link);
				pullRequest.addItem(
					new PullRequestItem(pullRequest, filePath)
				);
			}
		});

		pullRequest.updateProgress();
		pullRequest.syncState();

		// @ts-ignore
		document.addEventListener('scroll', syncState);

		let debounce_timer: number | undefined;
		function syncState() {
			if (debounce_timer) {
				window.clearTimeout(debounce_timer);
			}

			debounce_timer = window.setTimeout(function () {
				console.log('sync state with localstorage');
				pullRequest.syncState();

				if (PullRequestPage.CodeAndOverviewItemsLoaded()) {
					console.log('code and overview items are loaded remove eventListener');
					document.removeEventListener('scroll', syncState);
				}
			}, 300);
		}
	}
	console.log('[bb-pr-markfilesreviewed] pull request is not loaded enough yet, try again in 1s');
}, 1000);

export { pullRequest }
