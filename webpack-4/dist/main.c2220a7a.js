(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ \"./src/module.js\");\n{}\n;\n\nconsole.log(_module__WEBPACK_IMPORTED_MODULE_0__[\"id\"]);\nvar btn = document.getElementById('async-btn');\nbtn.addEventListener('click', function () {\n  console.log('click');\n  __webpack_require__.e(/*! import() | asyncModule */ \"asyncModule\").then(__webpack_require__.bind(null, /*! ./asyncModule.js */ \"./src/asyncModule.js\")).then(function (m) {\n    return m.test();\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/module.js":
/*!***********************!*\
  !*** ./src/module.js ***!
  \***********************/
/*! exports provided: id */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"id\", function() { return id; });\n{}\n;\nvar id = 123;\n\n//# sourceURL=webpack:///./src/module.js?");

/***/ })

},[["./src/index.js","common/runtime"]]]);