/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//var $ = require('jquery');
//var canvas = require('jcanvas');

var can = $('#lines'),
    sss = {},
    lsize = 0;

var oneCell,
    width,
    height,
    xB, yB;

var Painter = {
    setStroke: function(stroke, size){ sss=stroke; lsize = size},
    oneLine: function (matrix, params) {

        oneCell = params.width/matrix.length;
        width = params.width;
        height = params.height;
        xB = params.x;
        yB = params.y;
        console.log('Begin maze cords',xB,yB);
        //console.log(oneCell)


        for (var k = 0; k < matrix.length; k++){

            for (var i = 0; i <     matrix[k].side.length; i++){
                can.drawLine(new sideOf(matrix[k].side[i],k))
            }

            for (var j = 0; j < matrix[k].space.length; j++){
                can.drawLine(new spaceOf(matrix[k].space[j], k));
            }

        }

    },
    con: function (sss,a){
        console.log(sss,a);
    }
};


var sideOf = function (side, position) {
    var x = side * oneCell + xB,
        y = oneCell*position + yB;

    return {
        layer:true,
        groups: ['maze'],
        strokeStyle: 'black',
        strokeWidth: 3,
        x1: x, y1: y,
        x2: x, y2: y+oneCell
    }

};

var spaceOf = function (space, position) {
    var x = space * oneCell + xB,
        y = oneCell * (position+1) + yB;


    return {
        layer:true,
        groups: ['maze'],
        strokeStyle: 'black',
        strokeWidth: 3,
        x1: x, y1: y,
        x2: x+oneCell, y2: y
    }
};

module.exports = Painter;

/***/ }),
/* 1 */
/***/ (function(module, exports) {


var stroke = {
    space: [],
    side: []
};

var matrix = [];

var width = [],
    lower = [],
    side = [];

function MadeSideMatrix(shirina,kolStr) {

    //for (var a = 0; a < width.length; a++) {
    //    if (( width[a] != width[a + 1] ) && rand()) {
    //        width[a + 1] = width[a];
    //    }
    //}

    shirina -= shirina/2;
    kolStr -= kolStr/2;

    SetShirina(shirina);

    while (kolStr) {

        for (var a = 0; a < width.length; a++) {
            if( width[a] == width[a + 1] ){
                side.push(a);
            } else if (rand()) {
                width[a + 1] = width[a];
            }
        }

        for (var b = 0; b < width.length; b++) {
            if (( width[b] != width[b + 1] ) && ( width[b] == width[b - 1] || width[b + 1] == width[b + 2])) {
                side.push(b);
            }
        }

        for (var c = 0; c < width.length; c++) {
            if (( width[c] == width[c + 1] ) && rand()) {
                lower.push(c);
            }
        }

        matrix.push(new Stroke(side, lower, width));

        for (var i = 0; i<lower.length; i++){
            width[lower[i]]= -1;
        }

        side = [];
        lower = [];

        for (var f = 0 ; f< width.length-1; f++){

            if(width[f] == -1){
                findPred(f);
            } else if (width[f] != width[f+1]){
                width[f+1] = width[f] + 1;
            }
        }


        kolStr--;

    }
    //console.log(matrix);

    return matrix;

}

function SetShirina(s){
    for (var t = 0; t < s; t++){
        width.push(t);
    }
}

function findPred(p){

    for (var k = p; k < width.length; k++){
        if(width[k] != -1){
            width[p] = width[k] - 1;
            break;
        }
    }

}

function rand() {
    var a = Math.floor(Math.random() * 2 + 0.4);
    return a < 0 ? 0 : a;
}


var Stroke  = function (side, space, s){
    return stroke = {
        space: space,
        side: side
    };
};


module.exports = MadeSideMatrix;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Painter = __webpack_require__(0);
var Generater = __webpack_require__(1);

var paramsUserRect = {};
var MazeLayer = '';
var matrix = [
    {
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    }
];

var can = $('#lines'),
    widthM = 0,
    heightM = 0,
    cell = 50;

var added = 0,
    userRect = {};

var DownFunc = {},
    MoveFunc = {},
    UpFunc = {};

var Menu = Palitra();

can.attr({
    height: window.innerHeight,
    width: window.innerWidth
});

widthM = can.attr('width');
heightM = can.attr('height');

var Main = {
    draw: function () {

        can.drawRect({
            layer: true,
            name: 'place',
            translateX: widthM/2-3,
            translateY: heightM/2-3,
            strokeWidth: 3,
            strokeStyle: 'black',
            height: heightM-50,
            width: widthM-50,

            mousedown: function DownS(layer) {
                can.drawLine({
                    index:0,
                    layer: true,
                    name: 'userRect',
                    strokeWidth:2,
                    strokeStyle: 'black',
                    x1: layer.eventX, y1: layer.eventY,
                    closed: true

                });
                 added = 1;
                DownFunc = DownS;
                userRect = can.getLayer('userRect');
            },
            mousemove: function MoveS(layer) {
                if(added) {
                    can.setLayer('userRect', {
                        x2: userRect.eventX , y2: userRect.y1,
                        x3: userRect.eventX, y3: userRect.eventY,
                        x4: userRect.x1, y4: userRect.eventY
                    });
                    MoveFunc = MoveS;
                }
            },

            mouseup : function UpS(layer){
                added = 0;
                UpFunc = UpS;

                var menuX = userRect.x3,
                    menuY = userRect.y3;
                if(userRect.x3 < userRect.x1 && userRect.y3 > userRect.y1) {
                    menuX = userRect.x1;
                    menuY = userRect.y1;
                }
                Menu.show(menuX, menuY);

                Place.clrProper();

                var xB, yB;

                    if(userRect.x3 < userRect.x1){
                       if(userRect.y3 < userRect.y1){
                           xB = userRect.x3;
                           yB = userRect.y3;
                       } else {
                           xB = userRect.x2;
                           yB = userRect.y2;
                       }
                    } else {
                        if(userRect.y3 < userRect.y1){
                            xB = userRect.x4;
                            yB = userRect.y4;
                        } else {
                            xB = userRect.x1;
                            yB = userRect.y1;
                        }
                    }

                    paramsUserRect = {
                    width : function () {
                      return Math.abs(userRect.x1 - userRect.x3)
                    }(),

                    height : function () {
                      return Math.abs(userRect.y1 - userRect.y3)
                    }(),

                    x: xB,
                    y: yB
                };
                //console.log(Generater(paramsUserRect.width, paramsUserRect.height));
                //matrix = Generater(paramsUserRect.width, paramsUserRect.height);
               // console.log(matrix);
                Painter.oneLine(matrix,paramsUserRect);
                MazeLayer = can.getLayerGroup('maze');
            }
        });
    },
    getRect:  userRect
};


var fl = 0;

function Palitra() {
    return {
        show: function (x, y) {

            var offsetX = 20;

            var cellH = 50,
                cellW = 50;

            var reset = this.resetTile(x,y),
                play = this.playTile(x,y),
                color = this.colorTile(x,y);
            //!added ? 1: Hide(0);

            can.addLayer(reset).addLayer(play).addLayer(color);


        },

        offsetX: 20,
        cellH: 50,

        resetTile: function(x, y) {
            var cell = this.cellH;

            return {
                type: 'image',
                name: 'reset',
                source: './img/reset.png',
                width: 30,
                height: 30,
                x: x + this.offsetX, y: y - this.offsetX,
                click: function (layer) {
                    Place.giveProper();
                    can.removeLayer('reset');
                    can.removeLayer('play');
                    can.removeLayer('userRect');
                    can.removeLayer('color');
                    cell = 50;
                    can.removeLayerGroup(MazeLayer);

                }
            }
        },

        playTile: function (x, y) {

            return {
               type: 'image',
               name: 'play',
               source: './img/play.png',
               width: 30,
               height: 30,
               x: x + this.offsetX, y: y - this.cellH,
               mousedown: function (layer) {
               }
           }
        },


        colorTile: function (x,y) {
            var color = 'green';
            return {
                type: 'rectangle',
                name: 'color',
                width: 30,
                height: 30,
                fillStyle: color,
                x: x+this.offsetX,
                y:y-this.cellH*2,
                click: function () {
                    can.getLayer('userRect').strokeStyle = color;
                    can.setLayerGroup(MazeLayer,{
                        strokeStyle: color
                    })
                }
            }
        }
    }
};


var Place = {

    clrProper: function () {
        var a = getPlace();
        a.mousemove = '';
        a.mousedown = '';
        a.mouseup= '';

    },

    giveProper: function(){
        var a = getPlace();
        a.mousedown = DownFunc;
        a.mousemove = MoveFunc;
        a.mouseup = UpFunc;
    }
};

function getPlace(){
    return can.getLayer('place');
}

module.exports = Main;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "h1{\r\n    color: red;\r\n}\r\ncanvas{\r\n\r\n}\r\n\r\n#reset{\r\n\r\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
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
};

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
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
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
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
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
		update = updateLink.bind(null, styleElement, options);
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

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(3);

var madeSides = __webpack_require__(1);
var painter = __webpack_require__(0);
var user = __webpack_require__(2);
user.draw();

var matrix = [
    {
        side: [0, 3, 5, 7, 9],
        space: [0, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    },{
        side: [1, 3, 5, 7, 9],
        space: [1, 3 , 5, 7 , 9]
    }
];



//var mat = madeSides(10,9);

//painter.oneLine(matrix, matrix.length, matrix.length);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map