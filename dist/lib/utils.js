"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZh = function () {
    return /zh/i.test(navigator.language);
};
exports.isimToken = function () {
    var imToken = window.imToken;
    return imToken && imToken.version;
};
exports.isUnSupportScheme = function () {
    var ua = navigator.userAgent;
    var isWechat = /micromessenger\/([\d.]+)/i.test(ua);
    var isQQ = /qq\/([\d.]+)/i.test(ua);
    return isWechat || isQQ;
};
exports.isAndroid = function () {
    var ua = navigator.userAgent;
    return /android/i.test(ua);
};
exports.isChrome = function () {
    var ua = navigator.userAgent;
    return /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua);
};
exports.isiOS = function () {
    var ua = navigator.userAgent;
    return /iphone|ipad|ipod/i.test(ua);
};
exports.isiPhoneX = function () {
    return /iphone/gi.test(navigator.userAgent) && screen.height >= 812;
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
exports.openByTagA = function (url) {
    var tagA = document.createElement('a');
    tagA.setAttribute('href', url);
    tagA.style.display = 'none';
    document.body.appendChild(tagA);
    tagA.click();
};
//# sourceMappingURL=utils.js.map