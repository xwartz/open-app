"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZh = function () {
    return /zh/i.test(navigator.language);
};
exports.isimToken = function () {
    return typeof window.imToken !== 'undefined';
};
exports.isUnSupportScheme = function () {
    var ua = navigator.userAgent;
    var isWechat = /micromessenger\/([\d.]+)/i.test(ua);
    return isWechat;
};
exports.isAndroid = function () {
    var ua = navigator.userAgent;
    return /android/i.test(ua);
};
exports.openByLocation = function (url) {
    location.href = url;
};
exports.openByIframe = function (url) {
    var ifr = document.createElement('iframe');
    ifr.src = url;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);
};
//# sourceMappingURL=utils.js.map