import { PullRequest } from "../src/PullRequest";
import { PullRequestPage } from "../src/PullRequestPage";
import { PullRequestItem, reviewState } from "../src/PullRequestItem";
import { mocked } from 'ts-jest/utils'
import { OverviewItem } from "../src/OverviewItem";
import { CodeItem } from "../src/CodeItem";

jest.mock('../src/PullRequestItem');
jest.mock('../src/PullRequestPage');
jest.mock('../src/OverviewItem');
jest.mock('../src/CodeItem');

describe('PullRequestItem', function () {
	describe('new PullRequest', function() {
		it('shoud create a new pullRequest that is empty', function () {
			const element = document.createElement('div');
			const addReviewProgressSpy = jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([element, document.createElement('div')]);
			const pullRequest = new PullRequest();

			expect(pullRequest.files.size).toBe(0);
			expect(pullRequest.reviewProgressBox).toBe(element);

			addReviewProgressSpy.mockRestore();
		});

		it('shoud create a new pullRequest and add the review progress box to the page', function () {
			const element = document.createElement('div');
			const addReviewProgressSpy = jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([element, document.createElement('div')]);
			const pullRequest = new PullRequest();

			expect(pullRequest.reviewProgressBox).toBe(element);

			addReviewProgressSpy.mockRestore();
		});
	});

	describe('pullRequest.addItem', function() {
		it('should add one item to the pullRequest', function () {
			jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);
			const pullRequest = new PullRequest();
			pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar.js'));

			expect(pullRequest.files.size).toBe(1);
		});
	});

	describe('pullRequest.numberOfFiles', function() {
		it('should return the number of files added to the pullRequest', function () {
			jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);
			const pullRequest = new PullRequest();
			const fakePullRequestItem = new PullRequestItem(pullRequest, 'foobar');

			mocked(PullRequestItem).mockImplementation((pullRequest: PullRequest, filePath: string) => {
				return {
					filePath: filePath,
					pullRequest: pullRequest,
					overviewItem: new OverviewItem(filePath),
					codeItem: new CodeItem(filePath, fakePullRequestItem),
					reviewed: reviewState.NOT_REVIEWED,
					markReviewed() {},
					setReviewed() {},
					setAsReviewed() {}
				}
			});

			pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar1.js'));
			pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar2.js'));

			expect(pullRequest.numberOfFiles()).toBe(2);
		});
	});

	describe('pullRequest.numberOfReviewedFiles', function() {
		it('should count number of reviewed files', () => {
			jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);
			const pullRequest = new PullRequest();
			const fakePullRequestItem = new PullRequestItem(pullRequest, 'foobar');

			mocked(PullRequestItem).mockImplementation((pullRequest: PullRequest, filePath: string) => {
				return {
					filePath: filePath,
					pullRequest: pullRequest,
					overviewItem: new OverviewItem(filePath),
					codeItem: new CodeItem(filePath, fakePullRequestItem),
					reviewed: reviewState.NOT_REVIEWED,
					markReviewed() {},
					setReviewed() {},
					setAsReviewed() {}
				}
			});

			pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar1.js'));
			pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar2.js'));

			pullRequest.files.get('foo/bar1.js')!.reviewed = reviewState.REVIEWED;

			expect(pullRequest.numberOfReviewedFiles()).toBe(1);
		});
	});

	describe('pullRequest.updateProgress', function() {
		it('should update the progress box', () => {

			jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);

			const pullRequest = new PullRequest();
			pullRequest.updateProgress();

			expect(pullRequest.reviewProgressBox!.innerText).toContain('0 of 0');
			expect(pullRequest.progressBar!.style.getPropertyValue('--progress')).toBe('0%');
		});

		/*it('should update the progress box when items are added and marked', () => {
			jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue([document.createElement('div'), document.createElement('div')]);

			const pullRequest = new PullRequest();
			pullRequest.addItem(new PullRequestItem())
			pullRequest.updateProgress();

			expect(pullRequest.reviewProgressBox!.innerText).toContain('1 of 2');
			expect(pullRequest.progressBar!.style.getPropertyValue('--progress')).toBe('50%');
		});*/
	});

	describe('pullRequest.getState', function() {
		it('should get state from localStorage', () => {

			delete window.localStorage.getItem;

			window.localStorage.getItem = function() {
				return null;
			}

			const pullRequest = new PullRequest();

			expect(pullRequest.getState()).toStrictEqual({});
		});

		/*it('should get state from localStorage only once', () => {
			const localStorageGetItemSpy = jest.spyOn(global.localStorage, 'getItem');
			localStorageGetItemSpy.mockReturnValue('{}');

			const pullRequest = new PullRequest();

			expect(pullRequest.getState()).toStrictEqual({});
			expect(localStorageGetItemSpy).toBeCalledTimes(1);

			expect(pullRequest.getState()).toStrictEqual({});
			expect(localStorageGetItemSpy).toBeCalledTimes(1);
		});*/

	});

	describe('pullRequest.syncState', function() {
		it('should sync state', () => {

			delete window.localStorage.getItem;

			window.localStorage.getItem = function() {
				return JSON.stringify({
					'foo/bar1.js': false,
					'foo/bar2.js': false
				});
			}

			const pullRequest = new PullRequest();
			const fakePullRequestItem = new PullRequestItem(pullRequest, 'foobar');

			mocked(PullRequestItem).mockImplementation((pullRequest: PullRequest, filePath: string) => {
				return {
					filePath: filePath,
					pullRequest: pullRequest,
					overviewItem: new OverviewItem(filePath),
					codeItem: new CodeItem(filePath, fakePullRequestItem),
					reviewed: reviewState.NOT_REVIEWED,
					markReviewed() {},
					setReviewed() {},
					setAsReviewed() {}
				}
			});

			const prItemOne = new PullRequestItem(pullRequest, 'foo/bar1.js')
			const prItemTwo = new PullRequestItem(pullRequest, 'foo/bar2.js')

			const spyPrItemOne = jest.spyOn(prItemOne, 'setReviewed')
			const spyPrItemTwo = jest.spyOn(prItemTwo, 'setReviewed')

			const mockGetState = jest.spyOn(pullRequest, 'getState').mockReturnValue({
				'foo/bar1.js': false,
				'foo/bar2.js': false
			});

			pullRequest.addItem(prItemOne);
			pullRequest.addItem(prItemTwo);

			pullRequest.syncState();

			expect(spyPrItemOne).toBeCalledTimes(1);
			expect(spyPrItemTwo).toBeCalledTimes(1);

			mockGetState.mockRestore();
		});
	});
});
