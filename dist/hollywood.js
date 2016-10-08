(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hollywood"] = factory();
	else
		root["Hollywood"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _hollywood = __webpack_require__(1);

	var _hollywood2 = _interopRequireDefault(_hollywood);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _hollywood2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	__webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var _ref = [window, document, document.body, Promise];
	var W = _ref[0];
	var D = _ref[1];
	var B = _ref[2];
	var P = _ref[3];


	var state = 'OFF';

	var Hollywood = function Hollywood(options) {
	  if (state !== 'OFF') return;

	  var _stay$transit$loading = _extends({ stay: 10, transit: 3, loading: true }, options);

	  var images = _stay$transit$loading.images;
	  var audio = _stay$transit$loading.audio;
	  var loading = _stay$transit$loading.loading;
	  var stay = _stay$transit$loading.stay;
	  var transit = _stay$transit$loading.transit;

	  var _map = ['div', 'img', 'img'].map(function (e) {
	    return D.createElement(e);
	  });

	  var _map2 = _slicedToArray(_map, 3);

	  var woods = _map2[0];
	  var odd = _map2[1];
	  var even = _map2[2];


	  B.classList.add('hollywood-on');
	  woods.classList.add('hollywood');
	  [odd, even].forEach(function (img) {
	    woods.appendChild(img);
	    img.style.transition = 'opacity ' + transit + 's ease-in';
	  });
	  B.appendChild(woods);

	  var loadingBar = void 0,
	      music = void 0,
	      bars = [];

	  if (loading) {
	    loadingBar = D.createElement('div');
	    loadingBar.classList.add('hollywood-loading');
	    B.appendChild(loadingBar);
	  }

	  if (audio) {
	    music = D.createElement('div');
	    music.classList.add('hollywood-bars', 'hollywood-hidden');
	    [].concat(_toConsumableArray(Array(5))).forEach(function (i) {
	      var bar = D.createElement('div');
	      bars.push(bar);
	      music.appendChild(bar);
	    });
	    B.appendChild(music);

	    Hollywood.mute = function () {
	      if (state !== 'ON') return;
	      var paused = void 0;
	      (paused = player.paused) ? player.play() : player.pause();
	      bars.map(function (bar) {
	        return bar.style.animationPlayState = paused ? 'running' : 'paused';
	      });
	    };

	    music.addEventListener('click', Hollywood.mute, false);
	  }

	  var current = void 0,
	      previous = void 0,
	      active = void 0,
	      inactive = void 0,
	      AR = window.innerWidth / window.innerHeight,
	      iterator = void 0,
	      player = void 0,
	      interval = void 0,
	      gloom = 0,
	      glow = 0.5;

	  var move = function move() {
	    previous = current;
	    current = iterator.next();
	    inactive = active;
	    active = active === even ? odd : even;

	    active.src = current.src;
	    active.style.opacity = glow;
	    active.className = '';
	    active.classList.add(AR > current.AR ? 'w100' : 'h100');
	    inactive && (inactive.style.opacity = gloom);
	  };

	  var resize = function resize() {
	    AR = window.innerWidth / window.innerHeight;
	    odd.className = even.className = '';
	    active && active.classList.add(AR > current.AR ? 'w100' : 'h100');
	    inactive && inactive.classList.add(AR > previous.AR ? 'w100' : 'h100');
	  };

	  W.addEventListener('resize', resize, false);

	  Hollywood.destroy = function () {
	    state = 'OFF';

	    W.removeEventListener('resize', resize, false);

	    if (player) {
	      player.pause();
	      player.src = null;
	    }

	    [woods, music, loadingBar].forEach(function (x) {
	      return x && B.removeChild(x);
	    });
	  };

	  return new P(function (resolve, reject) {
	    Preload(images, audio).then(function (result) {
	      var imgs = result[0].map(function (i) {
	        return { src: i.src, AR: i.width / i.height };
	      });

	      iterator = Circular(imgs);

	      if (result[1]) {
	        player = result[1];
	        player.loop = true;
	        player.play();
	        music.classList.remove('hollywood-hidden');
	      }

	      loading && loadingBar.classList.add('hollywood-hidden');

	      move();
	      state = 'ON';
	      interval = W.setInterval(move, stay * 1000);
	      resolve('Hollywood is ON!');
	    }).catch(function (err) {
	      reject('Sorry, can\'t able to load all resources. ' + err);
	    });
	  });
	};

	var Preload = function Preload(images, audio) {
	  var promises = [];

	  promises.push(P.all(images.map(function (image) {
	    return new Promise(function (resolve, reject) {
	      var img = new Image();
	      img.onload = function () {
	        return resolve(img);
	      };
	      img.onerror = img.onabort = function () {
	        return reject;
	      };
	      img.src = image;
	    });
	  })));

	  if (audio) {
	    promises.push(new P(function (resolve, reject) {
	      var aud = new Audio();
	      aud.oncanplaythrough = function () {
	        return resolve(aud);
	      };
	      aud.onerror = aud.onabort = function (e) {
	        return reject;
	      };
	      aud.src = audio;
	    }));
	  }

	  return P.all(promises);
	};

	var Circular = function Circular(arr) {
	  var current = -1;

	  return {
	    next: function next() {
	      current = current >= arr.length - 1 ? 0 : current + 1;
	      return arr[current];
	    }
	  };
	};

	exports.default = Hollywood;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/index.js!./hollywood.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/index.js!./hollywood.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".hollywood-on {\n  margin: 0;\n  padding: 0;\n  background-color: #000; }\n\n.hollywood {\n  position: fixed;\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1; }\n  .hollywood:after {\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    content: '';\n    background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiYGBgePz//38GRhABAgABBgBFTAbfCBNE2AAAAABJRU5ErkJggg==\") repeat top left; }\n  .hollywood img {\n    position: absolute;\n    opacity: 0;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%); }\n  .hollywood .w100 {\n    width: 100%; }\n  .hollywood .h100 {\n    height: 100%; }\n\n.hollywood-bars {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  height: 20px;\n  width: 20px;\n  max-width: 20px;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -ms-flex-align: end;\n      align-items: flex-end;\n  cursor: pointer;\n  z-index: 100; }\n  .hollywood-bars div {\n    width: 3px;\n    height: 40%;\n    background: #666;\n    animation: dance 300ms linear infinite alternate; }\n    .hollywood-bars div:nth-child(1) {\n      animation-delay: 5ms; }\n    .hollywood-bars div:nth-child(2) {\n      animation-delay: 50ms; }\n    .hollywood-bars div:nth-child(3) {\n      animation-delay: 300ms; }\n    .hollywood-bars div:nth-child(4) {\n      animation-delay: 200ms; }\n    .hollywood-bars div:nth-child(5) {\n      animation-delay: 80ms; }\n\n@keyframes dance {\n  0% {\n    height: 40%; }\n  100% {\n    height: 100%; } }\n\n.hollywood-loading {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  height: 20px;\n  width: 20px;\n  border: 3px solid #666;\n  border-right-color: transparent;\n  border-radius: 50%;\n  display: inline-block;\n  animation: rotate 750ms infinite linear;\n  z-index: 100; }\n\n@keyframes rotate {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n.hollywood-hidden {\n  display: none; }\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;