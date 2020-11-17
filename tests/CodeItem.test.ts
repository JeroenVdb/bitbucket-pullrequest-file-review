import { PullRequestPage } from '../src/repositories/PullRequestPage';
import { CodeItem } from '../src/CodeItem';
import { PullRequestItem } from '../src/PullRequestItem';
import { PullRequest } from '../src/PullRequest';
import { mocked } from 'ts-jest/utils'

jest.mock('../src/PullRequestItem')
jest.mock('../src/PullRequestPage')

let fakePullRequestItem: PullRequestItem;
let fakePullRequest: PullRequest;

const MOCK_FILE_PATH: string = 'foo/bar.js';

describe('CodeItem', function () {
	beforeEach(() => {
		jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);
		fakePullRequest = new PullRequest();
		fakePullRequestItem = new PullRequestItem(fakePullRequest, MOCK_FILE_PATH);
	});

	describe('new CodeItem', function () {
		it('should create CodeItem when code element is available on the page', function () {
			const element = document.createElement('div');
			const getCodeItemElementSpy = jest.spyOn(PullRequestPage, 'getCodeItemElement').mockReturnValue(element);

			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			expect(codeItem.codeItemElement).toBe(element);

			getCodeItemElementSpy.mockRestore();
		});

		it('should throw an error when code element is not on the page', function () {
			const getCodeItemElementSpy = jest.spyOn(PullRequestPage, 'getCodeItemElement').mockReturnValue(null);

			expect(() => {
				new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			}).toThrow();

			getCodeItemElementSpy.mockRestore();
		});
	});

	describe('codeItem.markReviewed', function() {
		it('should color the header green', function () {
			const element = document.createElement('div');
			const getCodeItemHeaderSpy = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			codeItem.markReviewed();
			expect(element.style.background).toBe('rgb(227, 252, 239)');
			expect(getCodeItemHeaderSpy).toHaveBeenCalledTimes(1);

			getCodeItemHeaderSpy.mockRestore();
		});
	});

	describe('codeItem.setReviewed', function() {
		it('should color the header green', function () {
			const element = document.createElement('div');
			const getCodeItemHeaderSpy = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			codeItem.setReviewed();
			expect(element.style.background).toBe('rgb(227, 252, 239)');
			expect(getCodeItemHeaderSpy).toHaveBeenCalledTimes(1);

			getCodeItemHeaderSpy.mockRestore();
		});

		it('should cache the header dom element when the CodeItem is set reviewed multiple times', function () {
			const element = document.createElement('div');
			const getCodeItemHeaderSpy = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(element);

			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			codeItem.setReviewed();
			codeItem.setReviewed();
			codeItem.setReviewed();
			expect(element.style.background).toBe('rgb(227, 252, 239)');
			expect(getCodeItemHeaderSpy).toHaveBeenCalledTimes(1);

			getCodeItemHeaderSpy.mockRestore();
		});

		it('should show a warning when the header is not yet rendered and cant be set or marked reviewed', function () {
			const getCodeItemHeaderSpy = jest.spyOn(PullRequestPage, 'getCodeItemHeader').mockReturnValue(null);
			jest.spyOn(console, 'log');

			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			codeItem.setReviewed();
			expect(console.log).toBeCalledTimes(1);

			getCodeItemHeaderSpy.mockRestore();
		});
	});

	describe('codeItem.addControls', function() {
		it('should add review buttons', function () {
			const codeItem = new CodeItem(MOCK_FILE_PATH, fakePullRequestItem);
			codeItem.addControls();
			expect(mocked(PullRequestPage).addActionButton).toBeCalledTimes(1);
		});
	});
});


