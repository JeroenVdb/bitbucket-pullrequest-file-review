import { PullRequestPage } from '../src/PullRequestPage';
import { CodeItem } from '../src/CodeItem';
import { PullRequestItem } from '../src/PullRequestItem';
import { PullRequest } from '../src/PullRequest';
import { mocked } from 'ts-jest/utils'

jest.mock('../src/PullRequestItem')
jest.mock('../src/PullRequestPage')

let fakePullRequestItem: PullRequestItem;

describe('OverviewItem', function () {
	it('create', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemElement').mockReturnValue(element);

		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		expect(codeItem.codeItemElement).toBe(element);

		mock.mockRestore();
	});

	it('throw when item is not found', function () {
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemElement').mockReturnValue(null);

		expect(() => {
			new CodeItem('foo/bar.js', fakePullRequestItem);
		}).toThrow();

		mock.mockRestore();
	});

	it('mark reviewed', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		codeItem.markReviewed();
		expect(element.style.background).toBe('rgb(227, 252, 239)');
		expect(mock).toHaveBeenCalledTimes(1);

		mock.mockRestore();
	});

	it('set reviewed', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		codeItem.setReviewed();
		expect(element.style.background).toBe('rgb(227, 252, 239)');
		expect(mock).toHaveBeenCalledTimes(1);

		mock.mockRestore();
	});

	it('should cache the dom element when the element is set reviewed multiple times', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		codeItem.setReviewed();
		codeItem.setReviewed();
		codeItem.setReviewed();
		expect(element.style.background).toBe('rgb(227, 252, 239)');
		expect(mock).toHaveBeenCalledTimes(1);

		mock.mockRestore();
	});

	it('show a warning when the header is not yet rendered', function () {
		const mock = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(null);
		jest.spyOn(console, 'log');

		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		codeItem.setReviewed();
		expect(console.log).toBeCalledTimes(1);

		mock.mockRestore();
	});

	it('add buttons', function () {
		const codeItem = new CodeItem('foo/bar.js', fakePullRequestItem);
		codeItem.addControls();
		expect(mocked(PullRequestPage).addActionButton).toBeCalledTimes(1);
	});

	beforeAll(() => {
		jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);
		const fakePullRequest = new PullRequest();
		fakePullRequestItem = new PullRequestItem(fakePullRequest, 'foo/bar.js');
	});
});


