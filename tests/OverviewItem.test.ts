import { OverviewItem } from '../src/OverviewItem';
import { PullRequestPage } from '../src/PullRequestPage';

jest.mock('../src/PullRequestPage');

describe('OverviewItem', function () {
	describe('new OverviewItem', function() {
		it('should create OverviewItem when code element is available on the page', function () {
			const element = document.createElement('div');
			const getOverviewItemElementSpy = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

			const overviewItem = OverviewItem.createOverviewItem('foo/bar.js');
			expect(overviewItem!.domElement).toBe(element);

			getOverviewItemElementSpy.mockRestore();
		});

		it('should return null when trying to create an overview element that is not on the page', function () {
			const getOverviewItemElementSpy = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(null);

			const overviewItem = OverviewItem.createOverviewItem('foo/bar.js');
			expect(overviewItem).toBe(null);

			getOverviewItemElementSpy.mockRestore();
		});
	});

	describe('overviewItem.markReviewed', function() {
		it('should color the overview item green', function () {
			const element = document.createElement('div');
			const getOverviewItemElementSpy = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

			const overviewItem = OverviewItem.createOverviewItem('foo/bar.js');
			overviewItem!.markReviewed();
			expect(element.classList.contains('js-mark-reviewed')).toBeTruthy();

			getOverviewItemElementSpy.mockRestore();
		});
	});

	describe('overviewItem.setReviewed', function() {
		it('should color the overview item green when OverviewItem is set reviewed', function () {
			const element = document.createElement('div');
			const getOverviewItemElementSpy = jest.spyOn(PullRequestPage, 'getOverviewItemElement').mockReturnValue(element);

			const overviewItem = OverviewItem.createOverviewItem('foo/bar.js');
			overviewItem!.setReviewed();
			expect(element.classList.contains('js-mark-reviewed')).toBeTruthy();

			getOverviewItemElementSpy.mockRestore();
		});
	});
});


