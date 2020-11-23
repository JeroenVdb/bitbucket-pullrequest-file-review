import { PullRequestPage } from './PullRequestPage';

export interface OverviewItemElement extends HTMLElement {}

export class OverviewItem {
	domElement: OverviewItemElement;
	foobar: string;


	constructor(filePath: string) {
		const overviewItemElement = PullRequestPage.getOverviewItemElement(filePath);

		if (overviewItemElement === null) {
			throw new Error(`No overview item found for file ${filePath}`);
		}

		this.domElement = overviewItemElement;
		this.foobar = 'hello!';
	}

	markReviewed() {
		this.domElement.classList.add('js-mark-reviewed');
	}

	setReviewed() {
		this.domElement.classList.add('js-mark-reviewed');
	}
}
