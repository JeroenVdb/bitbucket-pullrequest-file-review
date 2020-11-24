import { PullRequestPage } from './PullRequestPage';

export interface OverviewItemElement extends HTMLElement {}

export class OverviewItem {
	domElement: OverviewItemElement;

	constructor(overviewItemElement: OverviewItemElement) {
		this.domElement = overviewItemElement;
	}

	markReviewed() {
		this.domElement.classList.add('js-mark-reviewed');
	}

	setReviewed() {
		this.domElement.classList.add('js-mark-reviewed');
	}

	static createOverviewItem(filePath: string) {
		const overviewItemElement = PullRequestPage.getOverviewItemElement(filePath);

		if (overviewItemElement === null) {
			console.log(`No overview item found for file ${filePath}`);
			return null;
		} else {
			return new this(overviewItemElement);
		}
	}
}
