import { OverviewItem } from './OverviewItem';
import { CodeItem } from './CodeItem';
import { PullRequest } from './PullRequest';

export class PullRequestItem {
	pullRequest: PullRequest;
	filePath: string;
	overviewItem: OverviewItem;
	codeItem: CodeItem;

	reviewed: reviewState;

	constructor(pullRequest: PullRequest, filePath: string) {
		this.pullRequest = pullRequest;
		this.filePath = filePath;
		this.overviewItem = new OverviewItem(filePath);
		this.codeItem = new CodeItem(filePath, this);
		this.reviewed = reviewState.NOT_REVIEWED;

		this.codeItem.addControls();
	}

	markReviewed() {
		this.overviewItem.markReviewed();
		this.codeItem.markReviewed();
		this.setAsReviewed();
	}

	setReviewed() {
		this.overviewItem.setReviewed();
		this.codeItem.setReviewed();
		this.setAsReviewed();
	}

	setAsReviewed() {
		this.reviewed = reviewState.REVIEWED;
		this.pullRequest.updateProgress();
	}
}

export enum reviewState {
	'REVIEWED',
	'NOT_REVIEWED',
}
