import { PullRequestPage } from './PullRequestPage';

export interface OverviewItemElement extends HTMLElement {}

export class OverviewItem {
	domElement: OverviewItemElement;

	constructor(filePath: string) {
		const overviewItemElement = PullRequestPage.getOverviewItemElement(filePath);

		if (overviewItemElement === null) {
			throw new Error(`No overview item found for file ${filePath}`);
		}

		this.domElement = overviewItemElement;
	}

	markReviewed() {
		this.domElement.style.background = '#e3fcef';
	}

	setReviewed() {
		this.domElement.style.background = '#e3fcef';
	}
}
