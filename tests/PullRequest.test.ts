import { PullRequest } from "../src/PullRequest";
import { PullRequestPage } from "../src/PullRequestPage";
import { PullRequestItem, reviewState } from "../src/PullRequestItem";

jest.mock('../src/PullRequestItem');
jest.mock('../src/PullRequestPage');

describe('PullRequestItem', function () {
	it('create', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'addReviewProgress').mockReturnValue(element);
		const pullRequest = new PullRequest();

		expect(pullRequest.files.size).toBe(0);
		expect(pullRequest.reviewProgressBox).toBe(element);

		mock.mockRestore();
	});

	it('should add items', function () {
		const pullRequest = new PullRequest();
		pullRequest.addItem('foo/bar.js', new PullRequestItem(pullRequest, 'foo/bar.js'));

		expect(pullRequest.files.size).toBe(1);
	});

	it('should count number of files', function () {
		const pullRequest = new PullRequest();
		pullRequest.addItem('foo/bar1.js', new PullRequestItem(pullRequest, 'foo/bar1.js'));
		pullRequest.addItem('foo/bar2.js', new PullRequestItem(pullRequest, 'foo/bar2.js'));

		expect(pullRequest.numberOfFiles()).toBe(2);
	});

	it('should count number of reviewed files', function () {
		const pullRequest = new PullRequest();
		pullRequest.addItem('foo/bar1.js', new PullRequestItem(pullRequest, 'foo/bar1.js'));
		pullRequest.addItem('foo/bar2.js', new PullRequestItem(pullRequest, 'foo/bar2.js'));

		pullRequest.files.get('foo/bar1.js')!.reviewed = reviewState.REVIEWED;

		expect(pullRequest.numberOfFiles()).toBe(2);
		expect(pullRequest.numberOfReviewedFiles()).toBe(1);
	});
});


