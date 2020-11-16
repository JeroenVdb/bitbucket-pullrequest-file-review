import { PullRequestItem, reviewState } from './PullRequestItem';
import { PullRequestPage } from './PullRequestPage';

export class PullRequest {
	files: Map<string, PullRequestItem>;
	reviewProgressBox: HTMLElement | null;
	progressBar: HTMLElement | null;
	state: pullRequestState | null;

	constructor() {
		this.files = new Map();
		[this.reviewProgressBox, this.progressBar] = PullRequestPage.addReviewProgress();
		this.state = null;
	}

	addItem(item: PullRequestItem) {
		this.files.set(item.filePath, item);
	}

	numberOfFiles(): number {
		return this.files.size;
	}

	numberOfReviewedFiles(): number {
		let filesReviewed = 0;
		for (const file of this.files.values()) {
			if (file.reviewed === reviewState.REVIEWED) {
				filesReviewed++;
			}
		}
		return filesReviewed;
	}

	updateProgress() {
		if (this.reviewProgressBox) {
			this.reviewProgressBox.innerText = `${this.numberOfReviewedFiles()} of ${this.numberOfFiles()}`;
		}

		if (this.progressBar) {
			this.progressBar.style.setProperty('--progress', this.progressToPercent() + '%')
		}
	}

	progressToPercent() {
		if (this.numberOfReviewedFiles() === 0) {
			return '0';
		}

		return (this.numberOfReviewedFiles() / this.numberOfFiles()) * 100;
	}

	getState(): pullRequestState {
		if (this.state === null) {
			this.state = <pullRequestState>JSON.parse(window.localStorage.getItem(PullRequestPage.getLocalStorageKey()) || '{}');
		}

		return this.state;
	}

	syncState() {
		const state = this.getState();
		for (const [filePath, isExpanded] of Object.entries(state)) {
			const isCollapsed = !isExpanded;
			if (isCollapsed) {
				const file = this.files.get(filePath);
				if (file) {
					file.setReviewed();
				}
			}
		}
	}
}

type pullRequestState = { [key: string]: boolean };
