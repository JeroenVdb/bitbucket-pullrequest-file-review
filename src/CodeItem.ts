import { PullRequestItem } from './PullRequestItem';
import { PullRequestPage } from './repositories/PullRequestPage';

export interface CodeItemElement extends Element {}

export class CodeItem {
	pullRequestItem: PullRequestItem;
	codeItemElement: CodeItemElement;
	codeItemHeaderElement: Element | null;

	constructor(filePath: string, pullRequestItem: PullRequestItem) {
		const codeItemElement = PullRequestPage.getCodeItemElement(filePath);

		if (codeItemElement === null) {
			throw Error(`No code item found for file ${filePath}`);
		}

		this.codeItemElement = codeItemElement;
		this.codeItemHeaderElement = null;
		this.pullRequestItem = pullRequestItem;
	}

	markReviewed() {
		PullRequestPage.closeCodeItem(this.pullRequestItem.filePath);
		this.colorHeader(this.pullRequestItem.filePath);
	}

	setReviewed() {
		this.colorHeader(this.pullRequestItem.filePath);
	}

	private colorHeader(filePath: string) {
		const codeItemHeader = this.getCodeItemHeader(filePath);

		if (codeItemHeader === null) {
			console.log(`code item header for ${filePath} was not yet rendered`);
			return;
		}

		(codeItemHeader as HTMLElement).classList.add('js-mark-reviewed');
	}

	private getCodeItemHeader(filePath: string) {
		let codeItemHeaderElement = null;

		if (this.codeItemHeaderElement) {
			codeItemHeaderElement = this.codeItemHeaderElement;
		} else {
			codeItemHeaderElement = PullRequestPage.getCodeItemHeader(filePath);
			this.codeItemHeaderElement = codeItemHeaderElement;
		}

		return codeItemHeaderElement;
	}

	addControls() {
		PullRequestPage.addActionButton(this.pullRequestItem.filePath, this.reviewButton());
	}

	reviewButton(): Element {
		const button = document.createElement('button');
		button.innerText = 'Reviewed';
		button.setAttribute('style', 'z-index: 500; position: absolute; top: 10px; right: 50px;');
		button.addEventListener('click', () => {
			this.pullRequestItem.markReviewed();
		});
		return button;
	}
}
