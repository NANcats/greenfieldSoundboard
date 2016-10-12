/******/ (function(modules) { // webpackBootstrap
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

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	//input syntax:  {
	//  targetKeyCode1: "/path/to/source/file.wav",
	//  targetKeyCode2: "/path/to/next/source.wav"
	//  ...
	//}

	var testData = {
	  97: "/soundfiles/deep-techno-groove.wav",
	  98: "/soundfiles/beltbuckle.wav",
	  99: "/soundfiles/footsteps.wav",
	  100: "/soundfiles/grendel.wav",
	  101: "/soundfiles/beads.wav",
	  102: "/soundfiles/beltbuckle.wav",
	  103: "/soundfiles/footsteps.wav",
	  104: "/soundfiles/grendel.wav",
	  105: "/soundfiles/beads.wav",
	  106: "/soundfiles/beltbuckle.wav",
	  107: "/soundfiles/footsteps.wav",
	  108: "/soundfiles/grendel.wav",
	  109: "/soundfiles/beads.wav",
	  110: "/soundfiles/beltbuckle.wav",
	  111: "/soundfiles/footsteps.wav",
	  112: "/soundfiles/grendel.wav",
	  113: "/soundfiles/beltbuckle.wav",
	  114: "/soundfiles/footsteps.wav",
	  115: "/soundfiles/grendel.wav",
	  116: "/soundfiles/beads.wav",
	  117: "/soundfiles/beltbuckle.wav",
	  118: "/soundfiles/footsteps.wav",
	  119: "/soundfiles/grendel.wav",
	  120: "/soundfiles/beads.wav",
	  121: "/soundfiles/beltbuckle.wav",
	  122: "/soundfiles/footsteps.wav"
	};

	var qwertyMap = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 0, 122, 120, 99, 118, 98, 110, 109];

	//sample input:
	//This example would bind the 'a' key to the "example.wav" file.
	//{
	//  65: '/path/to/example'
	//}

	//For a comprehensive list of keycode bindings, see "keycode.js"
	//in this same directory.
	var VKey = React.createClass({
	  displayName: "VKey",

	  // the initial state houses the player, which is set to false.
	  getInitialState: function getInitialState() {
	    return {
	      isShiftPressed: false,
	      playing: false
	    };
	  },
	  // when a key is pressed, change key color, set player to true, and play it.
	  handleKeyPress: function handleKeyPress(event) {
	    var $audio = document.getElementById(this.props.targetKey);
	    var $vKey = $('#' + event.keyCode).parent();
	    if ("" + event.keyCode === "" + (this.props.targetKey - 32)) {
	      $vKey = $('#' + (event.keyCode + 32)).parent();
	      $vKey.addClass('red');
	      $audio.loop = $audio.loop ? false : true;
	      $audio.currentTime = 0;
	      $audio.paused ? $audio.play() : $audio.pause();
	    }
	    if ("" + event.keyCode === "" + this.props.targetKey) {
	      $vKey.addClass('green');
	      $audio.currentTime = 0;
	      if ($audio.paused) {
	        $audio.play();
	      } else {
	        $audio.pause();
	        $vKey.removeClass('green');
	        $vKey.removeClass('red');
	      }
	      event.preventDefault();
	    }
	    this.render();
	  },

	  handleAudioEnd: function handleAudioEnd(event) {
	    var $vKey = $('#' + this.props.targetKey).parent();
	    $vKey.removeClass('green');
	    $vKey.removeClass('red');
	    event.preventDefault();
	    this.render();
	  },

	  componentDidMount: function componentDidMount(event) {
	    window.addEventListener('keypress', this.handleKeyPress);
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "key", onKeyPress: this.handleKeyPress },
	      React.createElement(
	        "p",
	        { className: "keyLabel" },
	        keyCodes[this.props.targetKey]
	      ),
	      React.createElement(
	        "p",
	        { className: "filename" },
	        this.props.path.split("/").pop()
	      ),
	      React.createElement("audio", { id: this.props.targetKey, src: this.props.path, onEnded: this.handleAudioEnd, preload: "auto" })
	    ) //
	    ;
	  }
	});
	var App = React.createClass({
	  displayName: "App",

	  render: function render() {
	    qwertyMap = qwertyMap.map(function (key) {
	      if (key !== 0) {
	        return { key: key, path: testData[key] };
	      } else {
	        return 0;
	      }
	    });
	    return React.createElement(
	      "div",
	      { className: "keyboard" },
	      qwertyMap.map(function (keyBinding, idx) {
	        if (keyBinding === 0) {
	          return React.createElement("br", null);
	        } else {
	          return React.createElement(VKey, { targetKey: keyBinding.key, path: keyBinding.path });
	        }
	      })
	    );
	  }
	});

	ReactDOM.render(React.createElement(
	  "div",
	  null,
	  React.createElement(App, null)
	), document.getElementById('app'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	'esversion: 6';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layout = function (_React$Component) {
	  _inherits(Layout, _React$Component);

	  function Layout() {
	    _classCallCheck(this, Layout);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
	  }

	  _createClass(Layout, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'keyboard' },
	        React.createElement(
	          'h1',
	          null,
	          'Welcome to Soundboard!'
	        )
	      );
	    }
	  }]);

	  return Layout;
	}(React.Component);

	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(Layout, null)
	), document.getElementById('app'));

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var keyCodes = {
	  3: "break",
	  8: "backspace / delete",
	  9: "tab",
	  12: 'clear',
	  13: "enter",
	  16: "shift",
	  17: "ctrl ",
	  18: "alt",
	  19: "pause/break",
	  20: "caps lock",
	  27: "escape",
	  32: "spacebar",
	  33: "page up",
	  34: "page down",
	  35: "end",
	  36: "home ",
	  37: "left arrow ",
	  38: "up arrow ",
	  39: "right arrow",
	  40: "down arrow ",
	  41: "select",
	  42: "print",
	  43: "execute",
	  44: "Print Screen",
	  45: "insert ",
	  46: "delete",
	  48: "0",
	  49: "1",
	  50: "2",
	  51: "3",
	  52: "4",
	  53: "5",
	  54: "6",
	  55: "7",
	  56: "8",
	  57: "9",
	  58: ":",
	  59: "semicolon (firefox), equals",
	  60: "<",
	  61: "equals (firefox)",
	  63: "ß",
	  64: "@ (firefox)",
	  65: "a",
	  66: "b",
	  67: "c",
	  68: "d",
	  69: "e",
	  70: "f",
	  71: "g",
	  72: "h",
	  73: "i",
	  74: "j",
	  75: "k",
	  76: "l",
	  77: "m",
	  78: "n",
	  79: "o",
	  80: "p",
	  81: "q",
	  82: "r",
	  83: "s",
	  84: "t",
	  85: "u",
	  86: "v",
	  87: "w",
	  88: "x",
	  89: "y",
	  90: "z",
	  91: "Windows Key / Left ⌘ / Chromebook Search key",
	  92: "right window key ",
	  93: "Windows Menu / Right ⌘",
	  96: "numpad 0 ",
	  97: "a",
	  98: "b",
	  99: "c",
	  100: "d",
	  101: "e",
	  102: "f",
	  103: "g",
	  104: "h",
	  105: "i",
	  106: "j",
	  107: "k",
	  108: "l",
	  109: "m",
	  110: "n",
	  111: "o",
	  112: "p",
	  113: "q",
	  114: "r",
	  115: "s",
	  116: "t",
	  117: "u",
	  118: "v",
	  119: "w",
	  120: "x",
	  121: "y",
	  122: "z",
	  123: "f12",
	  124: "f13",
	  125: "f14",
	  126: "f15",
	  127: "f16",
	  128: "f17",
	  129: "f18",
	  130: "f19",
	  131: "f20",
	  132: "f21",
	  133: "f22",
	  134: "f23",
	  135: "f24",
	  144: "num lock ",
	  145: "scroll lock",
	  160: "^",
	  161: '!',
	  163: "#",
	  164: '$',
	  165: 'ù',
	  166: "page backward",
	  167: "page forward",
	  169: "closing paren (AZERTY)",
	  170: '*',
	  171: "~ + * key",
	  173: "minus (firefox), mute/unmute",
	  174: "decrease volume level",
	  175: "increase volume level",
	  176: "next",
	  177: "previous",
	  178: "stop",
	  179: "play/pause",
	  180: "e-mail",
	  181: "mute/unmute (firefox)",
	  182: "decrease volume level (firefox)",
	  183: "increase volume level (firefox)",
	  186: "semi-colon / ñ",
	  187: "equal sign ",
	  188: "comma",
	  189: "dash ",
	  190: "period ",
	  191: "forward slash / ç",
	  192: "grave accent / ñ",
	  193: "?, / or °",
	  194: "numpad period (chrome)",
	  219: "open bracket ",
	  220: "back slash ",
	  221: "close bracket ",
	  222: "single quote ",
	  223: "`",
	  224: "left or right ⌘ key (firefox)",
	  225: "altgr",
	  226: "< /git >",
	  230: "GNOME Compose Key",
	  233: "XF86Forward",
	  234: "XF86Back",
	  255: "toggle touchpad"
	};

/***/ }
/******/ ]);