import {PullRequestPage} from "../src/PullRequestPage";

import { codeItem, codeItemAnchor, codeItemHeader, codeItemHeaderClickableArea, overviewItem, pullRequestPage } from './stubbedPullRequestPage';

describe('PullRequestPage', function () {
	it('should get overview items', function () {
		expect(PullRequestPage.getOverviewItemElement('foo/bar.js')).toBe(overviewItem);
	});

	it('should get code item achor', function () {
		expect(PullRequestPage.getCodeItemAnchorElement('foo/bar.js')).toBe(codeItemAnchor);
	});

	it('should get code item', function () {
		expect(PullRequestPage.getCodeItemElement('foo/bar.js')).toBe(codeItem);
	});

	it('should get code item, or null', function () {
		expect(PullRequestPage.getCodeItemElement('foo/other-bar.js')).toBe(null);
	});

	it('should click the header', function () {
		var isClicked = false;
		codeItemHeaderClickableArea.addEventListener('click', () => {
			isClicked = true;
		});
		PullRequestPage.closeCodeItem('foo/bar.js');
		expect(isClicked).toBeTruthy();
	});

	it('should give a warning when the header is not there', function () {
		document.querySelector('[data-qa=bk-file__header]')!.innerHTML = '';
		const spy = jest.spyOn(console, 'log');
		PullRequestPage.closeCodeItem('foo/bar.js');
		expect(spy).toBeCalledTimes(1);
	});

	it('should get code item header', function () {
		expect(PullRequestPage.getCodeItemHeader('foo/bar.js')).toBe(codeItemHeader);
	});

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

	it('should know if the code review is loaded', function () {
		expect(PullRequestPage.codeReviewLoaded()).toBe(true);
	});

	it('should know if the code review is fully rendered', function () {
		expect(PullRequestPage.CodeAndOverviewItemsLoaded()).toBe(true);
	});

	it('should add a review progress box', function () {
		expect(PullRequestPage.addReviewProgress()).toBeInstanceOf(HTMLElement);
	});

	it('should get the localStorage key', function () {
		const location = window.location;

		delete window.location

		// @ts-ignore
		window.location = {
			'pathname': '/persgroep/temptation-editor/pull-requests/176'
		}

		expect(PullRequestPage.getLocalStorageKey()).toBe('persgroep/temptation-editor/176:diffs-expanded-state');

		window.location = location;
	});

	it('should get the proper filename and path from anchor link', function () {
		expect(PullRequestPage.getFilePathFromOverviewItemUrl('https://bitbucket.org/persgroep/temptation-rules/pull-requests/401#chg-rules/test/features/dm-web--login-wall.feature')).toBe('rules/test/features/dm-web--login-wall.feature');
	});
});

beforeEach(() => {
	document.body.innerHTML = '';
	document.body.append(pullRequestPage);
});




