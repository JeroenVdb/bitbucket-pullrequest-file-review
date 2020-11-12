import { OverviewItem } from '../src/OverviewItem';
import { PullRequestPage } from '../src/PullRequestPage';

jest.mock('../src/PullRequestPage');

describe('OverviewItem', function () {
	it('create', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

		const overviewItem = new OverviewItem('foo/bar.js');
		expect(overviewItem.domElement).toBe(element);

		mock.mockRestore();
	});

	it('throw when item is not found', function () {
		const mock = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(null);

		expect(() => {
			new OverviewItem('foo/bar.js')
		}).toThrow();

		mock.mockRestore();
	});

	it('mark reviewed', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

		const overviewItem = new OverviewItem('foo/bar.js');
		overviewItem.markReviewed();
		expect(overviewItem.domElement.style.background).toBe('rgb(227, 252, 239)');

		mock.mockRestore();
	});

	it('set as reviewed', function () {
		const element = document.createElement('div');
		const mock = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

		const overviewItem = new OverviewItem('foo/bar.js');
		overviewItem.setReviewed();
		expect(overviewItem.domElement.style.background).toBe('rgb(227, 252, 239)');

		mock.mockRestore();
	});
});


