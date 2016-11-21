(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["OptimalSelect"] = factory();
	else
		root["OptimalSelect"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.common = exports.optimize = exports.getMultiSelector = exports.getSingleSelector = exports.select = undefined;
	
	var _select2 = __webpack_require__(1);
	
	Object.defineProperty(exports, 'getSingleSelector', {
	  enumerable: true,
	  get: function get() {
	    return _select2.getSingleSelector;
	  }
	});
	Object.defineProperty(exports, 'getMultiSelector', {
	  enumerable: true,
	  get: function get() {
	    return _select2.getMultiSelector;
	  }
	});
	
	var _select3 = _interopRequireDefault(_select2);
	
	var _optimize2 = __webpack_require__(5);
	
	var _optimize3 = _interopRequireDefault(_optimize2);
	
	var _common2 = __webpack_require__(6);
	
	var _common = _interopRequireWildcard(_common2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.select = _select3.default;
	exports.optimize = _optimize3.default;
	exports.common = _common;
	exports.default = _select3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * # Select
	                                                                                                                                                                                                                                                                               *
	                                                                                                                                                                                                                                                                               * Construct a unique CSS queryselector to access the selected DOM element(s).
	                                                                                                                                                                                                                                                                               * Applies different matching and optimization strategies for efficiency.
	                                                                                                                                                                                                                                                                               */
	
	exports.default = getQuerySelector;
	exports.getSingleSelector = getSingleSelector;
	exports.getMultiSelector = getMultiSelector;
	
	var _adapt = __webpack_require__(2);
	
	var _adapt2 = _interopRequireDefault(_adapt);
	
	var _match = __webpack_require__(3);
	
	var _match2 = _interopRequireDefault(_match);
	
	var _optimize = __webpack_require__(5);
	
	var _optimize2 = _interopRequireDefault(_optimize);
	
	var _utilities = __webpack_require__(4);
	
	var _common = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Choose action depending on the input (single/multi)
	 *
	 * @param  {HTMLElement|Array.<HTMLElement>} input   - [description]
	 * @param  {Object}                          options - [description]
	 * @return {string}                                  - [description]
	 */
	function getQuerySelector(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  console.log("OptimalSelect getQuerySelector is here ", arguments);
	
	  if (!input.length) {
	    return getSingleSelector(input, options);
	  }
	  return getMultiSelector(input, options);
	}
	
	/**
	 * Get a selector for the provided element
	 *
	 * @param  {HTMLElement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	function getSingleSelector(element) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	
	  if (element.nodeType === 3) {
	    element = element.parentNode;
	  }
	  if (element.nodeType !== 1) {
	    throw new Error('Invalid input - only HTMLElements or representations of them are supported! (not "' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '")');
	  }
	
	  var globalModified = (0, _adapt2.default)(element, options);
	
	  var selector = (0, _match2.default)(element, options);
	
	  console.log(" getSingleSelector 0", selector, options);
	
	  var optimized = (0, _optimize2.default)(selector, element, options);
	
	  console.log(" getSingleSelector 1 ", selector, optimized);
	
	  // debug
	  // console.log(`
	  //   selector:  ${selector}
	  //   optimized: ${optimized}
	  // `)
	
	  if (globalModified) {
	    delete global.document;
	  }
	
	  return optimized;
	}
	
	/**
	 * Get a selector to match multiple descendants from an ancestor
	 *
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @param  {Object}              options  - [description]
	 * @return {string}                       - [description]
	 */
	function getMultiSelector(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	
	  console.log(" csk8855 getMultiSelector ");
	
	  if (!Array.isArray(elements)) {
	    elements = (0, _utilities.convertNodeList)(elements);
	  }
	
	  if (elements.some(function (element) {
	    return element.nodeType !== 1;
	  })) {
	    throw new Error('Invalid input - only an Array of HTMLElements or representations of them is supported!');
	  }
	
	  var globalModified = (0, _adapt2.default)(elements[0], options);
	
	  var ancestor = (0, _common.getCommonAncestor)(elements, options);
	  var ancestorSelector = getSingleSelector(ancestor, options);
	
	  // TODO: consider usage of multiple selectors + parent-child relation + check for part redundancy
	  var commonSelectors = getCommonSelectors(elements);
	  var descendantSelector = commonSelectors[0];
	
	  var selector = (0, _optimize2.default)(ancestorSelector + ' ' + descendantSelector, elements, options);
	  var selectorMatches = (0, _utilities.convertNodeList)(document.querySelectorAll(selector));
	
	  if (!elements.every(function (element) {
	    return selectorMatches.some(function (entry) {
	      return entry === element;
	    });
	  })) {
	    // TODO: cluster matches to split into similar groups for sub selections
	    return console.warn('\n      The selected elements can\'t be efficiently mapped.\n      Its probably best to use multiple single selectors instead!\n    ', elements);
	  }
	
	  if (globalModified) {
	    delete global.document;
	  }
	
	  return selector;
	}
	
	/**
	 * Get selectors to describe a set of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {string}                        - [description]
	 */
	function getCommonSelectors(elements) {
	
	  console.log("csk8855 getCommonSelectors ", elements);
	
	  var _getCommonProperties = (0, _common.getCommonProperties)(elements),
	      classes = _getCommonProperties.classes,
	      attributes = _getCommonProperties.attributes,
	      tag = _getCommonProperties.tag;
	
	  var selectorPath = [];
	
	  if (tag) {
	    selectorPath.push(tag);
	  }
	
	  if (classes) {
	    var classSelector = classes.map(function (name) {
	      return '.' + name;
	    }).join('');
	    console.log("classSelector on optString ", classSelector);
	    selectorPath.push(classSelector);
	  }
	
	  if (attributes) {
	    var attributeSelector = Object.keys(attributes).reduce(function (parts, name) {
	      parts.push('[' + name + '="' + attributes[name] + '"]');
	      return parts;
	    }, []).join('');
	    selectorPath.push(attributeSelector);
	  }
	
	  if (selectorPath.length) {
	    // TODO: check for parent-child relation
	  }
	
	  return [selectorPath.join('')];
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = adapt;
	/**
	 * # Adapt
	 *
	 * Check and extend the environment for universal usage
	 */
	
	/**
	 * Modify the context based on the environment
	 *
	 * @param  {HTMLELement} element - [description]
	 * @param  {Object}      options - [description]
	 * @return {boolean}             - [description]
	 */
	function adapt(element, options) {
	
	  // detect environment setup
	  if (global.document) {
	    return false;
	  }
	
	  var context = options.context;
	
	
	  global.document = context || function () {
	    var root = element;
	    while (root.parent) {
	      root = root.parent;
	    }
	    return root;
	  }();
	
	  // https://github.com/fb55/domhandler/blob/master/index.js#L75
	  var ElementPrototype = Object.getPrototypeOf(global.document);
	
	  // alternative descriptor to access elements with filtering invalid elements (e.g. textnodes)
	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'childTags')) {
	    Object.defineProperty(ElementPrototype, 'childTags', {
	      enumerable: true,
	      get: function get() {
	        return this.children.filter(function (node) {
	          // https://github.com/fb55/domelementtype/blob/master/index.js#L12
	          return node.type === 'tag' || node.type === 'script' || node.type === 'style';
	        });
	      }
	    });
	  }
	
	  if (!Object.getOwnPropertyDescriptor(ElementPrototype, 'attributes')) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
	    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
	    Object.defineProperty(ElementPrototype, 'attributes', {
	      enumerable: true,
	      get: function get() {
	        var attribs = this.attribs;
	
	        var attributesNames = Object.keys(attribs);
	        var NamedNodeMap = attributesNames.reduce(function (attributes, attributeName, index) {
	          attributes[index] = {
	            name: attributeName,
	            value: attribs[attributeName]
	          };
	          return attributes;
	        }, {});
	        Object.defineProperty(NamedNodeMap, 'length', {
	          enumerable: false,
	          configurable: false,
	          value: attributesNames.length
	        });
	        return NamedNodeMap;
	      }
	    });
	  }
	
	  if (!ElementPrototype.getAttribute) {
	    // https://docs.webplatform.org/wiki/dom/Element/getAttribute
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
	    ElementPrototype.getAttribute = function (name) {
	      return this.attribs[name] || null;
	    };
	  }
	
	  if (!ElementPrototype.getElementsByTagName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByTagName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
	    ElementPrototype.getElementsByTagName = function (tagName) {
	      var HTMLCollection = [];
	      traverseDescendants(this.childTags, function (descendant) {
	        if (descendant.name === tagName || tagName === '*') {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }
	
	  if (!ElementPrototype.getElementsByClassName) {
	    // https://docs.webplatform.org/wiki/dom/Document/getElementsByClassName
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
	    ElementPrototype.getElementsByClassName = function (className) {
	      var names = className.trim().replace(/\s+/g, ' ').split(' ');
	      var HTMLCollection = [];
	      traverseDescendants([this], function (descendant) {
	        var descendantClassName = descendant.attribs.class;
	        if (descendantClassName && names.every(function (name) {
	          return descendantClassName.indexOf(name) > -1;
	        })) {
	          HTMLCollection.push(descendant);
	        }
	      });
	      return HTMLCollection;
	    };
	  }
	
	  if (!ElementPrototype.querySelectorAll) {
	    // https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
	    ElementPrototype.querySelectorAll = function (selectors) {
	      var _this = this;
	
	      selectors = selectors.replace(/(>)(\S)/g, '$1 $2').trim(); // add space for '>' selector
	
	      // using right to left execution => https://github.com/fb55/css-select#how-does-it-work
	      var instructions = getInstructions(selectors);
	      var discover = instructions.shift();
	
	      var total = instructions.length;
	      return discover(this).filter(function (node) {
	        var step = 0;
	        while (step < total) {
	          node = instructions[step](node, _this);
	          if (!node) {
	            // hierarchy doesn't match
	            return false;
	          }
	          step += 1;
	        }
	        return true;
	      });
	    };
	  }
	
	  if (!ElementPrototype.contains) {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
	    ElementPrototype.contains = function (element) {
	      var inclusive = false;
	      traverseDescendants([this], function (descendant, done) {
	        if (descendant === element) {
	          inclusive = true;
	          done();
	        }
	      });
	      return inclusive;
	    };
	  }
	
	  return true;
	}
	
	/**
	 * Retrieve transformation steps
	 *
	 * @param  {Array.<string>}   selectors - [description]
	 * @return {Array.<Function>}           - [description]
	 */
	function getInstructions(selectors) {
	  return selectors.split(' ').reverse().map(function (selector, step) {
	    var discover = step === 0;
	
	    var _selector$split = selector.split(':'),
	        _selector$split2 = _slicedToArray(_selector$split, 2),
	        type = _selector$split2[0],
	        pseudo = _selector$split2[1];
	
	    var validate = null;
	    var instruction = null;
	
	    (function () {
	      switch (true) {
	
	        // child: '>'
	        case />/.test(type):
	          instruction = function checkParent(node) {
	            return function (validate) {
	              return validate(node.parent) && node.parent;
	            };
	          };
	          break;
	
	        // class: '.'
	        case /^\./.test(type):
	          var names = type.substr(1).split('.');
	          validate = function validate(node) {
	            var nodeClassName = node.attribs.class;
	            return nodeClassName && names.every(function (name) {
	              return nodeClassName.indexOf(name) > -1;
	            });
	          };
	          instruction = function checkClass(node, root) {
	            if (discover) {
	              return node.getElementsByClassName(names.join(' '));
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;
	
	        // attribute: '[key="value"]'
	        case /^\[/.test(type):
	          var _type$replace$split = type.replace(/\[|\]|"/g, '').split('='),
	              _type$replace$split2 = _slicedToArray(_type$replace$split, 2),
	              attributeKey = _type$replace$split2[0],
	              attributeValue = _type$replace$split2[1];
	
	          validate = function validate(node) {
	            var hasAttribute = Object.keys(node.attribs).indexOf(attributeKey) > -1;
	            if (hasAttribute) {
	              // regard optional attributeValue
	              if (!attributeValue || node.attribs[attributeKey] === attributeValue) {
	                return true;
	              }
	            }
	            return false;
	          };
	          instruction = function checkAttribute(node, root) {
	            if (discover) {
	              var _ret2 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();
	
	              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;
	
	        // id: '#'
	        case /^#/.test(type):
	          var id = type.substr(1);
	          validate = function validate(node) {
	            return node.attribs.id === id;
	          };
	          instruction = function checkId(node, root) {
	            if (discover) {
	              var _ret3 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant, done) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                    done();
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();
	
	              if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;
	
	        // universal: '*'
	        case /\*/.test(type):
	          validate = function validate(node) {
	            return true;
	          };
	          instruction = function checkUniversal(node, root) {
	            if (discover) {
	              var _ret4 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  return NodeList.push(descendant);
	                });
	                return {
	                  v: NodeList
	                };
	              }();
	
	              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	          break;
	
	        // tag: '...'
	        default:
	          validate = function validate(node) {
	            return node.name === type;
	          };
	          instruction = function checkTag(node, root) {
	            if (discover) {
	              var _ret5 = function () {
	                var NodeList = [];
	                traverseDescendants([node], function (descendant) {
	                  if (validate(descendant)) {
	                    NodeList.push(descendant);
	                  }
	                });
	                return {
	                  v: NodeList
	                };
	              }();
	
	              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
	            }
	            return typeof node === 'function' ? node(validate) : getAncestor(node, root, validate);
	          };
	      }
	    })();
	
	    if (!pseudo) {
	      return instruction;
	    }
	
	    var rule = pseudo.match(/-(child|type)\((\d+)\)$/);
	    var kind = rule[1];
	    var index = parseInt(rule[2], 10) - 1;
	
	    var validatePseudo = function validatePseudo(node) {
	      if (node) {
	        var compareSet = node.parent.childTags;
	        if (kind === 'type') {
	          compareSet = compareSet.filter(validate);
	        }
	        var nodeIndex = compareSet.findIndex(function (child) {
	          return child === node;
	        });
	        if (nodeIndex === index) {
	          return true;
	        }
	      }
	      return false;
	    };
	
	    return function enhanceInstruction(node) {
	      var match = instruction(node);
	      if (discover) {
	        return match.reduce(function (NodeList, matchedNode) {
	          if (validatePseudo(matchedNode)) {
	            NodeList.push(matchedNode);
	          }
	          return NodeList;
	        }, []);
	      }
	      return validatePseudo(match) && match;
	    };
	  });
	}
	
	/**
	 * Walking recursive to invoke callbacks
	 *
	 * @param {Array.<HTMLElement>} nodes   - [description]
	 * @param {Function}            handler - [description]
	 */
	function traverseDescendants(nodes, handler) {
	  nodes.forEach(function (node) {
	    var progress = true;
	    handler(node, function () {
	      return progress = false;
	    });
	    if (node.childTags && progress) {
	      traverseDescendants(node.childTags, handler);
	    }
	  });
	}
	
	/**
	 * Bubble up from bottom to top
	 *
	 * @param  {HTMLELement} node     - [description]
	 * @param  {HTMLELement} root     - [description]
	 * @param  {Function}    validate - [description]
	 * @return {HTMLELement}          - [description]
	 */
	function getAncestor(node, root, validate) {
	  while (node.parent) {
	    node = node.parent;
	    if (validate(node)) {
	      return node;
	    }
	    if (node === root) {
	      break;
	    }
	  }
	  return null;
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = match;
	
	var _utilities = __webpack_require__(4);
	
	var defaultIgnore = {
	  attribute: function attribute(attributeName) {
	    return ['style', 'data-reactid', 'data-react-checksum'].indexOf(attributeName) > -1;
	  }
	};
	
	/**
	 * Get the path of the element
	 *
	 * @param  {HTMLElement} node    - [description]
	 * @param  {Object}      options - [description]
	 * @return {string}              - [description]
	 */
	/**
	 * # Match
	 *
	 * Retrieves selector
	 */
	
	function match(node, options) {
	  var _options$root = options.root,
	      root = _options$root === undefined ? document : _options$root,
	      _options$skip = options.skip,
	      skip = _options$skip === undefined ? null : _options$skip,
	      _options$priority = options.priority,
	      priority = _options$priority === undefined ? ['id', 'class', 'href', 'src'] : _options$priority,
	      _options$ignore = options.ignore,
	      ignore = _options$ignore === undefined ? {} : _options$ignore;
	
	
	  var path = [];
	  var element = node;
	  var length = path.length;
	
	  var skipCompare = skip && (Array.isArray(skip) ? skip : [skip]).map(function (entry) {
	    if (typeof entry !== 'function') {
	      return function (element) {
	        return element === entry;
	      };
	    }
	    return entry;
	  });
	
	  var skipChecks = function skipChecks(element) {
	    return skip && skipCompare.some(function (compare) {
	      return compare(element);
	    });
	  };
	
	  var ignoreClass = false;
	
	  Object.keys(ignore).forEach(function (type) {
	    if (type === 'class') {
	      ignoreClass = true;
	    }
	    var predicate = ignore[type];
	    if (typeof predicate === 'function') return;
	    if (typeof predicate === 'number') {
	      predicate = predicate.toString();
	    }
	    if (typeof predicate === 'string') {
	      predicate = new RegExp((0, _utilities.escapeValue)(predicate).replace(/\\/g, '\\\\'));
	    }
	    // check class-/attributename for regex
	    ignore[type] = predicate.test.bind(predicate);
	  });
	
	  if (ignoreClass) {
	    (function () {
	      var ignoreAttribute = ignore.attribute;
	      ignore.attribute = function (name, value, defaultPredicate) {
	        return ignore.class(value) || ignoreAttribute && ignoreAttribute(name, value, defaultPredicate);
	      };
	    })();
	  }
	
	  while (element !== root) {
	
	    if (skipChecks(element) !== true) {
	      // global
	      if (checkId(element, path, ignore)) break;
	      if (checkClassGlobal(element, path, ignore, root)) break;
	      if (checkAttributeGlobal(element, path, ignore, root, priority)) break;
	      if (checkTagGlobal(element, path, ignore, root)) break;
	
	      // local
	      checkClassLocal(element, path, ignore);
	
	      // define only one selector each iteration
	      if (path.length === length) {
	        checkAttributeLocal(element, path, ignore, priority);
	      }
	      if (path.length === length) {
	        checkTagLocal(element, path, ignore);
	      }
	
	      if (path.length === length) {
	        checkClassChild(element, path, ignore);
	      }
	      if (path.length === length) {
	        checkAttributeChild(element, path, ignore, priority);
	      }
	      if (path.length === length) {
	        checkTagChild(element, path, ignore);
	      }
	    }
	
	    element = element.parentNode;
	    length = path.length;
	  }
	
	  if (element === root) {
	    path.unshift('*');
	  }
	
	  return path.join(' ');
	}
	
	/**
	 * Preset 'checkClass' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassGlobal(element, path, ignore, root) {
	  // console.log(" checkClassGlobal is here ",element, path, ignore, root);
	  return checkClass(element, path, ignore, root);
	}
	
	/**
	 * Preset 'checkClass' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassLocal(element, path, ignore) {
	  // console.log( " checkClassLocal is here ",element, path, ignore);
	  return checkClass(element, path, ignore, element.parentNode);
	}
	
	/**
	 * Preset 'checkChild' with class data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClassChild(element, path, ignore) {
	  var className = (0, _utilities.escapeValue)(element.getAttribute('class'));
	
	  // console.log(" checkClassChild ",element, path, ignore);
	
	  if (checkIgnore(ignore.class, className)) {
	    return false;
	  }
	  return checkChild(element, path, '.' + className.trim().replace(/\s+/g, '.'));
	}
	
	/**
	 * Preset 'checkAttribute' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeGlobal(element, path, ignore, root, priority) {
	  return checkAttribute(element, path, ignore, root, priority);
	}
	
	/**
	 * Preset 'checkAttribute' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeLocal(element, path, ignore, priority) {
	  return checkAttribute(element, path, ignore, element.parentNode, priority);
	}
	
	/**
	 * Preset 'checkChild' with attribute data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttributeChild(element, path, ignore, priority) {
	  var attributes = element.attributes;
	  return Object.keys(attributes).sort(orderByPriority(attributes, priority)).some(function (key) {
	    var attribute = attributes[key];
	    var attributeName = attribute.name;
	    var attributeValue = (0, _utilities.escapeValue)(attribute.value);
	    if (checkIgnore(ignore.attribute, attributeName, attributeValue, defaultIgnore.attribute)) {
	      return false;
	    }
	    var pattern = '[' + attributeName + '="' + attributeValue + '"]';
	    return checkChild(element, path, pattern);
	  });
	}
	
	/**
	 * Preset 'checkTag' with global data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagGlobal(element, path, ignore, root) {
	  return checkTag(element, path, ignore, root);
	}
	
	/**
	 * Preset 'checkTag' with local data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagLocal(element, path, ignore) {
	  return checkTag(element, path, ignore, element.parentNode);
	}
	
	/**
	 * Preset 'checkChild' with tag data
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTagChild(element, path, ignore) {
	  var tagName = element.tagName.toLowerCase();
	  if (checkIgnore(ignore.tag, tagName)) {
	    return false;
	  }
	  return checkChild(element, path, tagName);
	}
	
	/**
	 * Lookup unique identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkId(element, path, ignore) {
	  var id = (0, _utilities.escapeValue)(element.getAttribute('id'));
	  if (checkIgnore(ignore.id, id)) {
	    return false;
	  }
	  path.unshift('#' + id);
	  return true;
	}
	
	/**
	 * Lookup class identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkClass(element, path, ignore, parent) {
	  var className = (0, _utilities.escapeValue)(element.getAttribute('class'));
	
	  if (checkIgnore(ignore.class, className)) {
	    return false;
	  }
	
	  if (element.classList.length > 0) {
	    var classNameList = element.classList;
	    var nclassName = "";
	
	    for (var i = 0; i < classNameList.length; i++) {
	      if (parent.getElementsByClassName(classNameList[i]).length == 1) {
	        className = classNameList[i];
	        break;
	      }
	    }
	  }
	
	  var matches = parent.getElementsByClassName(className);
	
	  if (matches.length === 1) {
	    path.unshift('.' + className.trim().replace(/\s+/g, '.'));
	    return true;
	  }
	  return false;
	}
	
	/**
	 * Lookup attribute identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {Object}         ignore  - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkAttribute(element, path, ignore, parent, priority) {
	  var attributes = element.attributes;
	  return Object.keys(attributes).sort(orderByPriority(attributes, priority)).some(function (key) {
	    var attribute = attributes[key];
	    var attributeName = attribute.name;
	    var attributeValue = (0, _utilities.escapeValue)(attribute.value);
	    if (checkIgnore(ignore.attribute, attributeName, attributeValue, defaultIgnore.attribute)) {
	      return false;
	    }
	    var pattern = '[' + attributeName + '="' + attributeValue + '"]';
	    var matches = parent.querySelectorAll(pattern);
	    if (matches.length === 1) {
	      path.unshift(pattern);
	      return true;
	    }
	  });
	}
	
	/**
	 * Lookup tag identifier
	 *
	 * @param  {HTMLElement}    element - [description]
	 * @param  {Array.<string>} path    - [description]
	 * @param  {HTMLElement}    parent  - [description]
	 * @param  {Object}         ignore  - [description]
	 * @return {boolean}                - [description]
	 */
	function checkTag(element, path, ignore, parent) {
	  var tagName = element.tagName.toLowerCase();
	  if (checkIgnore(ignore.tag, tagName)) {
	    return false;
	  }
	  var matches = parent.getElementsByTagName(tagName);
	  if (matches.length === 1) {
	    path.unshift(tagName);
	    return true;
	  }
	  return false;
	}
	
	/**
	 * Lookup child identfier
	 *
	 * Note: childTags is a custom property to use a view filter for tags on for virutal elements
	 *
	 * @param  {HTMLElement}    element  - [description]
	 * @param  {Array.<string>} path     - [description]
	 * @param  {String}         selector - [description]
	 * @return {boolean}                 - [description]
	 */
	function checkChild(element, path, selector) {
	  var parent = element.parentNode;
	  var children = parent.childTags || parent.children;
	  for (var i = 0, l = children.length; i < l; i++) {
	    if (children[i] === element) {
	      path.unshift('> ' + selector + ':nth-child(' + (i + 1) + ')');
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Validate with custom and default functions
	 *
	 * @param  {Function} predicate        - [description]
	 * @param  {string}   name             - [description]
	 * @param  {string}   value            - [description]
	 * @param  {Function} defaultPredicate - [description]
	 * @return {boolean}                   - [description]
	 */
	function checkIgnore(predicate, name, value, defaultPredicate) {
	  if (!name) {
	    return true;
	  }
	  var check = predicate || defaultPredicate;
	  if (!check) {
	    return false;
	  }
	  return check(name, value || name, defaultPredicate);
	}
	
	/**
	 * Rank the attribute names by their general relevance for a website
	 *
	 * @param  {Object}   attributes - [description]
	 * @param  {Array}    priority   - [description]
	 * @return {Function}            - [description]
	 */
	function orderByPriority(attributes, priority) {
	  return function (curr, next) {
	    return priority.indexOf(attributes[curr].name) - priority.indexOf(attributes[next].name);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertNodeList = convertNodeList;
	exports.escapeValue = escapeValue;
	/**
	 * # Utilities
	 *
	 * Convenience helpers
	 */
	
	/**
	 * Create an array with the DOM nodes of the list
	 *
	 * @param  {NodeList}             nodes - [description]
	 * @return {Array.<HTMLElement>}        - [description]
	 */
	function convertNodeList(nodes) {
	  var length = nodes.length;
	
	  var arr = new Array(length);
	  for (var i = 0; i < length; i++) {
	    arr[i] = nodes[i];
	  }
	  return arr;
	}
	
	/**
	 * Escape special characters like quotes and backslashes
	 *
	 * Description of valid characters: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Notes
	 *
	 * @param  {String?} value - [description]
	 * @return {String}        - [description]
	 */
	function escapeValue(value) {
	  return value && value.replace(/['"`\\/:\?&!#$%^()[\]{|}*+;,.<=>@~]/g, '\\$&');
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = optimize;
	
	var _adapt = __webpack_require__(2);
	
	var _adapt2 = _interopRequireDefault(_adapt);
	
	var _utilities = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Apply different optimization techniques
	 *
	 * @param  {string}                          selector - [description]
	 * @param  {HTMLElement|Array.<HTMLElement>} element  - [description]
	 * @param  {Object}                          options  - [description]
	 * @return {string}                                   - [description]
	 */
	/**
	 * # Optimize
	 *
	 * 1.) Improve efficiency through shorter selectors by removing redundancy
	 * 2.) Improve robustness through selector transformation
	 */
	
	function optimize(selector, elements) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	
	  console.log(" OptimalSelect  ", selector, options);
	  console.trace();
	
	  // convert single entry and NodeList
	  if (!Array.isArray(elements)) {
	    elements = !elements.length ? [elements] : (0, _utilities.convertNodeList)(elements);
	  }
	
	  if (!elements.length || elements.some(function (element) {
	    return element.nodeType !== 1;
	  })) {
	    throw new Error('Invalid input - to compare HTMLElements its necessary to provide a reference of the selected node(s)! (missing "elements")');
	  }
	
	  var globalModified = (0, _adapt2.default)(elements[0], options);
	
	  // chunk parts outside of quotes (http://stackoverflow.com/a/25663729)
	  var path = selector.replace(/> /g, '>').split(/\s+(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	
	  if (path.length < 2) {
	    return optimizePart('', selector, '', elements);
	  }
	
	  var shortened = [path.pop()];
	  while (path.length > 1) {
	    var current = path.pop();
	    var prePart = path.join(' ');
	    var postPart = shortened.join(' ');
	
	    var pattern = prePart + ' ' + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (matches.length !== elements.length) {
	      shortened.unshift(optimizePart(prePart, current, postPart, elements));
	    }
	  }
	  shortened.unshift(path[0]);
	  path = shortened;
	
	  // optimize start + end
	  path[0] = optimizePart('', path[0], path.slice(1).join(' '), elements);
	  path[path.length - 1] = optimizePart(path.slice(0, -1).join(' '), path[path.length - 1], '', elements);
	
	  if (globalModified) {
	    delete global.document;
	  }
	
	  return path.join(' ').replace(/>/g, '> ').trim();
	}
	
	/**
	 * Improve a chunk of the selector
	 *
	 * @param  {string}              prePart  - [description]
	 * @param  {string}              current  - [description]
	 * @param  {string}              postPart - [description]
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {string}                       - [description]
	 */
	function optimizePart(prePart, current, postPart, elements) {
	  if (prePart.length) prePart = prePart + ' ';
	  if (postPart.length) postPart = ' ' + postPart;
	
	  // robustness: attribute without value (generalization)
	  if (/\[*\]/.test(current)) {
	    var key = current.replace(/=.*$/, ']');
	    var pattern = '' + prePart + key + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = key;
	    } else {
	      // robustness: replace specific key-value with base tag (heuristic)
	      var references = document.querySelectorAll('' + prePart + key);
	
	      var _loop = function _loop() {
	        var reference = references[i];
	        if (elements.some(function (element) {
	          return reference.contains(element);
	        })) {
	          var description = reference.tagName.toLowerCase();
	          pattern = '' + prePart + description + postPart;
	          matches = document.querySelectorAll(pattern);
	
	          if (compareResults(matches, elements)) {
	            current = description;
	          }
	          return 'break';
	        }
	      };
	
	      for (var i = 0, l = references.length; i < l; i++) {
	        var pattern;
	        var matches;
	
	        var _ret = _loop();
	
	        if (_ret === 'break') break;
	      }
	    }
	  }
	
	  // robustness: descendant instead child (heuristic)
	  if (/>/.test(current)) {
	    var descendant = current.replace(/>/, '');
	    var pattern = '' + prePart + descendant + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = descendant;
	    }
	  }
	
	  // robustness: 'nth-of-type' instead 'nth-child' (heuristic)
	  if (/:nth-child/.test(current)) {
	    // TODO: consider complete coverage of 'nth-of-type' replacement
	    var type = current.replace(/nth-child/g, 'nth-of-type');
	    var pattern = '' + prePart + type + postPart;
	    var matches = document.querySelectorAll(pattern);
	    if (compareResults(matches, elements)) {
	      current = type;
	    }
	  }
	
	  // efficiency: combinations of classname (partial permutations)
	  if (/\.\S+\.\S+/.test(current)) {
	    var names = current.trim().split('.').slice(1).map(function (name) {
	      return '.' + name;
	    }).sort(function (curr, next) {
	      return curr.length - next.length;
	    });
	    while (names.length) {
	      var partial = current.replace(names.shift(), '').trim();
	      var pattern = ('' + prePart + partial + postPart).trim();
	      if (!pattern.length || pattern.charAt(0) === '>') {
	        break;
	      }
	      var matches = document.querySelectorAll(pattern);
	      if (compareResults(matches, elements)) {
	        current = partial;
	      }
	    }
	    // robustness: degrade complex classname (heuristic)
	    if (current && current.match(/\./g).length > 2) {
	      var _references = document.querySelectorAll('' + prePart + current);
	
	      var _loop2 = function _loop2() {
	        var reference = _references[i];
	        if (elements.some(function (element) {
	          return reference.contains(element);
	        })) {
	          // TODO:
	          // - check using attributes + regard excludes
	          var description = reference.tagName.toLowerCase();
	          pattern = '' + prePart + description + postPart;
	          matches = document.querySelectorAll(pattern);
	
	          if (compareResults(matches, elements)) {
	            current = description;
	          }
	          return 'break';
	        }
	      };
	
	      for (var i = 0, l = _references.length; i < l; i++) {
	        var pattern;
	        var matches;
	
	        var _ret2 = _loop2();
	
	        if (_ret2 === 'break') break;
	      }
	    }
	  }
	
	  return current;
	}
	
	/**
	 * Evaluate matches with expected elements
	 *
	 * @param  {Array.<HTMLElement>} matches  - [description]
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {Boolean}                      - [description]
	 */
	function compareResults(matches, elements) {
	  var length = matches.length;
	
	  return length === elements.length && elements.every(function (element) {
	    for (var i = 0; i < length; i++) {
	      if (matches[i] === element) {
	        return true;
	      }
	    }
	    return false;
	  });
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCommonAncestor = getCommonAncestor;
	exports.getCommonProperties = getCommonProperties;
	/**
	 * # Common
	 *
	 * Group similars
	 */
	
	/**
	 * Find the last common ancestor of elements
	 *
	 * @param  {Array.<HTMLElements>} elements - [description]
	 * @return {HTMLElement}                   - [description]
	 */
	function getCommonAncestor(elements) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var _options$root = options.root,
	      root = _options$root === undefined ? document : _options$root,
	      _options$skip = options.skip,
	      skip = _options$skip === undefined ? null : _options$skip,
	      _options$ignore = options.ignore,
	      ignore = _options$ignore === undefined ? {} : _options$ignore;
	
	
	  var ancestors = [];
	
	  elements.forEach(function (element, index) {
	    var parents = [];
	    while (element !== root) {
	      element = element.parentNode;
	      parents.unshift(element);
	    }
	    ancestors[index] = parents;
	  });
	
	  ancestors.sort(function (curr, next) {
	    return curr.length - next.length;
	  });
	
	  var shallowAncestor = ancestors.shift();
	
	  var ancestor = null;
	
	  var _loop = function _loop() {
	    var parent = shallowAncestor[i];
	    var missing = ancestors.some(function (otherParents) {
	      return !otherParents.some(function (otherParent) {
	        return otherParent === parent;
	      });
	    });
	
	    if (missing) {
	      // TODO: find similar sub-parents, not the top root, e.g. sharing a class selector
	      return 'break';
	    }
	
	    ancestor = parent;
	  };
	
	  for (var i = 0, l = shallowAncestor.length; i < l; i++) {
	    var _ret = _loop();
	
	    if (_ret === 'break') break;
	  }
	
	  return ancestor;
	}
	
	/**
	 * Get a set of common properties of elements
	 *
	 * @param  {Array.<HTMLElement>} elements - [description]
	 * @return {Object}                       - [description]
	 */
	function getCommonProperties(elements) {
	
	  var commonProperties = {
	    classes: [],
	    attributes: {},
	    tag: null
	  };
	
	  elements.forEach(function (element) {
	    var commonClasses = commonProperties.classes,
	        commonAttributes = commonProperties.attributes,
	        commonTag = commonProperties.tag;
	
	    // ~ classes
	
	    if (commonClasses !== undefined) {
	      var classes = element.getAttribute('class');
	      if (classes) {
	        classes = classes.trim().split(' ');
	        if (!commonClasses.length) {
	          commonProperties.classes = classes;
	        } else {
	          commonClasses = commonClasses.filter(function (entry) {
	            return classes.some(function (name) {
	              return name === entry;
	            });
	          });
	          if (commonClasses.length) {
	            commonProperties.classes = commonClasses;
	          } else {
	            delete commonProperties.classes;
	          }
	        }
	      } else {
	        // TODO: restructure removal as 2x set / 2x delete, instead of modify always replacing with new collection
	        delete commonProperties.classes;
	      }
	    }
	
	    // ~ attributes
	    if (commonAttributes !== undefined) {
	      (function () {
	        var elementAttributes = element.attributes;
	        var attributes = Object.keys(elementAttributes).reduce(function (attributes, key) {
	          var attribute = elementAttributes[key];
	          var attributeName = attribute.name;
	          // NOTE: workaround detection for non-standard phantomjs NamedNodeMap behaviour
	          // (issue: https://github.com/ariya/phantomjs/issues/14634)
	          if (attribute && attributeName !== 'class') {
	            attributes[attributeName] = attribute.value;
	          }
	          return attributes;
	        }, {});
	
	        var attributesNames = Object.keys(attributes);
	        var commonAttributesNames = Object.keys(commonAttributes);
	
	        if (attributesNames.length) {
	          if (!commonAttributesNames.length) {
	            commonProperties.attributes = attributes;
	          } else {
	            commonAttributes = commonAttributesNames.reduce(function (nextCommonAttributes, name) {
	              var value = commonAttributes[name];
	              if (value === attributes[name]) {
	                nextCommonAttributes[name] = value;
	              }
	              return nextCommonAttributes;
	            }, {});
	            if (Object.keys(commonAttributes).length) {
	              commonProperties.attributes = commonAttributes;
	            } else {
	              delete commonProperties.attributes;
	            }
	          }
	        } else {
	          delete commonProperties.attributes;
	        }
	      })();
	    }
	
	    // ~ tag
	    if (commonTag !== undefined) {
	      var tag = element.tagName.toLowerCase();
	      if (!commonTag) {
	        commonProperties.tag = tag;
	      } else if (tag !== commonTag) {
	        delete commonProperties.tag;
	      }
	    }
	  });
	
	  return commonProperties;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZGQ3YjBjNTU5ZGNlN2FjNDQ1ZCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWRhcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGltaXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24uanMiXSwibmFtZXMiOlsiZ2V0U2luZ2xlU2VsZWN0b3IiLCJnZXRNdWx0aVNlbGVjdG9yIiwic2VsZWN0Iiwib3B0aW1pemUiLCJjb21tb24iLCJkZWZhdWx0IiwiZ2V0UXVlcnlTZWxlY3RvciIsImlucHV0Iiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJlbGVtZW50Iiwibm9kZVR5cGUiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJnbG9iYWxNb2RpZmllZCIsInNlbGVjdG9yIiwib3B0aW1pemVkIiwiZ2xvYmFsIiwiZG9jdW1lbnQiLCJlbGVtZW50cyIsIkFycmF5IiwiaXNBcnJheSIsInNvbWUiLCJhbmNlc3RvciIsImFuY2VzdG9yU2VsZWN0b3IiLCJjb21tb25TZWxlY3RvcnMiLCJnZXRDb21tb25TZWxlY3RvcnMiLCJkZXNjZW5kYW50U2VsZWN0b3IiLCJzZWxlY3Rvck1hdGNoZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJlbnRyeSIsIndhcm4iLCJjbGFzc2VzIiwiYXR0cmlidXRlcyIsInRhZyIsInNlbGVjdG9yUGF0aCIsInB1c2giLCJjbGFzc1NlbGVjdG9yIiwibWFwIiwibmFtZSIsImpvaW4iLCJhdHRyaWJ1dGVTZWxlY3RvciIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJwYXJ0cyIsImFkYXB0IiwiY29udGV4dCIsInJvb3QiLCJwYXJlbnQiLCJFbGVtZW50UHJvdG90eXBlIiwiZ2V0UHJvdG90eXBlT2YiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJjaGlsZHJlbiIsImZpbHRlciIsIm5vZGUiLCJ0eXBlIiwiYXR0cmlicyIsImF0dHJpYnV0ZXNOYW1lcyIsIk5hbWVkTm9kZU1hcCIsImF0dHJpYnV0ZU5hbWUiLCJpbmRleCIsInZhbHVlIiwiY29uZmlndXJhYmxlIiwiZ2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YWdOYW1lIiwiSFRNTENvbGxlY3Rpb24iLCJ0cmF2ZXJzZURlc2NlbmRhbnRzIiwiY2hpbGRUYWdzIiwiZGVzY2VuZGFudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJuYW1lcyIsInRyaW0iLCJyZXBsYWNlIiwic3BsaXQiLCJkZXNjZW5kYW50Q2xhc3NOYW1lIiwiY2xhc3MiLCJpbmRleE9mIiwic2VsZWN0b3JzIiwiaW5zdHJ1Y3Rpb25zIiwiZ2V0SW5zdHJ1Y3Rpb25zIiwiZGlzY292ZXIiLCJzaGlmdCIsInRvdGFsIiwic3RlcCIsImNvbnRhaW5zIiwiaW5jbHVzaXZlIiwiZG9uZSIsInJldmVyc2UiLCJwc2V1ZG8iLCJ2YWxpZGF0ZSIsImluc3RydWN0aW9uIiwidGVzdCIsImNoZWNrUGFyZW50Iiwic3Vic3RyIiwibm9kZUNsYXNzTmFtZSIsImNoZWNrQ2xhc3MiLCJnZXRBbmNlc3RvciIsImF0dHJpYnV0ZUtleSIsImF0dHJpYnV0ZVZhbHVlIiwiaGFzQXR0cmlidXRlIiwiY2hlY2tBdHRyaWJ1dGUiLCJOb2RlTGlzdCIsImlkIiwiY2hlY2tJZCIsImNoZWNrVW5pdmVyc2FsIiwiY2hlY2tUYWciLCJydWxlIiwibWF0Y2giLCJraW5kIiwicGFyc2VJbnQiLCJ2YWxpZGF0ZVBzZXVkbyIsImNvbXBhcmVTZXQiLCJub2RlSW5kZXgiLCJmaW5kSW5kZXgiLCJjaGlsZCIsImVuaGFuY2VJbnN0cnVjdGlvbiIsIm1hdGNoZWROb2RlIiwibm9kZXMiLCJoYW5kbGVyIiwiZm9yRWFjaCIsInByb2dyZXNzIiwiZGVmYXVsdElnbm9yZSIsImF0dHJpYnV0ZSIsInNraXAiLCJwcmlvcml0eSIsImlnbm9yZSIsInBhdGgiLCJza2lwQ29tcGFyZSIsInNraXBDaGVja3MiLCJjb21wYXJlIiwiaWdub3JlQ2xhc3MiLCJwcmVkaWNhdGUiLCJ0b1N0cmluZyIsIlJlZ0V4cCIsImJpbmQiLCJpZ25vcmVBdHRyaWJ1dGUiLCJkZWZhdWx0UHJlZGljYXRlIiwiY2hlY2tDbGFzc0dsb2JhbCIsImNoZWNrQXR0cmlidXRlR2xvYmFsIiwiY2hlY2tUYWdHbG9iYWwiLCJjaGVja0NsYXNzTG9jYWwiLCJjaGVja0F0dHJpYnV0ZUxvY2FsIiwiY2hlY2tUYWdMb2NhbCIsImNoZWNrQ2xhc3NDaGlsZCIsImNoZWNrQXR0cmlidXRlQ2hpbGQiLCJjaGVja1RhZ0NoaWxkIiwidW5zaGlmdCIsImNoZWNrSWdub3JlIiwiY2hlY2tDaGlsZCIsInNvcnQiLCJvcmRlckJ5UHJpb3JpdHkiLCJrZXkiLCJwYXR0ZXJuIiwidG9Mb3dlckNhc2UiLCJjbGFzc0xpc3QiLCJjbGFzc05hbWVMaXN0IiwibmNsYXNzTmFtZSIsImkiLCJtYXRjaGVzIiwibCIsImNoZWNrIiwiY3VyciIsIm5leHQiLCJjb252ZXJ0Tm9kZUxpc3QiLCJlc2NhcGVWYWx1ZSIsImFyciIsInRyYWNlIiwib3B0aW1pemVQYXJ0Iiwic2hvcnRlbmVkIiwicG9wIiwiY3VycmVudCIsInByZVBhcnQiLCJwb3N0UGFydCIsInNsaWNlIiwiY29tcGFyZVJlc3VsdHMiLCJyZWZlcmVuY2VzIiwicmVmZXJlbmNlIiwiZGVzY3JpcHRpb24iLCJwYXJ0aWFsIiwiY2hhckF0IiwiZ2V0Q29tbW9uQW5jZXN0b3IiLCJnZXRDb21tb25Qcm9wZXJ0aWVzIiwiYW5jZXN0b3JzIiwicGFyZW50cyIsInNoYWxsb3dBbmNlc3RvciIsIm1pc3NpbmciLCJvdGhlclBhcmVudHMiLCJvdGhlclBhcmVudCIsImNvbW1vblByb3BlcnRpZXMiLCJjb21tb25DbGFzc2VzIiwiY29tbW9uQXR0cmlidXRlcyIsImNvbW1vblRhZyIsInVuZGVmaW5lZCIsImVsZW1lbnRBdHRyaWJ1dGVzIiwiY29tbW9uQXR0cmlidXRlc05hbWVzIiwibmV4dENvbW1vbkF0dHJpYnV0ZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkN0Q2lCQSxpQjs7Ozs7O3FCQUFtQkMsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUE3QkMsTTtTQUNBQyxRO1NBQ0tDLE07U0FFTEMsTzs7Ozs7Ozs7Ozs7OytRQ0pQOzs7Ozs7O21CQW9Cd0JDLGdCO1NBaUJSTixpQixHQUFBQSxpQjtTQXdDQUMsZ0IsR0FBQUEsZ0I7O0FBdEVoQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7O0FBT2UsVUFBU0ssZ0JBQVQsQ0FBMkJDLEtBQTNCLEVBQ2Y7QUFBQSxPQURpREMsT0FDakQsdUVBRDJELEVBQzNEOztBQUNFQyxXQUFRQyxHQUFSLENBQVkseUNBQVosRUFBc0RDLFNBQXREOztBQUVBLE9BQUksQ0FBQ0osTUFBTUssTUFBWCxFQUFtQjtBQUNqQixZQUFPWixrQkFBa0JPLEtBQWxCLEVBQXlCQyxPQUF6QixDQUFQO0FBQ0Q7QUFDRCxVQUFPUCxpQkFBaUJNLEtBQWpCLEVBQXdCQyxPQUF4QixDQUFQO0FBQ0Q7O0FBRUQ7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U0FBWixFQUF1QjtBQUM1QixnQkFBT0gsaUJBQWlCaEssR0FBeEI7QUFDRDtBQUNGO0FBQ0YsSUE3RUQ7O0FBK0VBLFVBQU9nSyxnQkFBUDtBQUNELEUiLCJmaWxlIjoib3B0aW1hbC1zZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJPcHRpbWFsU2VsZWN0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk9wdGltYWxTZWxlY3RcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWRkN2IwYzU1OWRjZTdhYzQ0NWQiLCJleHBvcnQgc2VsZWN0LCB7IGdldFNpbmdsZVNlbGVjdG9yLCBnZXRNdWx0aVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3QnXG5leHBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSdcbmV4cG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbidcblxuZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9zZWxlY3QnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIvKipcbiAqICMgU2VsZWN0XG4gKlxuICogQ29uc3RydWN0IGEgdW5pcXVlIENTUyBxdWVyeXNlbGVjdG9yIHRvIGFjY2VzcyB0aGUgc2VsZWN0ZWQgRE9NIGVsZW1lbnQocykuXG4gKiBBcHBsaWVzIGRpZmZlcmVudCBtYXRjaGluZyBhbmQgb3B0aW1pemF0aW9uIHN0cmF0ZWdpZXMgZm9yIGVmZmljaWVuY3kuXG4gKi9cblxuaW1wb3J0IGFkYXB0IGZyb20gJy4vYWRhcHQnXG5pbXBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCdcbmltcG9ydCBvcHRpbWl6ZSBmcm9tICcuL29wdGltaXplJ1xuaW1wb3J0IHsgY29udmVydE5vZGVMaXN0IH0gZnJvbSAnLi91dGlsaXRpZXMnXG5pbXBvcnQgeyBnZXRDb21tb25BbmNlc3RvciwgZ2V0Q29tbW9uUHJvcGVydGllcyB9IGZyb20gJy4vY29tbW9uJ1xuXG4vKipcbiAqIENob29zZSBhY3Rpb24gZGVwZW5kaW5nIG9uIHRoZSBpbnB1dCAoc2luZ2xlL211bHRpKVxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGlucHV0ICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UXVlcnlTZWxlY3RvciAoaW5wdXQsIG9wdGlvbnMgPSB7fSlcbntcbiAgY29uc29sZS5sb2coXCJPcHRpbWFsU2VsZWN0IGdldFF1ZXJ5U2VsZWN0b3IgaXMgaGVyZSBcIixhcmd1bWVudHMpO1xuXG4gIGlmICghaW5wdXQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGdldFNpbmdsZVNlbGVjdG9yKGlucHV0LCBvcHRpb25zKVxuICB9XG4gIHJldHVybiBnZXRNdWx0aVNlbGVjdG9yKGlucHV0LCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEdldCBhIHNlbGVjdG9yIGZvciB0aGUgcHJvdmlkZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNpbmdsZVNlbGVjdG9yIChlbGVtZW50LCBvcHRpb25zID0ge30pXG57XG5cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT09IDMpIHtcbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gIH1cbiAgaWYgKGVsZW1lbnQubm9kZVR5cGUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXQgLSBvbmx5IEhUTUxFbGVtZW50cyBvciByZXByZXNlbnRhdGlvbnMgb2YgdGhlbSBhcmUgc3VwcG9ydGVkISAobm90IFwiJHt0eXBlb2YgZWxlbWVudH1cIilgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50LCBvcHRpb25zKVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gbWF0Y2goZWxlbWVudCwgb3B0aW9ucylcblxuICBjb25zb2xlLmxvZyhcIiBnZXRTaW5nbGVTZWxlY3RvciAwXCIsc2VsZWN0b3IsIG9wdGlvbnMpOyBcblxuICBjb25zdCBvcHRpbWl6ZWQgPSBvcHRpbWl6ZShzZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucylcblxuICBjb25zb2xlLmxvZyhcIiBnZXRTaW5nbGVTZWxlY3RvciAxIFwiLHNlbGVjdG9yLCBvcHRpbWl6ZWQpO1xuXG4gIC8vIGRlYnVnXG4gIC8vIGNvbnNvbGUubG9nKGBcbiAgLy8gICBzZWxlY3RvcjogICR7c2VsZWN0b3J9XG4gIC8vICAgb3B0aW1pemVkOiAke29wdGltaXplZH1cbiAgLy8gYClcblxuICBpZiAoZ2xvYmFsTW9kaWZpZWQpIHtcbiAgICBkZWxldGUgZ2xvYmFsLmRvY3VtZW50XG4gIH1cblxuICByZXR1cm4gb3B0aW1pemVkXG59XG5cbi8qKlxuICogR2V0IGEgc2VsZWN0b3IgdG8gbWF0Y2ggbXVsdGlwbGUgZGVzY2VuZGFudHMgZnJvbSBhbiBhbmNlc3RvclxuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE11bHRpU2VsZWN0b3IgKGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcblxuICBjb25zb2xlLmxvZyhcIiBjc2s4ODU1IGdldE11bHRpU2VsZWN0b3IgXCIpO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50cykpIHtcbiAgICBlbGVtZW50cyA9IGNvbnZlcnROb2RlTGlzdChlbGVtZW50cylcbiAgfVxuXG4gIGlmIChlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIG9ubHkgYW4gQXJyYXkgb2YgSFRNTEVsZW1lbnRzIG9yIHJlcHJlc2VudGF0aW9ucyBvZiB0aGVtIGlzIHN1cHBvcnRlZCFgKVxuICB9XG5cbiAgY29uc3QgZ2xvYmFsTW9kaWZpZWQgPSBhZGFwdChlbGVtZW50c1swXSwgb3B0aW9ucylcblxuICBjb25zdCBhbmNlc3RvciA9IGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzLCBvcHRpb25zKVxuICBjb25zdCBhbmNlc3RvclNlbGVjdG9yID0gZ2V0U2luZ2xlU2VsZWN0b3IoYW5jZXN0b3IsIG9wdGlvbnMpXG5cbiAgLy8gVE9ETzogY29uc2lkZXIgdXNhZ2Ugb2YgbXVsdGlwbGUgc2VsZWN0b3JzICsgcGFyZW50LWNoaWxkIHJlbGF0aW9uICsgY2hlY2sgZm9yIHBhcnQgcmVkdW5kYW5jeVxuICBjb25zdCBjb21tb25TZWxlY3RvcnMgPSBnZXRDb21tb25TZWxlY3RvcnMoZWxlbWVudHMpXG4gIGNvbnN0IGRlc2NlbmRhbnRTZWxlY3RvciA9IGNvbW1vblNlbGVjdG9yc1swXVxuXG4gIGNvbnN0IHNlbGVjdG9yID0gb3B0aW1pemUoYCR7YW5jZXN0b3JTZWxlY3Rvcn0gJHtkZXNjZW5kYW50U2VsZWN0b3J9YCwgZWxlbWVudHMsIG9wdGlvbnMpXG4gIGNvbnN0IHNlbGVjdG9yTWF0Y2hlcyA9IGNvbnZlcnROb2RlTGlzdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcblxuICBpZiAoIWVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiBzZWxlY3Rvck1hdGNoZXMuc29tZSgoZW50cnkpID0+IGVudHJ5ID09PSBlbGVtZW50KSApKSB7XG4gICAgLy8gVE9ETzogY2x1c3RlciBtYXRjaGVzIHRvIHNwbGl0IGludG8gc2ltaWxhciBncm91cHMgZm9yIHN1YiBzZWxlY3Rpb25zXG4gICAgcmV0dXJuIGNvbnNvbGUud2FybihgXG4gICAgICBUaGUgc2VsZWN0ZWQgZWxlbWVudHMgY2FuXFwndCBiZSBlZmZpY2llbnRseSBtYXBwZWQuXG4gICAgICBJdHMgcHJvYmFibHkgYmVzdCB0byB1c2UgbXVsdGlwbGUgc2luZ2xlIHNlbGVjdG9ycyBpbnN0ZWFkIVxuICAgIGAsIGVsZW1lbnRzKVxuICB9XG5cbiAgaWYgKGdsb2JhbE1vZGlmaWVkKSB7XG4gICAgZGVsZXRlIGdsb2JhbC5kb2N1bWVudFxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdG9yXG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyB0byBkZXNjcmliZSBhIHNldCBvZiBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSAge0FycmF5LjxIVE1MRWxlbWVudHM+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tbW9uU2VsZWN0b3JzIChlbGVtZW50cylcbntcblxuICBjb25zb2xlLmxvZyhcImNzazg4NTUgZ2V0Q29tbW9uU2VsZWN0b3JzIFwiLGVsZW1lbnRzKTtcblxuICBjb25zdCB7IGNsYXNzZXMsIGF0dHJpYnV0ZXMsIHRhZyB9ID0gZ2V0Q29tbW9uUHJvcGVydGllcyhlbGVtZW50cylcblxuICBjb25zdCBzZWxlY3RvclBhdGggPSBbXVxuXG4gIGlmICh0YWcpIHtcbiAgICBzZWxlY3RvclBhdGgucHVzaCh0YWcpXG4gIH1cblxuICBpZiAoY2xhc3NlcylcbiAge1xuICAgIGNvbnN0IGNsYXNzU2VsZWN0b3IgPSBjbGFzc2VzLm1hcCgobmFtZSkgPT4gYC4ke25hbWV9YCkuam9pbignJylcbiAgICBjb25zb2xlLmxvZyhcImNsYXNzU2VsZWN0b3Igb24gb3B0U3RyaW5nIFwiLGNsYXNzU2VsZWN0b3IpO1xuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGNsYXNzU2VsZWN0b3IpXG4gIH1cblxuICBpZiAoYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVNlbGVjdG9yID0gT2JqZWN0LmtleXMoYXR0cmlidXRlcykucmVkdWNlKChwYXJ0cywgbmFtZSkgPT4ge1xuICAgICAgcGFydHMucHVzaChgWyR7bmFtZX09XCIke2F0dHJpYnV0ZXNbbmFtZV19XCJdYClcbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH0sIFtdKS5qb2luKCcnKVxuICAgIHNlbGVjdG9yUGF0aC5wdXNoKGF0dHJpYnV0ZVNlbGVjdG9yKVxuICB9XG5cbiAgaWYgKHNlbGVjdG9yUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgcGFyZW50LWNoaWxkIHJlbGF0aW9uXG4gIH1cblxuICByZXR1cm4gW1xuICAgIHNlbGVjdG9yUGF0aC5qb2luKCcnKVxuICBdXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2VsZWN0LmpzIiwiLyoqXG4gKiAjIEFkYXB0XG4gKlxuICogQ2hlY2sgYW5kIGV4dGVuZCB0aGUgZW52aXJvbm1lbnQgZm9yIHVuaXZlcnNhbCB1c2FnZVxuICovXG5cbi8qKlxuICogTW9kaWZ5IHRoZSBjb250ZXh0IGJhc2VkIG9uIHRoZSBlbnZpcm9ubWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFTGVtZW50fSBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRhcHQgKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAvLyBkZXRlY3QgZW52aXJvbm1lbnQgc2V0dXBcbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgeyBjb250ZXh0IH0gPSBvcHRpb25zXG5cbiAgZ2xvYmFsLmRvY3VtZW50ID0gY29udGV4dCB8fCAoKCkgPT4ge1xuICAgIHZhciByb290ID0gZWxlbWVudFxuICAgIHdoaWxlIChyb290LnBhcmVudCkge1xuICAgICAgcm9vdCA9IHJvb3QucGFyZW50XG4gICAgfVxuICAgIHJldHVybiByb290XG4gIH0pKClcblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmI1NS9kb21oYW5kbGVyL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0w3NVxuICBjb25zdCBFbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbC5kb2N1bWVudClcblxuICAvLyBhbHRlcm5hdGl2ZSBkZXNjcmlwdG9yIHRvIGFjY2VzcyBlbGVtZW50cyB3aXRoIGZpbHRlcmluZyBpbnZhbGlkIGVsZW1lbnRzIChlLmcuIHRleHRub2RlcylcbiAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEVsZW1lbnRQcm90b3R5cGUsICdjaGlsZFRhZ3MnKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbGVtZW50UHJvdG90eXBlLCAnY2hpbGRUYWdzJywge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmZpbHRlcigobm9kZSkgPT4ge1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2RvbWVsZW1lbnR0eXBlL2Jsb2IvbWFzdGVyL2luZGV4LmpzI0wxMlxuICAgICAgICAgIHJldHVybiBub2RlLnR5cGUgPT09ICd0YWcnIHx8IG5vZGUudHlwZSA9PT0gJ3NjcmlwdCcgfHwgbm9kZS50eXBlID09PSAnc3R5bGUnXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50UHJvdG90eXBlLCAnYXR0cmlidXRlcycpKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0cmlidXRlc1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9OYW1lZE5vZGVNYXBcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRWxlbWVudFByb3RvdHlwZSwgJ2F0dHJpYnV0ZXMnLCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgY29uc3QgeyBhdHRyaWJzIH0gPSB0aGlzXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnMpXG4gICAgICAgIGNvbnN0IE5hbWVkTm9kZU1hcCA9IGF0dHJpYnV0ZXNOYW1lcy5yZWR1Y2UoKGF0dHJpYnV0ZXMsIGF0dHJpYnV0ZU5hbWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgYXR0cmlidXRlc1tpbmRleF0gPSB7XG4gICAgICAgICAgICBuYW1lOiBhdHRyaWJ1dGVOYW1lLFxuICAgICAgICAgICAgdmFsdWU6IGF0dHJpYnNbYXR0cmlidXRlTmFtZV1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgICAgfSwgeyB9KVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTmFtZWROb2RlTWFwLCAnbGVuZ3RoJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGhcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIE5hbWVkTm9kZU1hcFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuZ2V0QXR0cmlidXRlKSB7XG4gICAgLy8gaHR0cHM6Ly9kb2NzLndlYnBsYXRmb3JtLm9yZy93aWtpL2RvbS9FbGVtZW50L2dldEF0dHJpYnV0ZVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEF0dHJpYnV0ZVxuICAgIEVsZW1lbnRQcm90b3R5cGUuZ2V0QXR0cmlidXRlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnNbbmFtZV0gfHwgbnVsbFxuICAgIH1cbiAgfVxuXG4gIGlmICghRWxlbWVudFByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZSkge1xuICAgIC8vIGh0dHBzOi8vZG9jcy53ZWJwbGF0Zm9ybS5vcmcvd2lraS9kb20vRG9jdW1lbnQvZ2V0RWxlbWVudHNCeVRhZ05hbWVcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9nZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIEVsZW1lbnRQcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgICAgY29uc3QgSFRNTENvbGxlY3Rpb24gPSBbXVxuICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyh0aGlzLmNoaWxkVGFncywgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgaWYgKGRlc2NlbmRhbnQubmFtZSA9PT0gdGFnTmFtZSB8fCB0YWdOYW1lID09PSAnKicpIHtcbiAgICAgICAgICBIVE1MQ29sbGVjdGlvbi5wdXNoKGRlc2NlbmRhbnQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gSFRNTENvbGxlY3Rpb25cbiAgICB9XG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuICAgIC8vIGh0dHBzOi8vZG9jcy53ZWJwbGF0Zm9ybS5vcmcvd2lraS9kb20vRG9jdW1lbnQvZ2V0RWxlbWVudHNCeUNsYXNzTmFtZVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2dldEVsZW1lbnRzQnlDbGFzc05hbWVcbiAgICBFbGVtZW50UHJvdG90eXBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICBjb25zdCBuYW1lcyA9IGNsYXNzTmFtZS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpLnNwbGl0KCcgJylcbiAgICAgIGNvbnN0IEhUTUxDb2xsZWN0aW9uID0gW11cbiAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW3RoaXNdLCAoZGVzY2VuZGFudCkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjZW5kYW50Q2xhc3NOYW1lID0gZGVzY2VuZGFudC5hdHRyaWJzLmNsYXNzXG4gICAgICAgIGlmIChkZXNjZW5kYW50Q2xhc3NOYW1lICYmIG5hbWVzLmV2ZXJ5KChuYW1lKSA9PiBkZXNjZW5kYW50Q2xhc3NOYW1lLmluZGV4T2YobmFtZSkgPiAtMSkpIHtcbiAgICAgICAgICBIVE1MQ29sbGVjdGlvbi5wdXNoKGRlc2NlbmRhbnQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gSFRNTENvbGxlY3Rpb25cbiAgICB9XG4gIH1cblxuICBpZiAoIUVsZW1lbnRQcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbCkge1xuICAgIC8vIGh0dHBzOi8vZG9jcy53ZWJwbGF0Zm9ybS5vcmcvd2lraS9jc3Mvc2VsZWN0b3JzX2FwaS9xdWVyeVNlbGVjdG9yQWxsXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvcXVlcnlTZWxlY3RvckFsbFxuICAgIEVsZW1lbnRQcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbCA9IGZ1bmN0aW9uIChzZWxlY3RvcnMpIHtcbiAgICAgIHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5yZXBsYWNlKC8oPikoXFxTKS9nLCAnJDEgJDInKS50cmltKCkgLy8gYWRkIHNwYWNlIGZvciAnPicgc2VsZWN0b3JcblxuICAgICAgLy8gdXNpbmcgcmlnaHQgdG8gbGVmdCBleGVjdXRpb24gPT4gaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvY3NzLXNlbGVjdCNob3ctZG9lcy1pdC13b3JrXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBnZXRJbnN0cnVjdGlvbnMoc2VsZWN0b3JzKVxuICAgICAgY29uc3QgZGlzY292ZXIgPSBpbnN0cnVjdGlvbnMuc2hpZnQoKVxuXG4gICAgICBjb25zdCB0b3RhbCA9IGluc3RydWN0aW9ucy5sZW5ndGhcbiAgICAgIHJldHVybiBkaXNjb3Zlcih0aGlzKS5maWx0ZXIoKG5vZGUpID0+IHtcbiAgICAgICAgdmFyIHN0ZXAgPSAwXG4gICAgICAgIHdoaWxlIChzdGVwIDwgdG90YWwpIHtcbiAgICAgICAgICBub2RlID0gaW5zdHJ1Y3Rpb25zW3N0ZXBdKG5vZGUsIHRoaXMpXG4gICAgICAgICAgaWYgKCFub2RlKSB7IC8vIGhpZXJhcmNoeSBkb2Vzbid0IG1hdGNoXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RlcCArPSAxXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaWYgKCFFbGVtZW50UHJvdG90eXBlLmNvbnRhaW5zKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUvY29udGFpbnNcbiAgICBFbGVtZW50UHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgIHZhciBpbmNsdXNpdmUgPSBmYWxzZVxuICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbdGhpc10sIChkZXNjZW5kYW50LCBkb25lKSA9PiB7XG4gICAgICAgIGlmIChkZXNjZW5kYW50ID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgaW5jbHVzaXZlID0gdHJ1ZVxuICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGluY2x1c2l2ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogUmV0cmlldmUgdHJhbnNmb3JtYXRpb24gc3RlcHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gICBzZWxlY3RvcnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtBcnJheS48RnVuY3Rpb24+fSAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGdldEluc3RydWN0aW9ucyAoc2VsZWN0b3JzKSB7XG4gIHJldHVybiBzZWxlY3RvcnMuc3BsaXQoJyAnKS5yZXZlcnNlKCkubWFwKChzZWxlY3Rvciwgc3RlcCkgPT4ge1xuICAgIGNvbnN0IGRpc2NvdmVyID0gc3RlcCA9PT0gMFxuICAgIGNvbnN0IFt0eXBlLCBwc2V1ZG9dID0gc2VsZWN0b3Iuc3BsaXQoJzonKVxuXG4gICAgdmFyIHZhbGlkYXRlID0gbnVsbFxuICAgIHZhciBpbnN0cnVjdGlvbiA9IG51bGxcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuXG4gICAgICAvLyBjaGlsZDogJz4nXG4gICAgICBjYXNlIC8+Ly50ZXN0KHR5cGUpOlxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrUGFyZW50IChub2RlKSB7XG4gICAgICAgICAgcmV0dXJuICh2YWxpZGF0ZSkgPT4gdmFsaWRhdGUobm9kZS5wYXJlbnQpICYmIG5vZGUucGFyZW50XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gY2xhc3M6ICcuJ1xuICAgICAgY2FzZSAvXlxcLi8udGVzdCh0eXBlKTpcbiAgICAgICAgY29uc3QgbmFtZXMgPSB0eXBlLnN1YnN0cigxKS5zcGxpdCgnLicpXG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlQ2xhc3NOYW1lID0gbm9kZS5hdHRyaWJzLmNsYXNzXG4gICAgICAgICAgcmV0dXJuIG5vZGVDbGFzc05hbWUgJiYgbmFtZXMuZXZlcnkoKG5hbWUpID0+IG5vZGVDbGFzc05hbWUuaW5kZXhPZihuYW1lKSA+IC0xKVxuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tDbGFzcyAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lcy5qb2luKCcgJykpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBhdHRyaWJ1dGU6ICdba2V5PVwidmFsdWVcIl0nXG4gICAgICBjYXNlIC9eXFxbLy50ZXN0KHR5cGUpOlxuICAgICAgICBjb25zdCBbYXR0cmlidXRlS2V5LCBhdHRyaWJ1dGVWYWx1ZV0gPSB0eXBlLnJlcGxhY2UoL1xcW3xcXF18XCIvZywgJycpLnNwbGl0KCc9JylcbiAgICAgICAgdmFsaWRhdGUgPSAobm9kZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhhc0F0dHJpYnV0ZSA9IE9iamVjdC5rZXlzKG5vZGUuYXR0cmlicykuaW5kZXhPZihhdHRyaWJ1dGVLZXkpID4gLTFcbiAgICAgICAgICBpZiAoaGFzQXR0cmlidXRlKSB7IC8vIHJlZ2FyZCBvcHRpb25hbCBhdHRyaWJ1dGVWYWx1ZVxuICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVWYWx1ZSB8fCAobm9kZS5hdHRyaWJzW2F0dHJpYnV0ZUtleV0gPT09IGF0dHJpYnV0ZVZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrQXR0cmlidXRlIChub2RlLCByb290KSB7XG4gICAgICAgICAgaWYgKGRpc2NvdmVyKSB7XG4gICAgICAgICAgICBjb25zdCBOb2RlTGlzdCA9IFtdXG4gICAgICAgICAgICB0cmF2ZXJzZURlc2NlbmRhbnRzKFtub2RlXSwgKGRlc2NlbmRhbnQpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlKGRlc2NlbmRhbnQpKSB7XG4gICAgICAgICAgICAgICAgTm9kZUxpc3QucHVzaChkZXNjZW5kYW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBpZDogJyMnXG4gICAgICBjYXNlIC9eIy8udGVzdCh0eXBlKTpcbiAgICAgICAgY29uc3QgaWQgPSB0eXBlLnN1YnN0cigxKVxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUuYXR0cmlicy5pZCA9PT0gaWRcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IGZ1bmN0aW9uIGNoZWNrSWQgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IE5vZGVMaXN0ID0gW11cbiAgICAgICAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW25vZGVdLCAoZGVzY2VuZGFudCwgZG9uZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsaWRhdGUoZGVzY2VuZGFudCkpIHtcbiAgICAgICAgICAgICAgICBOb2RlTGlzdC5wdXNoKGRlc2NlbmRhbnQpXG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gTm9kZUxpc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBub2RlKHZhbGlkYXRlKSA6IGdldEFuY2VzdG9yKG5vZGUsIHJvb3QsIHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIHVuaXZlcnNhbDogJyonXG4gICAgICBjYXNlIC9cXCovLnRlc3QodHlwZSk6XG4gICAgICAgIHZhbGlkYXRlID0gKG5vZGUpID0+IHRydWVcbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbiBjaGVja1VuaXZlcnNhbCAobm9kZSwgcm9vdCkge1xuICAgICAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICAgICAgY29uc3QgTm9kZUxpc3QgPSBbXVxuICAgICAgICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhbbm9kZV0sIChkZXNjZW5kYW50KSA9PiBOb2RlTGlzdC5wdXNoKGRlc2NlbmRhbnQpKVxuICAgICAgICAgICAgcmV0dXJuIE5vZGVMaXN0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAodHlwZW9mIG5vZGUgPT09ICdmdW5jdGlvbicpID8gbm9kZSh2YWxpZGF0ZSkgOiBnZXRBbmNlc3Rvcihub2RlLCByb290LCB2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyB0YWc6ICcuLi4nXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWxpZGF0ZSA9IChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUubmFtZSA9PT0gdHlwZVxuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9uID0gZnVuY3Rpb24gY2hlY2tUYWcgKG5vZGUsIHJvb3QpIHtcbiAgICAgICAgICBpZiAoZGlzY292ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IE5vZGVMaXN0ID0gW11cbiAgICAgICAgICAgIHRyYXZlcnNlRGVzY2VuZGFudHMoW25vZGVdLCAoZGVzY2VuZGFudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodmFsaWRhdGUoZGVzY2VuZGFudCkpIHtcbiAgICAgICAgICAgICAgICBOb2RlTGlzdC5wdXNoKGRlc2NlbmRhbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gTm9kZUxpc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2Ygbm9kZSA9PT0gJ2Z1bmN0aW9uJykgPyBub2RlKHZhbGlkYXRlKSA6IGdldEFuY2VzdG9yKG5vZGUsIHJvb3QsIHZhbGlkYXRlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwc2V1ZG8pIHtcbiAgICAgIHJldHVybiBpbnN0cnVjdGlvblxuICAgIH1cblxuICAgIGNvbnN0IHJ1bGUgPSBwc2V1ZG8ubWF0Y2goLy0oY2hpbGR8dHlwZSlcXCgoXFxkKylcXCkkLylcbiAgICBjb25zdCBraW5kID0gcnVsZVsxXVxuICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQocnVsZVsyXSwgMTApIC0gMVxuXG4gICAgY29uc3QgdmFsaWRhdGVQc2V1ZG8gPSAobm9kZSkgPT4ge1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgdmFyIGNvbXBhcmVTZXQgPSBub2RlLnBhcmVudC5jaGlsZFRhZ3NcbiAgICAgICAgaWYgKGtpbmQgPT09ICd0eXBlJykge1xuICAgICAgICAgIGNvbXBhcmVTZXQgPSBjb21wYXJlU2V0LmZpbHRlcih2YWxpZGF0ZSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub2RlSW5kZXggPSBjb21wYXJlU2V0LmZpbmRJbmRleCgoY2hpbGQpID0+IGNoaWxkID09PSBub2RlKVxuICAgICAgICBpZiAobm9kZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBlbmhhbmNlSW5zdHJ1Y3Rpb24gKG5vZGUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gaW5zdHJ1Y3Rpb24obm9kZSlcbiAgICAgIGlmIChkaXNjb3Zlcikge1xuICAgICAgICByZXR1cm4gbWF0Y2gucmVkdWNlKChOb2RlTGlzdCwgbWF0Y2hlZE5vZGUpID0+IHtcbiAgICAgICAgICBpZiAodmFsaWRhdGVQc2V1ZG8obWF0Y2hlZE5vZGUpKSB7XG4gICAgICAgICAgICBOb2RlTGlzdC5wdXNoKG1hdGNoZWROb2RlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gTm9kZUxpc3RcbiAgICAgICAgfSwgW10pXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRhdGVQc2V1ZG8obWF0Y2gpICYmIG1hdGNoXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIFdhbGtpbmcgcmVjdXJzaXZlIHRvIGludm9rZSBjYWxsYmFja3NcbiAqXG4gKiBAcGFyYW0ge0FycmF5LjxIVE1MRWxlbWVudD59IG5vZGVzICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSAgICAgICAgICAgIGhhbmRsZXIgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlRGVzY2VuZGFudHMgKG5vZGVzLCBoYW5kbGVyKSB7XG4gIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICB2YXIgcHJvZ3Jlc3MgPSB0cnVlXG4gICAgaGFuZGxlcihub2RlLCAoKSA9PiBwcm9ncmVzcyA9IGZhbHNlKVxuICAgIGlmIChub2RlLmNoaWxkVGFncyAmJiBwcm9ncmVzcykge1xuICAgICAgdHJhdmVyc2VEZXNjZW5kYW50cyhub2RlLmNoaWxkVGFncywgaGFuZGxlcilcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogQnViYmxlIHVwIGZyb20gYm90dG9tIHRvIHRvcFxuICpcbiAqIEBwYXJhbSAge0hUTUxFTGVtZW50fSBub2RlICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFTGVtZW50fSByb290ICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgICB2YWxpZGF0ZSAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0hUTUxFTGVtZW50fSAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZ2V0QW5jZXN0b3IgKG5vZGUsIHJvb3QsIHZhbGlkYXRlKSB7XG4gIHdoaWxlIChub2RlLnBhcmVudCkge1xuICAgIG5vZGUgPSBub2RlLnBhcmVudFxuICAgIGlmICh2YWxpZGF0ZShub2RlKSkge1xuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG4gICAgaWYgKG5vZGUgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWRhcHQuanMiLCIvKipcbiAqICMgTWF0Y2hcbiAqXG4gKiBSZXRyaWV2ZXMgc2VsZWN0b3JcbiAqL1xuXG5pbXBvcnQgeyBlc2NhcGVWYWx1ZSB9IGZyb20gJy4vdXRpbGl0aWVzJ1xuXG5jb25zdCBkZWZhdWx0SWdub3JlID0ge1xuICBhdHRyaWJ1dGUgKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3N0eWxlJyxcbiAgICAgICdkYXRhLXJlYWN0aWQnLFxuICAgICAgJ2RhdGEtcmVhY3QtY2hlY2tzdW0nXG4gICAgXS5pbmRleE9mKGF0dHJpYnV0ZU5hbWUpID4gLTFcbiAgfVxufVxuXG4vKipcbiAqIEdldCB0aGUgcGF0aCBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgIG9wdGlvbnMgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2ggKG5vZGUsIG9wdGlvbnMpIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50LFxuICAgIHNraXAgPSBudWxsLFxuICAgIC8vIFRPRE86IHJlZmFjdG9yIHRoZSBkZXRlY3Rpb24gdG8gY3VzdG9taXplIHRoZSBleGVjdXRpb24gb3JkZXIgYmFzZWQgb24gdGhlIGF0dHJpYnV0ZSBuYW1lc1xuICAgIHByaW9yaXR5ID0gWydpZCcsICdjbGFzcycsICdocmVmJywgJ3NyYyddLFxuICAgIGlnbm9yZSA9IHt9XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgcGF0aCA9IFtdXG4gIHZhciBlbGVtZW50ID0gbm9kZVxuICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGhcblxuICBjb25zdCBza2lwQ29tcGFyZSA9IHNraXAgJiYgKEFycmF5LmlzQXJyYXkoc2tpcCkgPyBza2lwIDogW3NraXBdKS5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIChlbGVtZW50KSA9PiBlbGVtZW50ID09PSBlbnRyeVxuICAgIH1cbiAgICByZXR1cm4gZW50cnlcbiAgfSlcblxuICBjb25zdCBza2lwQ2hlY2tzID0gKGVsZW1lbnQpID0+IHtcbiAgICByZXR1cm4gc2tpcCAmJiBza2lwQ29tcGFyZS5zb21lKChjb21wYXJlKSA9PiBjb21wYXJlKGVsZW1lbnQpKVxuICB9XG5cbiAgdmFyIGlnbm9yZUNsYXNzID0gZmFsc2VcblxuICBPYmplY3Qua2V5cyhpZ25vcmUpLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gJ2NsYXNzJykge1xuICAgICAgaWdub3JlQ2xhc3MgPSB0cnVlXG4gICAgfVxuICAgIHZhciBwcmVkaWNhdGUgPSBpZ25vcmVbdHlwZV1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICBwcmVkaWNhdGUgPSBwcmVkaWNhdGUudG9TdHJpbmcoKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHByZWRpY2F0ZSA9IG5ldyBSZWdFeHAoZXNjYXBlVmFsdWUocHJlZGljYXRlKS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpKVxuICAgIH1cbiAgICAvLyBjaGVjayBjbGFzcy0vYXR0cmlidXRlbmFtZSBmb3IgcmVnZXhcbiAgICBpZ25vcmVbdHlwZV0gPSBwcmVkaWNhdGUudGVzdC5iaW5kKHByZWRpY2F0ZSlcbiAgfSlcblxuICBpZiAoaWdub3JlQ2xhc3MpIHtcbiAgICBjb25zdCBpZ25vcmVBdHRyaWJ1dGUgPSBpZ25vcmUuYXR0cmlidXRlXG4gICAgaWdub3JlLmF0dHJpYnV0ZSA9IChuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSkgPT4ge1xuICAgICAgcmV0dXJuIGlnbm9yZS5jbGFzcyh2YWx1ZSkgfHwgaWdub3JlQXR0cmlidXRlICYmIGlnbm9yZUF0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgZGVmYXVsdFByZWRpY2F0ZSlcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoZWxlbWVudCAhPT0gcm9vdCkge1xuXG4gICAgaWYgKHNraXBDaGVja3MoZWxlbWVudCkgIT09IHRydWUpIHtcbiAgICAgIC8vIGdsb2JhbFxuICAgICAgaWYgKGNoZWNrSWQoZWxlbWVudCwgcGF0aCwgaWdub3JlKSkgYnJlYWtcbiAgICAgIGlmIChjaGVja0NsYXNzR2xvYmFsKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcm9vdCkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tBdHRyaWJ1dGVHbG9iYWwoZWxlbWVudCwgcGF0aCwgaWdub3JlLCByb290LCBwcmlvcml0eSkpIGJyZWFrXG4gICAgICBpZiAoY2hlY2tUYWdHbG9iYWwoZWxlbWVudCwgcGF0aCwgaWdub3JlLCByb290KSkgYnJlYWtcblxuICAgICAgLy8gbG9jYWxcbiAgICAgIGNoZWNrQ2xhc3NMb2NhbChlbGVtZW50LCBwYXRoLCBpZ25vcmUpXG5cbiAgICAgIC8vIGRlZmluZSBvbmx5IG9uZSBzZWxlY3RvciBlYWNoIGl0ZXJhdGlvblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tBdHRyaWJ1dGVMb2NhbChlbGVtZW50LCBwYXRoLCBpZ25vcmUsIHByaW9yaXR5KVxuICAgICAgfVxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSBsZW5ndGgpIHtcbiAgICAgICAgY2hlY2tUYWdMb2NhbChlbGVtZW50LCBwYXRoLCBpZ25vcmUpXG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIGNoZWNrQ2xhc3NDaGlsZChlbGVtZW50LCBwYXRoLCBpZ25vcmUpXG4gICAgICB9XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja0F0dHJpYnV0ZUNoaWxkKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcHJpb3JpdHkpXG4gICAgICB9XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IGxlbmd0aCkge1xuICAgICAgICBjaGVja1RhZ0NoaWxkKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgbGVuZ3RoID0gcGF0aC5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbGVtZW50ID09PSByb290KSB7XG4gICAgcGF0aC51bnNoaWZ0KCcqJylcbiAgfVxuXG4gIHJldHVybiBwYXRoLmpvaW4oJyAnKVxufVxuXG5cbi8qKlxuICogUHJlc2V0ICdjaGVja0NsYXNzJyB3aXRoIGdsb2JhbCBkYXRhXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ2xhc3NHbG9iYWwgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcm9vdCkge1xuICAvLyBjb25zb2xlLmxvZyhcIiBjaGVja0NsYXNzR2xvYmFsIGlzIGhlcmUgXCIsZWxlbWVudCwgcGF0aCwgaWdub3JlLCByb290KTtcbiAgcmV0dXJuIGNoZWNrQ2xhc3MoZWxlbWVudCwgcGF0aCwgaWdub3JlLCByb290KVxufVxuXG4vKipcbiAqIFByZXNldCAnY2hlY2tDbGFzcycgd2l0aCBsb2NhbCBkYXRhXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ2xhc3NMb2NhbCAoZWxlbWVudCwgcGF0aCwgaWdub3JlKSB7XG4gIC8vIGNvbnNvbGUubG9nKCBcIiBjaGVja0NsYXNzTG9jYWwgaXMgaGVyZSBcIixlbGVtZW50LCBwYXRoLCBpZ25vcmUpO1xuICByZXR1cm4gY2hlY2tDbGFzcyhlbGVtZW50LCBwYXRoLCBpZ25vcmUsIGVsZW1lbnQucGFyZW50Tm9kZSlcbn1cblxuLyoqXG4gKiBQcmVzZXQgJ2NoZWNrQ2hpbGQnIHdpdGggY2xhc3MgZGF0YVxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0NsYXNzQ2hpbGQgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSlcbntcbiAgY29uc3QgY2xhc3NOYW1lID0gZXNjYXBlVmFsdWUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpXG5cbiAgLy8gY29uc29sZS5sb2coXCIgY2hlY2tDbGFzc0NoaWxkIFwiLGVsZW1lbnQsIHBhdGgsIGlnbm9yZSk7XG5cbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS5jbGFzcywgY2xhc3NOYW1lKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiBjaGVja0NoaWxkKGVsZW1lbnQsIHBhdGgsIGAuJHtjbGFzc05hbWUudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy4nKX1gKVxufVxuXG4vKipcbiAqIFByZXNldCAnY2hlY2tBdHRyaWJ1dGUnIHdpdGggZ2xvYmFsIGRhdGFcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGVHbG9iYWwgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcm9vdCwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGNoZWNrQXR0cmlidXRlKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcm9vdCwgcHJpb3JpdHkpXG59XG5cbi8qKlxuICogUHJlc2V0ICdjaGVja0F0dHJpYnV0ZScgd2l0aCBsb2NhbCBkYXRhXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQXR0cmlidXRlTG9jYWwgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGNoZWNrQXR0cmlidXRlKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgZWxlbWVudC5wYXJlbnROb2RlLCBwcmlvcml0eSlcbn1cblxuLyoqXG4gKiBQcmVzZXQgJ2NoZWNrQ2hpbGQnIHdpdGggYXR0cmlidXRlIGRhdGFcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGVDaGlsZCAoZWxlbWVudCwgcGF0aCwgaWdub3JlLCBwcmlvcml0eSkge1xuICBjb25zdCBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5zb3J0KG9yZGVyQnlQcmlvcml0eShhdHRyaWJ1dGVzLCBwcmlvcml0eSkpLnNvbWUoKGtleSkgPT4ge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNba2V5XVxuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubmFtZVxuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlLnZhbHVlKVxuICAgIGlmIChjaGVja0lnbm9yZShpZ25vcmUuYXR0cmlidXRlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgY29uc3QgcGF0dGVybiA9IGBbJHthdHRyaWJ1dGVOYW1lfT1cIiR7YXR0cmlidXRlVmFsdWV9XCJdYFxuICAgIHJldHVybiBjaGVja0NoaWxkKGVsZW1lbnQsIHBhdGgsIHBhdHRlcm4pXG4gIH0pXG59XG5cbi8qKlxuICogUHJlc2V0ICdjaGVja1RhZycgd2l0aCBnbG9iYWwgZGF0YVxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja1RhZ0dsb2JhbCAoZWxlbWVudCwgcGF0aCwgaWdub3JlLCByb290KSB7XG4gIHJldHVybiBjaGVja1RhZyhlbGVtZW50LCBwYXRoLCBpZ25vcmUsIHJvb3QpXG59XG5cbi8qKlxuICogUHJlc2V0ICdjaGVja1RhZycgd2l0aCBsb2NhbCBkYXRhXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrVGFnTG9jYWwgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSkge1xuICByZXR1cm4gY2hlY2tUYWcoZWxlbWVudCwgcGF0aCwgaWdub3JlLCBlbGVtZW50LnBhcmVudE5vZGUpXG59XG5cbi8qKlxuICogUHJlc2V0ICdjaGVja0NoaWxkJyB3aXRoIHRhZyBkYXRhXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrVGFnQ2hpbGQgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSkge1xuICBjb25zdCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS50YWcsIHRhZ05hbWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrQ2hpbGQoZWxlbWVudCwgcGF0aCwgdGFnTmFtZSlcbn1cblxuLyoqXG4gKiBMb29rdXAgdW5pcXVlIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgIGlnbm9yZSAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tJZCAoZWxlbWVudCwgcGF0aCwgaWdub3JlKSB7XG4gIGNvbnN0IGlkID0gZXNjYXBlVmFsdWUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJykpXG4gIGlmIChjaGVja0lnbm9yZShpZ25vcmUuaWQsIGlkKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHBhdGgudW5zaGlmdChgIyR7aWR9YClcbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqXG4gKiBMb29rdXAgY2xhc3MgaWRlbnRpZmllclxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBlbGVtZW50IC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgICBwYXJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ2xhc3MgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcGFyZW50KVxue1xuICBsZXQgY2xhc3NOYW1lID0gZXNjYXBlVmFsdWUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpXG5cbiAgaWYgKGNoZWNrSWdub3JlKGlnbm9yZS5jbGFzcywgY2xhc3NOYW1lKSlcbiAge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYoZWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoID4gMClcbiAge1xuICAgICAgbGV0IGNsYXNzTmFtZUxpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcbiAgICAgIHZhciBuY2xhc3NOYW1lID0gXCJcIjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAge1xuICAgICAgICAgIGlmKHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZUxpc3RbaV0pLmxlbmd0aCA9PSAxKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZUxpc3RbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXG5cbiAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKVxuICB7XG4gICAgcGF0aC51bnNoaWZ0KGAuJHtjbGFzc05hbWUudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJy4nKX1gKVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogTG9va3VwIGF0dHJpYnV0ZSBpZGVudGlmaWVyXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48c3RyaW5nPn0gcGF0aCAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBpZ25vcmUgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtib29sZWFufSAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gY2hlY2tBdHRyaWJ1dGUgKGVsZW1lbnQsIHBhdGgsIGlnbm9yZSwgcGFyZW50LCBwcmlvcml0eSkge1xuICBjb25zdCBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzXG4gIHJldHVybiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5zb3J0KG9yZGVyQnlQcmlvcml0eShhdHRyaWJ1dGVzLCBwcmlvcml0eSkpLnNvbWUoKGtleSkgPT4ge1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNba2V5XVxuICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubmFtZVxuICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gZXNjYXBlVmFsdWUoYXR0cmlidXRlLnZhbHVlKVxuICAgIGlmIChjaGVja0lnbm9yZShpZ25vcmUuYXR0cmlidXRlLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSwgZGVmYXVsdElnbm9yZS5hdHRyaWJ1dGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgY29uc3QgcGF0dGVybiA9IGBbJHthdHRyaWJ1dGVOYW1lfT1cIiR7YXR0cmlidXRlVmFsdWV9XCJdYFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcGF0aC51bnNoaWZ0KHBhdHRlcm4pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBMb29rdXAgdGFnIGlkZW50aWZpZXJcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gICAgZWxlbWVudCAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5LjxzdHJpbmc+fSBwYXRoICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIHBhcmVudCAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgaWdub3JlICAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge2Jvb2xlYW59ICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja1RhZyAoZWxlbWVudCwgcGF0aCwgaWdub3JlLCBwYXJlbnQpIHtcbiAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gIGlmIChjaGVja0lnbm9yZShpZ25vcmUudGFnLCB0YWdOYW1lKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IG1hdGNoZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSlcbiAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgcGF0aC51bnNoaWZ0KHRhZ05hbWUpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBMb29rdXAgY2hpbGQgaWRlbnRmaWVyXG4gKlxuICogTm90ZTogY2hpbGRUYWdzIGlzIGEgY3VzdG9tIHByb3BlcnR5IHRvIHVzZSBhIHZpZXcgZmlsdGVyIGZvciB0YWdzIG9uIGZvciB2aXJ1dGFsIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9ICAgIGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7QXJyYXkuPHN0cmluZz59IHBhdGggICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgIHNlbGVjdG9yIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjaGVja0NoaWxkIChlbGVtZW50LCBwYXRoLCBzZWxlY3Rvcikge1xuICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGVcbiAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRUYWdzIHx8IHBhcmVudC5jaGlsZHJlblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChjaGlsZHJlbltpXSA9PT0gZWxlbWVudCkge1xuICAgICAgcGF0aC51bnNoaWZ0KGA+ICR7c2VsZWN0b3J9Om50aC1jaGlsZCgke2krMX0pYClcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIFZhbGlkYXRlIHdpdGggY3VzdG9tIGFuZCBkZWZhdWx0IGZ1bmN0aW9uc1xuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBwcmVkaWNhdGUgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgIG5hbWUgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdmFsdWUgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBkZWZhdWx0UHJlZGljYXRlIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIGNoZWNrSWdub3JlIChwcmVkaWNhdGUsIG5hbWUsIHZhbHVlLCBkZWZhdWx0UHJlZGljYXRlKSB7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgY29uc3QgY2hlY2sgPSBwcmVkaWNhdGUgfHwgZGVmYXVsdFByZWRpY2F0ZVxuICBpZiAoIWNoZWNrKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrKG5hbWUsIHZhbHVlIHx8IG5hbWUsIGRlZmF1bHRQcmVkaWNhdGUpXG59XG5cbi8qKlxuICogUmFuayB0aGUgYXR0cmlidXRlIG5hbWVzIGJ5IHRoZWlyIGdlbmVyYWwgcmVsZXZhbmNlIGZvciBhIHdlYnNpdGVcbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgYXR0cmlidXRlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0FycmF5fSAgICBwcmlvcml0eSAgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7RnVuY3Rpb259ICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gKi9cbmZ1bmN0aW9uIG9yZGVyQnlQcmlvcml0eSAoYXR0cmlidXRlcywgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIChjdXJyLCBuZXh0KSA9PiB7XG4gICAgcmV0dXJuIHByaW9yaXR5LmluZGV4T2YoYXR0cmlidXRlc1tjdXJyXS5uYW1lKSAtIHByaW9yaXR5LmluZGV4T2YoYXR0cmlidXRlc1tuZXh0XS5uYW1lKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWF0Y2guanMiLCIvKipcbiAqICMgVXRpbGl0aWVzXG4gKlxuICogQ29udmVuaWVuY2UgaGVscGVyc1xuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuIGFycmF5IHdpdGggdGhlIERPTSBub2RlcyBvZiB0aGUgbGlzdFxuICpcbiAqIEBwYXJhbSAge05vZGVMaXN0fSAgICAgICAgICAgICBub2RlcyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0FycmF5LjxIVE1MRWxlbWVudD59ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnROb2RlTGlzdCAobm9kZXMpIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IG5vZGVzXG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBhcnJbaV0gPSBub2Rlc1tpXVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuLyoqXG4gKiBFc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGxpa2UgcXVvdGVzIGFuZCBiYWNrc2xhc2hlc1xuICpcbiAqIERlc2NyaXB0aW9uIG9mIHZhbGlkIGNoYXJhY3RlcnM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9xdWVyeVNlbGVjdG9yI05vdGVzXG4gKlxuICogQHBhcmFtICB7U3RyaW5nP30gdmFsdWUgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdmFsdWUucmVwbGFjZSgvWydcImBcXFxcLzpcXD8mISMkJV4oKVtcXF17fH0qKzssLjw9PkB+XS9nLCAnXFxcXCQmJylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsaXRpZXMuanMiLCIvKipcbiAqICMgT3B0aW1pemVcbiAqXG4gKiAxLikgSW1wcm92ZSBlZmZpY2llbmN5IHRocm91Z2ggc2hvcnRlciBzZWxlY3RvcnMgYnkgcmVtb3ZpbmcgcmVkdW5kYW5jeVxuICogMi4pIEltcHJvdmUgcm9idXN0bmVzcyB0aHJvdWdoIHNlbGVjdG9yIHRyYW5zZm9ybWF0aW9uXG4gKi9cblxuaW1wb3J0IGFkYXB0IGZyb20gJy4vYWRhcHQnXG5pbXBvcnQgeyBjb252ZXJ0Tm9kZUxpc3QgfSBmcm9tICcuL3V0aWxpdGllcydcblxuLyoqXG4gKiBBcHBseSBkaWZmZXJlbnQgb3B0aW1pemF0aW9uIHRlY2huaXF1ZXNcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fEFycmF5LjxIVE1MRWxlbWVudD59IGVsZW1lbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3B0aW1pemUgKHNlbGVjdG9yLCBlbGVtZW50cywgb3B0aW9ucyA9IHt9KSB7XG5cbiAgY29uc29sZS5sb2coXCIgT3B0aW1hbFNlbGVjdCAgXCIsc2VsZWN0b3IsIG9wdGlvbnMpO1xuICBjb25zb2xlLnRyYWNlKCk7ICBcblxuICAvLyBjb252ZXJ0IHNpbmdsZSBlbnRyeSBhbmQgTm9kZUxpc3RcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSkge1xuICAgIGVsZW1lbnRzID0gIWVsZW1lbnRzLmxlbmd0aCA/IFtlbGVtZW50c10gOiBjb252ZXJ0Tm9kZUxpc3QoZWxlbWVudHMpXG4gIH1cblxuICBpZiAoIWVsZW1lbnRzLmxlbmd0aCB8fCBlbGVtZW50cy5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dCAtIHRvIGNvbXBhcmUgSFRNTEVsZW1lbnRzIGl0cyBuZWNlc3NhcnkgdG8gcHJvdmlkZSBhIHJlZmVyZW5jZSBvZiB0aGUgc2VsZWN0ZWQgbm9kZShzKSEgKG1pc3NpbmcgXCJlbGVtZW50c1wiKWApXG4gIH1cblxuICBjb25zdCBnbG9iYWxNb2RpZmllZCA9IGFkYXB0KGVsZW1lbnRzWzBdLCBvcHRpb25zKVxuXG4gIC8vIGNodW5rIHBhcnRzIG91dHNpZGUgb2YgcXVvdGVzIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTY2MzcyOSlcbiAgdmFyIHBhdGggPSBzZWxlY3Rvci5yZXBsYWNlKC8+IC9nLCAnPicpLnNwbGl0KC9cXHMrKD89KD86KD86W15cIl0qXCIpezJ9KSpbXlwiXSokKS8pXG5cbiAgaWYgKHBhdGgubGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBvcHRpbWl6ZVBhcnQoJycsIHNlbGVjdG9yLCAnJywgZWxlbWVudHMpXG4gIH1cblxuICBjb25zdCBzaG9ydGVuZWQgPSBbcGF0aC5wb3AoKV1cbiAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkgIHtcbiAgICBjb25zdCBjdXJyZW50ID0gcGF0aC5wb3AoKVxuICAgIGNvbnN0IHByZVBhcnQgPSBwYXRoLmpvaW4oJyAnKVxuICAgIGNvbnN0IHBvc3RQYXJ0ID0gc2hvcnRlbmVkLmpvaW4oJyAnKVxuXG4gICAgY29uc3QgcGF0dGVybiA9IGAke3ByZVBhcnR9ICR7cG9zdFBhcnR9YFxuICAgIGNvbnN0IG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSBlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIHNob3J0ZW5lZC51bnNoaWZ0KG9wdGltaXplUGFydChwcmVQYXJ0LCBjdXJyZW50LCBwb3N0UGFydCwgZWxlbWVudHMpKVxuICAgIH1cbiAgfVxuICBzaG9ydGVuZWQudW5zaGlmdChwYXRoWzBdKVxuICBwYXRoID0gc2hvcnRlbmVkXG5cbiAgLy8gb3B0aW1pemUgc3RhcnQgKyBlbmRcbiAgcGF0aFswXSA9IG9wdGltaXplUGFydCgnJywgcGF0aFswXSwgcGF0aC5zbGljZSgxKS5qb2luKCcgJyksIGVsZW1lbnRzKVxuICBwYXRoW3BhdGgubGVuZ3RoLTFdID0gb3B0aW1pemVQYXJ0KHBhdGguc2xpY2UoMCwgLTEpLmpvaW4oJyAnKSwgcGF0aFtwYXRoLmxlbmd0aC0xXSwgJycsIGVsZW1lbnRzKVxuXG4gIGlmIChnbG9iYWxNb2RpZmllZCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnRcbiAgfVxuXG4gIHJldHVybiBwYXRoLmpvaW4oJyAnKS5yZXBsYWNlKC8+L2csICc+ICcpLnRyaW0oKVxufVxuXG4vKipcbiAqIEltcHJvdmUgYSBjaHVuayBvZiB0aGUgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICBwcmVQYXJ0ICAtIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgIGN1cnJlbnQgIC0gW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgcG9zdFBhcnQgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBvcHRpbWl6ZVBhcnQgKHByZVBhcnQsIGN1cnJlbnQsIHBvc3RQYXJ0LCBlbGVtZW50cykge1xuICBpZiAocHJlUGFydC5sZW5ndGgpIHByZVBhcnQgPSBgJHtwcmVQYXJ0fSBgXG4gIGlmIChwb3N0UGFydC5sZW5ndGgpIHBvc3RQYXJ0ID0gYCAke3Bvc3RQYXJ0fWBcblxuICAvLyByb2J1c3RuZXNzOiBhdHRyaWJ1dGUgd2l0aG91dCB2YWx1ZSAoZ2VuZXJhbGl6YXRpb24pXG4gIGlmICgvXFxbKlxcXS8udGVzdChjdXJyZW50KSkge1xuICAgIGNvbnN0IGtleSA9IGN1cnJlbnQucmVwbGFjZSgvPS4qJC8sICddJylcbiAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtrZXl9JHtwb3N0UGFydH1gXG4gICAgdmFyIG1hdGNoZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhdHRlcm4pXG4gICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgY3VycmVudCA9IGtleVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByb2J1c3RuZXNzOiByZXBsYWNlIHNwZWNpZmljIGtleS12YWx1ZSB3aXRoIGJhc2UgdGFnIChoZXVyaXN0aWMpXG4gICAgICBjb25zdCByZWZlcmVuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtwcmVQYXJ0fSR7a2V5fWApXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlZmVyZW5jZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSkpIHtcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHJlZmVyZW5jZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtkZXNjcmlwdGlvbn0ke3Bvc3RQYXJ0fWBcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgICAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHJvYnVzdG5lc3M6IGRlc2NlbmRhbnQgaW5zdGVhZCBjaGlsZCAoaGV1cmlzdGljKVxuICBpZiAoLz4vLnRlc3QoY3VycmVudCkpIHtcbiAgICBjb25zdCBkZXNjZW5kYW50ID0gY3VycmVudC5yZXBsYWNlKC8+LywgJycpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7ZGVzY2VuZGFudH0ke3Bvc3RQYXJ0fWBcbiAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICBjdXJyZW50ID0gZGVzY2VuZGFudFxuICAgIH1cbiAgfVxuXG4gIC8vIHJvYnVzdG5lc3M6ICdudGgtb2YtdHlwZScgaW5zdGVhZCAnbnRoLWNoaWxkJyAoaGV1cmlzdGljKVxuICBpZiAoLzpudGgtY2hpbGQvLnRlc3QoY3VycmVudCkpIHtcbiAgICAvLyBUT0RPOiBjb25zaWRlciBjb21wbGV0ZSBjb3ZlcmFnZSBvZiAnbnRoLW9mLXR5cGUnIHJlcGxhY2VtZW50XG4gICAgY29uc3QgdHlwZSA9IGN1cnJlbnQucmVwbGFjZSgvbnRoLWNoaWxkL2csICdudGgtb2YtdHlwZScpXG4gICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7dHlwZX0ke3Bvc3RQYXJ0fWBcbiAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICBjdXJyZW50ID0gdHlwZVxuICAgIH1cbiAgfVxuXG4gIC8vIGVmZmljaWVuY3k6IGNvbWJpbmF0aW9ucyBvZiBjbGFzc25hbWUgKHBhcnRpYWwgcGVybXV0YXRpb25zKVxuICBpZiAoL1xcLlxcUytcXC5cXFMrLy50ZXN0KGN1cnJlbnQpKSB7XG4gICAgY29uc3QgbmFtZXMgPSBjdXJyZW50LnRyaW0oKS5zcGxpdCgnLicpLnNsaWNlKDEpLm1hcCgobmFtZSkgPT4gYC4ke25hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGN1cnIsIG5leHQpID0+IGN1cnIubGVuZ3RoIC0gbmV4dC5sZW5ndGgpXG4gICAgd2hpbGUgKG5hbWVzLmxlbmd0aCkge1xuICAgICAgdmFyIHBhcnRpYWwgPSBjdXJyZW50LnJlcGxhY2UobmFtZXMuc2hpZnQoKSwgJycpLnRyaW0oKVxuICAgICAgdmFyIHBhdHRlcm4gPSBgJHtwcmVQYXJ0fSR7cGFydGlhbH0ke3Bvc3RQYXJ0fWAudHJpbSgpXG4gICAgICBpZiAoIXBhdHRlcm4ubGVuZ3RoIHx8IHBhdHRlcm4uY2hhckF0KDApID09PSAnPicpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIHZhciBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXR0ZXJuKVxuICAgICAgaWYgKGNvbXBhcmVSZXN1bHRzKG1hdGNoZXMsIGVsZW1lbnRzKSkge1xuICAgICAgICBjdXJyZW50ID0gcGFydGlhbFxuICAgICAgfVxuICAgIH1cbiAgICAvLyByb2J1c3RuZXNzOiBkZWdyYWRlIGNvbXBsZXggY2xhc3NuYW1lIChoZXVyaXN0aWMpXG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC5tYXRjaCgvXFwuL2cpLmxlbmd0aCA+IDIpIHtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAke3ByZVBhcnR9JHtjdXJyZW50fWApXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlZmVyZW5jZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV1cbiAgICAgICAgaWYgKGVsZW1lbnRzLnNvbWUoKGVsZW1lbnQpID0+IHJlZmVyZW5jZS5jb250YWlucyhlbGVtZW50KSApKSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgICAvLyAtIGNoZWNrIHVzaW5nIGF0dHJpYnV0ZXMgKyByZWdhcmQgZXhjbHVkZXNcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHJlZmVyZW5jZS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICB2YXIgcGF0dGVybiA9IGAke3ByZVBhcnR9JHtkZXNjcmlwdGlvbn0ke3Bvc3RQYXJ0fWBcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0dGVybilcbiAgICAgICAgICBpZiAoY29tcGFyZVJlc3VsdHMobWF0Y2hlcywgZWxlbWVudHMpKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8qKlxuICogRXZhbHVhdGUgbWF0Y2hlcyB3aXRoIGV4cGVjdGVkIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50Pn0gbWF0Y2hlcyAgLSBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBjb21wYXJlUmVzdWx0cyAobWF0Y2hlcywgZWxlbWVudHMpIHtcbiAgY29uc3QgeyBsZW5ndGggfSA9IG1hdGNoZXNcbiAgcmV0dXJuIGxlbmd0aCA9PT0gZWxlbWVudHMubGVuZ3RoICYmIGVsZW1lbnRzLmV2ZXJ5KChlbGVtZW50KSA9PiB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG1hdGNoZXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvb3B0aW1pemUuanMiLCIvKipcbiAqICMgQ29tbW9uXG4gKlxuICogR3JvdXAgc2ltaWxhcnNcbiAqL1xuXG4vKipcbiAqIEZpbmQgdGhlIGxhc3QgY29tbW9uIGFuY2VzdG9yIG9mIGVsZW1lbnRzXG4gKlxuICogQHBhcmFtICB7QXJyYXkuPEhUTUxFbGVtZW50cz59IGVsZW1lbnRzIC0gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9ICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uQW5jZXN0b3IgKGVsZW1lbnRzLCBvcHRpb25zID0ge30pIHtcblxuICBjb25zdCB7XG4gICAgcm9vdCA9IGRvY3VtZW50LFxuICAgIHNraXAgPSBudWxsLFxuICAgIGlnbm9yZSA9IHt9XG4gIH0gPSBvcHRpb25zXG5cbiAgY29uc3QgYW5jZXN0b3JzID0gW11cblxuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXVxuICAgIHdoaWxlIChlbGVtZW50ICE9PSByb290KSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlXG4gICAgICBwYXJlbnRzLnVuc2hpZnQoZWxlbWVudClcbiAgICB9XG4gICAgYW5jZXN0b3JzW2luZGV4XSA9IHBhcmVudHNcbiAgfSlcblxuICBhbmNlc3RvcnMuc29ydCgoY3VyciwgbmV4dCkgPT4gY3Vyci5sZW5ndGggLSBuZXh0Lmxlbmd0aClcblxuICBjb25zdCBzaGFsbG93QW5jZXN0b3IgPSBhbmNlc3RvcnMuc2hpZnQoKVxuXG4gIHZhciBhbmNlc3RvciA9IG51bGxcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHNoYWxsb3dBbmNlc3Rvci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBjb25zdCBwYXJlbnQgPSBzaGFsbG93QW5jZXN0b3JbaV1cbiAgICBjb25zdCBtaXNzaW5nID0gYW5jZXN0b3JzLnNvbWUoKG90aGVyUGFyZW50cykgPT4ge1xuICAgICAgcmV0dXJuICFvdGhlclBhcmVudHMuc29tZSgob3RoZXJQYXJlbnQpID0+IG90aGVyUGFyZW50ID09PSBwYXJlbnQpXG4gICAgfSlcblxuICAgIGlmIChtaXNzaW5nKSB7XG4gICAgICAvLyBUT0RPOiBmaW5kIHNpbWlsYXIgc3ViLXBhcmVudHMsIG5vdCB0aGUgdG9wIHJvb3QsIGUuZy4gc2hhcmluZyBhIGNsYXNzIHNlbGVjdG9yXG4gICAgICBicmVha1xuICAgIH1cblxuICAgIGFuY2VzdG9yID0gcGFyZW50XG4gIH1cblxuICByZXR1cm4gYW5jZXN0b3Jcbn1cblxuLyoqXG4gKiBHZXQgYSBzZXQgb2YgY29tbW9uIHByb3BlcnRpZXMgb2YgZWxlbWVudHNcbiAqXG4gKiBAcGFyYW0gIHtBcnJheS48SFRNTEVsZW1lbnQ+fSBlbGVtZW50cyAtIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgIC0gW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbW9uUHJvcGVydGllcyAoZWxlbWVudHMpIHtcblxuICBjb25zdCBjb21tb25Qcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzZXM6IFtdLFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIHRhZzogbnVsbFxuICB9XG5cbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuXG4gICAgdmFyIHtcbiAgICAgIGNsYXNzZXM6IGNvbW1vbkNsYXNzZXMsXG4gICAgICBhdHRyaWJ1dGVzOiBjb21tb25BdHRyaWJ1dGVzLFxuICAgICAgdGFnOiBjb21tb25UYWdcbiAgICB9ID0gY29tbW9uUHJvcGVydGllc1xuXG4gICAgLy8gfiBjbGFzc2VzXG4gICAgaWYgKGNvbW1vbkNsYXNzZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgICAgaWYgKGNsYXNzZXMpIHtcbiAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJylcbiAgICAgICAgaWYgKCFjb21tb25DbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNsYXNzZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tb25DbGFzc2VzID0gY29tbW9uQ2xhc3Nlcy5maWx0ZXIoKGVudHJ5KSA9PiBjbGFzc2VzLnNvbWUoKG5hbWUpID0+IG5hbWUgPT09IGVudHJ5KSlcbiAgICAgICAgICBpZiAoY29tbW9uQ2xhc3Nlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbW1vblByb3BlcnRpZXMuY2xhc3NlcyA9IGNvbW1vbkNsYXNzZXNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGNvbW1vblByb3BlcnRpZXMuY2xhc3Nlc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogcmVzdHJ1Y3R1cmUgcmVtb3ZhbCBhcyAyeCBzZXQgLyAyeCBkZWxldGUsIGluc3RlYWQgb2YgbW9kaWZ5IGFsd2F5cyByZXBsYWNpbmcgd2l0aCBuZXcgY29sbGVjdGlvblxuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5jbGFzc2VzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiBhdHRyaWJ1dGVzXG4gICAgaWYgKGNvbW1vbkF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgZWxlbWVudEF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXNcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhlbGVtZW50QXR0cmlidXRlcykucmVkdWNlKChhdHRyaWJ1dGVzLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlID0gZWxlbWVudEF0dHJpYnV0ZXNba2V5XVxuICAgICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlLm5hbWVcbiAgICAgICAgLy8gTk9URTogd29ya2Fyb3VuZCBkZXRlY3Rpb24gZm9yIG5vbi1zdGFuZGFyZCBwaGFudG9tanMgTmFtZWROb2RlTWFwIGJlaGF2aW91clxuICAgICAgICAvLyAoaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzE0NjM0KVxuICAgICAgICBpZiAoYXR0cmlidXRlICYmIGF0dHJpYnV0ZU5hbWUgIT09ICdjbGFzcycpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXNcbiAgICAgIH0sIHt9KVxuXG4gICAgICBjb25zdCBhdHRyaWJ1dGVzTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKVxuICAgICAgY29uc3QgY29tbW9uQXR0cmlidXRlc05hbWVzID0gT2JqZWN0LmtleXMoY29tbW9uQXR0cmlidXRlcylcblxuICAgICAgaWYgKGF0dHJpYnV0ZXNOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFjb21tb25BdHRyaWJ1dGVzTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1vbkF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzTmFtZXMucmVkdWNlKChuZXh0Q29tbW9uQXR0cmlidXRlcywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb21tb25BdHRyaWJ1dGVzW25hbWVdXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGF0dHJpYnV0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1vbkF0dHJpYnV0ZXNbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5leHRDb21tb25BdHRyaWJ1dGVzXG4gICAgICAgICAgfSwge30pXG4gICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbW1vbkF0dHJpYnV0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlc1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy5hdHRyaWJ1dGVzXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gfiB0YWdcbiAgICBpZiAoY29tbW9uVGFnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHRhZyA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICBpZiAoIWNvbW1vblRhZykge1xuICAgICAgICBjb21tb25Qcm9wZXJ0aWVzLnRhZyA9IHRhZ1xuICAgICAgfSBlbHNlIGlmICh0YWcgIT09IGNvbW1vblRhZykge1xuICAgICAgICBkZWxldGUgY29tbW9uUHJvcGVydGllcy50YWdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNvbW1vblByb3BlcnRpZXNcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24uanMiXSwic291cmNlUm9vdCI6IiJ9