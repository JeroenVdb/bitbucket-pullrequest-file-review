import { PullRequestItem, reviewState } from "../src/PullRequestItem";
import { PullRequest } from "../src/PullRequest";
import { OverviewItem } from "../src/OverviewItem";
import { CodeItem } from "../src/CodeItem";

jest.mock('../src/OverviewItem');
jest.mock('../src/CodeItem');
jest.mock('../src/PullRequest');

let fakePullRequest: PullRequest;

describe('PullRequestItem', function () {
	it('create', function () {
		const pullRequestItem = new PullRequestItem(fakePullRequest, 'foo/bar.js');
		const addControlsSpy = jest.spyOn(pullRequestItem.codeItem, 'addControls');

		expect(pullRequestItem.pullRequest).toBe(fakePullRequest);
		expect(pullRequestItem.filePath).toBe('foo/bar.js');
		expect(pullRequestItem.overviewItem).toBeInstanceOf(OverviewItem);
		expect(pullRequestItem.codeItem).toBeInstanceOf(CodeItem);
		expect(pullRequestItem.reviewed).toBe(reviewState.NOT_REVIEWED);
		expect(addControlsSpy).toBeCalledTimes(1);
	});

	it('mark reviewed', function () {
		const pullRequestItem = new PullRequestItem(fakePullRequest, 'foo/bar.js');
		const overviewItemMarkReviewedSpy = jest.spyOn(pullRequestItem.overviewItem, 'markReviewed');
		const codeItemMarkReviewedSpy = jest.spyOn(pullRequestItem.codeItem, 'markReviewed');
		const updateProgressSpy = jest.spyOn(pullRequestItem.pullRequest, 'updateProgress');

		pullRequestItem.markReviewed();

		expect(overviewItemMarkReviewedSpy).toBeCalledTimes(1);
		expect(codeItemMarkReviewedSpy).toBeCalledTimes(1);
		expect(updateProgressSpy).toBeCalledTimes(1);
		expect(pullRequestItem.reviewed).toBe(reviewState.REVIEWED);
	});

	it('set reviewed', function () {
		const pullRequestItem = new PullRequestItem(fakePullRequest, 'foo/bar.js');
		const overviewItemSetReviewedSpy = jest.spyOn(pullRequestItem.overviewItem, 'setReviewed');
		const codeItemSetReviewedSpy = jest.spyOn(pullRequestItem.codeItem, 'setReviewed');
		const updateProgressSpy = jest.spyOn(pullRequestItem.pullRequest, 'updateProgress');

		pullRequestItem.setReviewed();

		expect(overviewItemSetReviewedSpy).toBeCalledTimes(1);
		expect(codeItemSetReviewedSpy).toBeCalledTimes(1);
		expect(updateProgressSpy).toBeCalledTimes(1);
		expect(pullRequestItem.reviewed).toBe(reviewState.REVIEWED);
	});

	beforeEach(() => {
		fakePullRequest = new PullRequest();
	});
});


