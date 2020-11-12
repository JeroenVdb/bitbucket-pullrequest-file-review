import { CodeItemElement } from './CodeItem';
import { OverviewItemElement } from './OverviewItem';

export class PullRequestPage {
	static getOverviewItemElement(filePath: string): OverviewItemElement | null {
		return document.querySelector(`a[href="#chg-${filePath}"]`);
	}

	static getCodeItemAnchorElement(filePath: string): CodeItemElement | null {
		return document.getElementById(`chg-${filePath}`);
	}

	static getCodeItemElement(filePath: string): CodeItemElement | null {
		const anchorElement = PullRequestPage.getCodeItemAnchorElement(filePath);

		if (anchorElement === null) {
			return null;
		}

		return anchorElement.nextElementSibling;
	}

	static closeCodeItem(filePath: string) {
		const clickableCodeItemHeader = document.querySelector(
			`[aria-label="Diff of file ${filePath}"] [aria-label="Expand/collapse file"]`
		) as HTMLElement;

		if (clickableCodeItemHeader === null) {
			console.log(`codeItem header for ${filePath} was not yet rendered`);
		}

		clickableCodeItemHeader.click();
	}

	static getCodeItemHeader(filePath: string) {
		return document.querySelector(`[aria-label="Diff of file ${filePath}"] [data-qa="bk-file__header"]`);
	}

	static addActionButton(filePath: string, button: Element) {
		const codeItemAnchorElement = PullRequestPage.getCodeItemAnchorElement(filePath);
		if (codeItemAnchorElement) {
			codeItemAnchorElement.insertAdjacentElement('afterend', button);
		} else {
			throw new Error(`Could not get anchor for ${filePath}`);
		}
	}

	static codeReviewLoaded(): boolean {
		return (
			document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').length > 0 &&
			document.querySelectorAll('[data-qa="pr-diff-file-styles"]').length > 0
		);
	}

	static CodeAndOverviewItemsLoaded(): boolean {
		return (
			document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').length ===
			document.querySelectorAll('[data-qa="pr-diff-file-styles"]').length
		);
	}

	static getLocalStorageKey() {
		const path = location.pathname.split('/'); // /persgroep/temptation-editor/pull-requests/176
		return `${path[1]}/${path[2]}/${path[4]}:diffs-expanded-state`;
	}

	static addReviewProgress() {
		document
			.querySelector('#PullRequestWelcomeTourTarget-Files')!
			.parentElement!.insertAdjacentHTML('beforebegin', PullRequestPage.reviewProgressHTML());
		return document.querySelector('.fjs-text');
	}

	static reviewProgressHTML() {
		return `
			<div class="css-1z0at8b e8f23vi6" style="z-index: 8;">
				<section aria-label="Build statuses" class="css-gjnwqt e1m6l9kn0">
					<button aria-controls="expanderId-0" aria-expanded="true" data-testid="" class="css-1o91c15 e1m6l9kn1"><span class="css-1b5prcp e1m6l9kn4"><span class="sc-htpNat dcTkON" role="img" aria-label="Merge checks"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><rect x="10" y="15" width="8" height="2" rx="1"></rect><rect x="6" y="15" width="2" height="2" rx="1"></rect><rect x="10" y="11" width="8" height="2" rx="1"></rect><rect x="6" y="11" width="2" height="2" rx="1"></rect><rect x="10" y="7" width="8" height="2" rx="1"></rect><rect x="6" y="7" width="2" height="2" rx="1"></rect></g></svg></span></span><span class="css-1q27zj9 e1m6l9kn2"><div><span class="fjs-text"></span></span></div></span></button>
					<div id="expanderId-22" aria-hidden="false" class="rah-static rah-static--height-auto" style="height: auto; overflow: visible;">
						<div>
							<div class="css-1hxpyht e1m6l9kn3"><div class="css-vjkoi3 e11gw9gu2">
								<!-- empty -->
							</div>
						</div>
					</div>
				</section>
			</div>`;
	}

	static getFilePathFromOverviewItemUrl(url: string) {
		return url.substr(url.indexOf('chg-') + 4);
	}
}
