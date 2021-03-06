import {PullRequestPage} from "../src/PullRequestPage";

import { codeItem, codeItemAnchor, codeItemHeader, codeItemHeaderClickableArea, overviewItem, pullRequestPage } from './pullRequestPageStubs';

beforeEach(() => {
	document.body.innerHTML = '';
	document.body.append(pullRequestPage);
});

describe('PullRequestPage', function () {
	describe('PullRequestPage.getOverviewItemElement', function() {
		it('should return overview item element', function () {
			expect(PullRequestPage.getOverviewItemElement('foo/bar.js')).toBe(overviewItem);
		});
	});

	describe('PullRequestPage.getCodeItemAnchorElement', function() {
		it('should return code item anchor element', function () {
			expect(PullRequestPage.getCodeItemAnchorElement('foo/bar.js')).toBe(codeItemAnchor);
		});
	});

	describe('PullRequestPage.getCodeItemElement', function() {
		it('should return code item', function () {
			expect(PullRequestPage.getCodeItemElement('foo/bar.js')).toBe(codeItem);
		});

		it('should return null when the code item header is not available', function () {
			expect(PullRequestPage.getCodeItemElement('foo/other-bar.js')).toBe(null);
		});
	});

	describe('PullRequestPage.closeCodeItem', function() {
		it('should click the code item header', function () {
			var isClicked = false;
			codeItemHeaderClickableArea.addEventListener('click', () => {
				isClicked = true;
			});
			PullRequestPage.closeCodeItem('foo/bar.js');
			expect(isClicked).toBeTruthy();
		});

		it('should give a warning when the code item header is not there', function () {
			document.querySelector('[data-qa=bk-file__header]')!.innerHTML = '';
			const spy = jest.spyOn(console, 'log');
			PullRequestPage.closeCodeItem('foo/bar.js');
			expect(spy).toBeCalledTimes(1);
		});
	});

	describe('PullRequestPage.getCodeItemHeader', function() {
		it('should return the code item header', function () {
			expect(PullRequestPage.getCodeItemHeader('foo/bar.js')).toBe(codeItemHeader);
		});
	});

	describe('PullRequestPage.addActionButton', function() {
		it('should add review button', function () {
			const button = document.createElement('button');
			PullRequestPage.addActionButton('foo/bar.js', button);
			expect(document.getElementById('chg-foo/bar.js')!.nextElementSibling).toBe(button);
		});

		it('should throw an error when review button cannot be added', function () {
			const mock = jest.spyOn(PullRequestPage, 'getCodeItemAnchorElement');
			mock.mockReturnValue(null);

			const button = document.createElement('button');
			expect(() => {
				PullRequestPage.addActionButton('foo/bar.js', button);
			}).toThrow();

			mock.mockRestore();
		});
	});

	describe('PullRequestPage.codeReviewLoaded', function() {
		it('should return true if the code review is loaded', function () {
			expect(PullRequestPage.codeReviewLoaded()).toBe(true);
		});
	});

	describe('PullRequestPage.CodeAndOverviewItemsLoaded', function() {
		it('should return true if the code review is fully rendered', function () {
			expect(PullRequestPage.CodeAndOverviewItemsLoaded()).toBe(true);
		});
	});

	describe('PullRequestPage.addReviewProgress', function() {
		it('should add a review progress box', function () {
			const reviewProgress = PullRequestPage.addReviewProgress();
			expect(reviewProgress[0]).toBeInstanceOf(HTMLElement);
			expect(reviewProgress[1]).toBeInstanceOf(HTMLElement);
		});
	});

	describe('PullRequestPage.getLocalStorageKey', function() {
		it('should get the localStorage key', function () {
			const location = window.location;

			delete window.location

			// @ts-ignore
			window.location = {
				'pathname': '/company/repo/pull-requests/176'
			}

			expect(PullRequestPage.getLocalStorageKey()).toBe('company/repo/176:diffs-expanded-state');

			window.location = location;
		});
	});

	describe('PullRequestPage.getFilePathFromOverviewItemUrl', function() {
		it('should get the proper filename and path from anchor link', function () {
			expect(PullRequestPage.getFilePathFromAnchorLink('https://bitbucket.org/company/repo/pull-requests/401#chg-the/path/to/the/file.txt')).toBe('the/path/to/the/file.txt');
			expect(PullRequestPage.getFilePathFromAnchorLink('chg-src/OverviewItem.ts')).toBe('src/OverviewItem.ts');
		});
	});

	describe('PullRequestPage.getFilePathFromOverviewItemUrl', function() {
		it('should get the proper filename and path from anchor link', function () {
			expect(PullRequestPage.isPullRequestDetailPage('https://bitbucket.org/jeroen/foobar/pull-requests/')).toBe(false);
			expect(PullRequestPage.isPullRequestDetailPage('https://bitbucket.org/jeroen/foobar/pull-requests/123')).toBe(true);
		});
	});
});






