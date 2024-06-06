ace.define("assets/css/vs_code", ["require", "exports", "module", "@/assets/css/vs_code.css", "ace/lib/dom"], function (require, exports, module) {
    exports.isDark = true;
    exports.cssClass = "ace-vs_code";
    exports.cssText = require("assets/css/vs_code.css");
    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass, false);

}); (function () {
    ace.require(["assets/css/vs_code"], function (m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
