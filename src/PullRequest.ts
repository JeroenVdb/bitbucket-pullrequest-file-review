import { PullRequestItem, reviewState } from './PullRequestItem';
import { PullRequestPage } from './PullRequestPage';

export class PullRequest {
	files: Map<string, PullRequestItem>;
	reviewProgressBox: Element | null;

	constructor() {
		this.files = new Map();
		this.reviewProgressBox = PullRequestPage.addReviewProgress();
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
			this.reviewProgressBox.innerHTML = `<span class="css-in3yi3 e10navn00"><span>${this.numberOfReviewedFiles()} of ${this.numberOfFiles()}</span></span> <span>files reviewed</span>`;
		}
	}

	getState(): pullRequestState {
		return JSON.parse(window.localStorage.getItem(PullRequestPage.getLocalStorageKey()) || '{}');
	}

	syncState() {
		const state = this.getState();
		for (const [filePath, isExpanded] of Object.entries(state)) {
			if (isExpanded === false) {
				const file = this.files.get(filePath);
				if (file) {
					file.setReviewed();
				}
			}
		}
	}
}

type pullRequestState = { [key: string]: boolean }
