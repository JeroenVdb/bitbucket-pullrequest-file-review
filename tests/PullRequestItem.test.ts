import { PullRequestItem, reviewState } from "../src/PullRequestItem";
import { PullRequest } from "../src/PullRequest";
import { OverviewItem } from "../src/OverviewItem";
import { CodeItem } from "../src/CodeItem";

jest.mock('../src/OverviewItem');
jest.mock('../src/CodeItem');
jest.mock('../src/PullRequest');

let fakePullRequest: PullRequest;

const MOCK_FILE_PATH: string = 'foo/bar.js';

describe('PullRequestItem', function () {
	beforeEach(() => {
		fakePullRequest = new PullRequest();
	});

	describe('new PullRequestItem', function() {
		it('should create a new PullRequestItem', function () {
			const createOverviewItemMock = jest.spyOn(OverviewItem, 'createOverviewItem').mockReturnValue(new OverviewItem(document.createElement('div')));
			const pullRequestItem = new PullRequestItem(fakePullRequest, MOCK_FILE_PATH);
			const addControlsSpy = jest.spyOn(pullRequestItem.codeItem, 'addControls');

			expect(pullRequestItem.pullRequest).toBe(fakePullRequest);
			expect(pullRequestItem.filePath).toBe(MOCK_FILE_PATH);
			expect(pullRequestItem.overviewItem).toBeInstanceOf(OverviewItem);
			expect(pullRequestItem.codeItem).toBeInstanceOf(CodeItem);
			expect(pullRequestItem.reviewed).toBe(reviewState.NOT_REVIEWED);
			expect(addControlsSpy).toBeCalledTimes(1);
			expect(createOverviewItemMock).toBeCalledTimes(1);

			createOverviewItemMock.mockRestore();
		});
	});

	describe('pullRequestItem.markReviewed', function() {
		it('should mark the pullRequestItem as reviewed, update code and overiew items and update the progress', function () {
			const createOverviewItemMock = jest.spyOn(OverviewItem, 'createOverviewItem').mockReturnValue(new OverviewItem(document.createElement('div')));
			const pullRequestItem = new PullRequestItem(fakePullRequest, MOCK_FILE_PATH);
			const overviewItemMarkReviewedSpy = jest.spyOn(pullRequestItem.overviewItem!, 'markReviewed');
			const codeItemMarkReviewedSpy = jest.spyOn(pullRequestItem.codeItem, 'markReviewed');
			const updateProgressSpy = jest.spyOn(pullRequestItem.pullRequest, 'updateProgress');

			pullRequestItem.markReviewed();

			expect(createOverviewItemMock).toBeCalledTimes(1);
			expect(overviewItemMarkReviewedSpy).toBeCalledTimes(1);
			expect(codeItemMarkReviewedSpy).toBeCalledTimes(1);
			expect(updateProgressSpy).toBeCalledTimes(1);
			expect(pullRequestItem.reviewed).toBe(reviewState.REVIEWED);

			createOverviewItemMock.mockRestore();
		});
	});

	describe('pullRequestItem.setReviewed', function() {
		it('should set the pullRequestItem as reviewed, update code and overiew items and update the progress', function () {
			const createOverviewItemMock = jest.spyOn(OverviewItem, 'createOverviewItem').mockReturnValue(new OverviewItem(document.createElement('div')));
			const pullRequestItem = new PullRequestItem(fakePullRequest, MOCK_FILE_PATH);
			const overviewItemSetReviewedSpy = jest.spyOn(pullRequestItem.overviewItem!, 'setReviewed');
			const codeItemSetReviewedSpy = jest.spyOn(pullRequestItem.codeItem, 'setReviewed');
			const updateProgressSpy = jest.spyOn(pullRequestItem.pullRequest, 'updateProgress');

			pullRequestItem.setReviewed();

			expect(createOverviewItemMock).toBeCalledTimes(1);
			expect(overviewItemSetReviewedSpy).toBeCalledTimes(1);
			expect(codeItemSetReviewedSpy).toBeCalledTimes(1);
			expect(updateProgressSpy).toBeCalledTimes(1);
			expect(pullRequestItem.reviewed).toBe(reviewState.REVIEWED);

			createOverviewItemMock.mockRestore();
		});
	});
});


