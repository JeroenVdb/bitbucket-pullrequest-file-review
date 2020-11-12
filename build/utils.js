"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathFromUrl = void 0;
function getFilePathFromUrl(url) {
    return url.substring(url.indexOf('chg-') + 4);
}
exports.getFilePathFromUrl = getFilePathFromUrl;
//# sourceMappingURL=utils.js.map
