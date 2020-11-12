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
		pullRequest.addItem(new PullRequestItem(pullRequest, 'foo/bar.js'));

		expect(pullRequest.files.size).toBe(1);
	});

	it('should count number of files', function () {
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

	it('should count number of reviewed files', () => {
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

		expect(pullRequest.numberOfFiles()).toBe(2);
		expect(pullRequest.numberOfReviewedFiles()).toBe(1);
	});
});
