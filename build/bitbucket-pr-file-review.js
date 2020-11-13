var prfilereview = (function (exports) {
    'use strict';

    class PullRequestPage {
        static getOverviewItemElement(filePath) {
            return document.querySelector(`a[href="#chg-${filePath}"]`);
        }
        static getCodeItemAnchorElement(filePath) {
            return document.getElementById(`chg-${filePath}`);
        }
        static getCodeItemElement(filePath) {
            const anchorElement = PullRequestPage.getCodeItemAnchorElement(filePath);
            if (anchorElement === null) {
                return null;
            }
            return anchorElement.nextElementSibling;
        }
        static closeCodeItem(filePath) {
            const clickableCodeItemHeader = document.querySelector(`[aria-label="Diff of file ${filePath}"] [aria-label="Expand/collapse file"]`);
            if (clickableCodeItemHeader === null) {
                console.log(`codeItem header for ${filePath} was not yet rendered`);
                return;
            }
            clickableCodeItemHeader.click();
        }
        static getCodeItemHeader(filePath) {
            return document.querySelector(`[aria-label="Diff of file ${filePath}"] [data-qa="bk-file__header"]`);
        }
        static addActionButton(filePath, button) {
            const codeItemAnchorElement = PullRequestPage.getCodeItemAnchorElement(filePath);
            if (codeItemAnchorElement) {
                codeItemAnchorElement.insertAdjacentElement('afterend', button);
            }
            else {
                throw new Error(`Could not get anchor for ${filePath}`);
            }
        }
        static codeReviewLoaded() {
            return (document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').length > 0 &&
                document.querySelectorAll('[data-qa="pr-diff-file-styles"]').length > 0);
        }
        static CodeAndOverviewItemsLoaded() {
            return (document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').length ===
                document.querySelectorAll('[data-qa="pr-diff-file-styles"]').length);
        }
        static getLocalStorageKey() {
            const path = location.pathname.split('/');
            return `${path[1]}/${path[2]}/${path[4]}:diffs-expanded-state`;
        }
        static addReviewProgress() {
            document
                .querySelector('#PullRequestWelcomeTourTarget-Files')
                .parentElement.insertAdjacentHTML('beforebegin', PullRequestPage.reviewProgressHTML());
            return document.querySelector('.fjs-text');
        }
        static reviewProgressHTML() {
            return `
			<div class="css-1z0at8b e8f23vi6" style="z-index: 8;">
				<section aria-label="Build statuses" class="css-gjnwqt e1m6l9kn0">
					<button aria-controls="expanderId-0" aria-expanded="true" data-testid="" class="css-1o91c15 e1m6l9kn1"><span class="css-1b5prcp e1m6l9kn4"><span class="sc-htpNat dcTkON" role="img" aria-label="Merge checks"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><rect x="10" y="15" width="8" height="2" rx="1"></rect><rect x="6" y="15" width="2" height="2" rx="1"></rect><rect x="10" y="11" width="8" height="2" rx="1"></rect><rect x="6" y="11" width="2" height="2" rx="1"></rect><rect x="10" y="7" width="8" height="2" rx="1"></rect><rect x="6" y="7" width="2" height="2" rx="1"></rect></g></svg></span></span><span class="css-1q27zj9 e1m6l9kn2"><div><span class="fjs-text"></span></span></div></span></button>
					<div id="expanderId-22" aria-hidden="false" class="rah-static rah-static--height-auto" style="height: auto; overflow: visible;">
						<div>
							<div class="css-1hxpyht e1m6l9kn3"><div class="css-vjkoi3 e11gw9gu2">
								<!-- empty -->
							</div>
						</div>
					</div>
				</section>
			</div>`;
        }
        static getFilePathFromOverviewItemUrl(url) {
            return url.substr(url.indexOf('chg-') + 4);
        }
    }

    class OverviewItem {
        constructor(filePath) {
            const overviewItemElement = PullRequestPage.getOverviewItemElement(filePath);
            if (overviewItemElement === null) {
                throw new Error(`No overview item found for file ${filePath}`);
            }
            this.domElement = overviewItemElement;
        }
        markReviewed() {
            this.domElement.style.background = '#e3fcef';
        }
        setReviewed() {
            this.domElement.style.background = '#e3fcef';
        }
    }

    class CodeItem {
        constructor(filePath, pullRequestItem) {
            const codeItemElement = PullRequestPage.getCodeItemElement(filePath);
            if (codeItemElement === null) {
                throw Error(`No code item found for file ${filePath}`);
            }
            this.domElement = codeItemElement;
            this.pullRequestItem = pullRequestItem;
        }
        markReviewed() {
            PullRequestPage.closeCodeItem(this.pullRequestItem.filePath);
            this.colorHeader(this.pullRequestItem.filePath);
        }
        setReviewed() {
            this.colorHeader(this.pullRequestItem.filePath);
        }
        colorHeader(filePath) {
            const codeItemHeader = PullRequestPage.getCodeItemHeader(filePath);
            if (codeItemHeader === null) {
                console.log(`code item header for ${filePath} was not yet rendered`);
                return;
            }
            codeItemHeader.style.background = '#e3fcef';
        }
        addControls() {
            PullRequestPage.addActionButton(this.pullRequestItem.filePath, this.reviewButton());
        }
        reviewButton() {
            const button = document.createElement('button');
            button.innerText = 'Reviewed';
            button.setAttribute('style', 'z-index: 500; position: absolute; top: 10px; right: 50px;');
            button.addEventListener('click', () => {
                this.pullRequestItem.markReviewed();
            });
            return button;
        }
    }

    class PullRequestItem {
        constructor(pullRequest, filePath) {
            this.pullRequest = pullRequest;
            this.filePath = filePath;
            this.overviewItem = new OverviewItem(filePath);
            this.codeItem = new CodeItem(filePath, this);
            this.reviewed = reviewState.NOT_REVIEWED;
            this.codeItem.addControls();
        }
        markReviewed() {
            this.overviewItem.markReviewed();
            this.codeItem.markReviewed();
            this.setAsReviewed();
        }
        setReviewed() {
            this.overviewItem.setReviewed();
            this.codeItem.setReviewed();
            this.setAsReviewed();
        }
        setAsReviewed() {
            this.reviewed = reviewState.REVIEWED;
            this.pullRequest.updateProgress();
        }
    }
    var reviewState;
    (function (reviewState) {
        reviewState[reviewState["REVIEWED"] = 0] = "REVIEWED";
        reviewState[reviewState["NOT_REVIEWED"] = 1] = "NOT_REVIEWED";
    })(reviewState || (reviewState = {}));

    class PullRequest {
        constructor() {
            this.files = new Map();
            this.reviewProgressBox = PullRequestPage.addReviewProgress();
        }
        addItem(item) {
            this.files.set(item.filePath, item);
        }
        numberOfFiles() {
            return this.files.size;
        }
        numberOfReviewedFiles() {
            let filesReviewed = 0;
            for (const file of this.files.values()) {
                if (file.reviewed === reviewState.REVIEWED) {
                    filesReviewed++;
                }
            }
            return filesReviewed;
        }
        updateProgress() {
            if (this.reviewProgressBox) {
                this.reviewProgressBox.innerHTML = `<span class="css-in3yi3 e10navn00"><span>${this.numberOfReviewedFiles()} of ${this.numberOfFiles()}</span></span> <span>files reviewed</span>`;
            }
        }
        getState() {
            return JSON.parse(window.localStorage.getItem(PullRequestPage.getLocalStorageKey()) || '{}');
        }
        syncState() {
            const state = this.getState();
            for (const [filePath, isExpanded] of Object.entries(state)) {
                if (isExpanded === false) {
                    const file = this.files.get(filePath);
                    if (file) {
                        file.setReviewed();
                    }
                }
            }
        }
    }

    console.log('[bitbucket-pr-files-review] is loaded');

    const checkCodeReviewLoadedAndInitialize = window.setInterval(() => {
        if (PullRequestPage.codeReviewLoaded()) {
            console.log('[bitbucket-pr-files-review] pull request is ready to be initiated');
            exports.pullRequest = new PullRequest();
            window.clearInterval(checkCodeReviewLoadedAndInitialize);
            document.querySelectorAll('#PullRequestWelcomeTourTarget-Files a').forEach((item) => {
                const link = item.getAttribute('href');
                if (link !== null) {
                    const filePath = PullRequestPage.getFilePathFromOverviewItemUrl(link);
                    exports.pullRequest.addItem(new PullRequestItem(exports.pullRequest, filePath));
                }
            });
            exports.pullRequest.syncState();
            document.addEventListener('scroll', syncState);
            let debounce_timer;
            function syncState() {
                if (debounce_timer) {
                    window.clearTimeout(debounce_timer);
                }
                debounce_timer = window.setTimeout(function () {
                    console.log('sync state with localstorage');
                    exports.pullRequest.syncState();
                    if (PullRequestPage.CodeAndOverviewItemsLoaded()) {
                        console.log('code and overview items are loaded remove eventListener');
                        document.removeEventListener('scroll', syncState);
                    }
                }, 300);
            }
        }
        console.log('[bitbucket-pr-files-review] pull request is not loaded enough yet, try again in 1s');
    }, 1000);

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
