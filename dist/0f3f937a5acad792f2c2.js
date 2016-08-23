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
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	//sample input:
	//This example would bind the 'a' key to the "example.wav" file.
	//{
	//  65: '/path/to/example'
	//}

	//For a comprehensive list of keycode bindings, see "keycode.js"
	//in this same directory.

	// App React class.  Contains a number of methods which control the audio, as well as rendering pretty much the whole damn app.
	var App = React.createClass({
	  displayName: "App",

	  //declaring some states.
	  getInitialState: function getInitialState() {
	    return {
	      bindings: [],
	      soundList: [],
	      changeKey: ""
	    };
	  },
	  //once the component mounts, we set those states equal to the correct data.  We also hide the binding window using JQuery until it is required.
	  componentDidMount: function componentDidMount() {
	    $('#bindingWindow').hide();
	    this.serverRequest = $.get(window.location.href + "sounds", function (result) {
	      this.setState({
	        soundList: result,
	        bindings: qwertyMap.map(function (key) {
	          return key !== 0 ? { key: key, path: defaultData[key], loop: false, playing: false } : 0;
	        })
	      });
	    }.bind(this));
	    //OSX and MAC reserve functionality of either the alt or ctrl key, this checks the OS
	    // and sets the rebind-key trigger to be that specific keypress
	    navigator.appVersion.includes("Windows") ? this.setState({ bindTrigger: "altKey" }) : this.setState({ bindTrigger: "ctrlKey" });

	    //one event listener for all keypresses.
	    window.addEventListener('keypress', this.handleKeyPress);
	  },

	  //I'm not sure why this is important but online resources say put it in and it doesn't break anything.
	  componentWillUnmount: function componentWillUnmount() {
	    this.serverRequest.abort();
	  },

	  //this is our keyhandler function.  It handles all keypress events on the DOM.  Plays/stops the appropriate sound file,
	  //as well as changing the styling on the appropriate hey.
	  handleKeyPress: function handleKeyPress(event) {
	    //store all our relevent DOM elements as variables so that we can reference them easily later.
	    var key = event.code.toLowerCase()[3],
	        keyNumber = key.charCodeAt(),
	        $audio = document.getElementById(keyNumber),
	        $vKey = $('#' + keyNumber).parent();

	    // handles the ctrl+key menu drop.
	    // originally checked boolean value [ event.ctrlKey ] to check to see if ctrl was
	    // held down or not. Now this.state.bindTrigger is declared upon component mount to
	    // be ctrlKey for mac OSX and altKey for windows.
	    if (event[this.state.bindTrigger] && $('#keyboardWindow').is(':visible')) {
	      if (keyNumber < 123 && keyNumber > 96) {
	        this.setState({ changeKey: key });
	        this.handleCtrlKey();
	      }
	    } else if (event.shiftKey) {
	      //handles the shift+key loop functionality
	      $vKey.addClass('red pressed');
	      this.handleShiftKey($audio, event);
	    } else {
	      //handles a bare keypress.
	      this.triggerKey($vKey, $audio);
	    }
	  },

	  //All this does is change the styling of a key as appropriate, and plays/pauses the audio element as appropriate.
	  triggerKey: function triggerKey($vKey, $audio) {
	    $vKey.addClass('green pressed');
	    $audio.currentTime = 0;

	    if ($audio.paused) {
	      $audio.play();
	    } else {
	      $audio.pause();
	      $vKey.removeClass('green red pressed');
	    }
	    event.preventDefault();
	  },
	  //Hides and shows the rebinding menu using jQuery.
	  handleCtrlKey: function handleCtrlKey() {
	    $('#bindingWindow').animate({ height: 'toggle' }, 350);
	    $('#keyboardWindow').animate({ width: 'toggle' }, 350);
	  },

	  //Sets the specified audio element to loop, then plays/pauses and styles as appropriate.
	  handleShiftKey: function handleShiftKey($audio, event) {
	    var key = event.code.toLowerCase()[3],
	        keyNumber = key.charCodeAt(),
	        $vKey = $('#' + keyNumber).parent();
	    $audio.loop = !$audio.loop;
	    $audio.currentTime = 0;
	    if ($audio.paused) {
	      $audio.play();
	    } else {
	      $audio.pause();
	      $vKey.removeClass('green red pressed');
	    }
	  },

	  //useful helper for re-rendering DOM when a new binding is assigned.
	  reRender: function reRender() {
	    $('#bindingWindow').animate({ height: 'toggle' }, 350);
	    $('#keyboardWindow').animate({ width: 'toggle' }, 350);
	    ReactDOM.render(React.createElement(
	      "div",
	      null,
	      React.createElement(App, null)
	    ), document.getElementById('app'));
	  },

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      "div",
	      { id: "appWindow" },
	      React.createElement(
	        "div",
	        { id: "bindingWindow" },
	        React.createElement(
	          "h3",
	          null,
	          "Click on a file to change the binding of ",
	          this.state.changeKey.toUpperCase(),
	          " to"
	        ),
	        React.createElement(
	          "ul",
	          { id: "binding" },
	          this.state.soundList.map(function (sound, idx) {
	            return (//es6 again
	              React.createElement(RebindNode, { key: idx, targetSong: sound, targetKey: _this.state.changeKey, bindings: _this.state.bindings, reRender: _this.reRender })
	            );
	          }, this)
	        )
	      ),
	      React.createElement(
	        "div",
	        { id: "keyboardWindow", className: "keyboard" },
	        this.state.bindings.map(function (keyBinding, idx) {
	          return (//yay es6
	            keyBinding === 0 ? React.createElement("br", { key: idx }) : React.createElement(VKey, { key: idx, keyId: keyBinding.key, path: keyBinding.path })
	          );
	        })
	      )
	    );
	  }
	});

	//This simulates a loading page. In all of our tests the server loaded the sound
	//files instantly but by the time we noticed this we already had an awesome
	//loading page up and running. This timeout feature honors that hard work
	setTimeout(function () {
	  document.getElementById('secretSound').pause();
	  ReactDOM.render(React.createElement(
	    "div",
	    null,
	    React.createElement(App, null)
	  ), document.getElementById('app'));
	}, 2000);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "loading" },
	        React.createElement(
	          "h1",
	          { className: "intro" },
	          "Good Times Ahead . . ."
	        ),
	        React.createElement("img", { src: "../../assets/tumblr_luxr3mmGVw1r1sjguo1_400.gif" })
	      );
	    }
	  }]);

	  return Layout;
	}(React.Component);

	ReactDOM.render(React.createElement(
	  "div",
	  null,
	  React.createElement(Layout, null)
	), document.getElementById('app'));

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	//input syntax:  {
	//  targetKeyCode1: "/path/to/source/file.wav",
	//  targetKeyCode2: "/path/to/next/source.wav"
	//  ...
	//}
	var defaultData = {
	  97: "/soundfiles/deep-techno-groove.wav",
	  98: "/soundfiles/bam-bam-bolam.wav",
	  99: "/soundfiles/nyan-cat.wav",
	  100: "/soundfiles/day.wav",
	  101: "/soundfiles/beads.wav",
	  102: "/soundfiles/drums.wav",
	  103: "/soundfiles/pew-pew.wav",
	  104: "/soundfiles/grendel.wav",
	  105: "/soundfiles/derp-yell.wav",
	  106: "/soundfiles/beltbuckle.wav",
	  107: "/soundfiles/oh-yeah.wav",
	  108: "/soundfiles/power-up.wav",
	  109: "/soundfiles/straight-techno-beat.wav",
	  110: "/soundfiles/kamehameha.wav",
	  111: "/soundfiles/fart.wav",
	  112: "/soundfiles/heavy-rain.wav",
	  113: "/soundfiles/jet-whoosh.wav",
	  114: "/soundfiles/mystery-chime.ogg",
	  115: "/soundfiles/space-bloop.wav",
	  116: "/soundfiles/techno-drums2.wav",
	  117: "/soundfiles/whale.wav",
	  118: "/soundfiles/vegeta-big-bang.wav",
	  119: "/soundfiles/piano-mood.wav",
	  120: "/soundfiles/boing.wav",
	  121: "/soundfiles/techno-drums.wav",
	  122: "/soundfiles/guitar-chord.wav"
	};

	var qwertyMap = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 0, 97, 115, 100, 102, 103, 104, 106, 107, 108, 0, 122, 120, 99, 118, 98, 110, 109];

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
	  97: "A",
	  98: "B",
	  99: "C",
	  100: "D",
	  101: "E",
	  102: "F",
	  103: "G",
	  104: "H",
	  105: "I",
	  106: "J",
	  107: "K",
	  108: "L",
	  109: "M",
	  110: "N",
	  111: "O",
	  112: "P",
	  113: "Q",
	  114: "R",
	  115: "S",
	  116: "T",
	  117: "U",
	  118: "V",
	  119: "W",
	  120: "X",
	  121: "Y",
	  122: "Z",
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	//RebindNode React class.  Represents one entry in the drop-down list for rebinding keys.
	var RebindNode = React.createClass({
	  displayName: "RebindNode",

	  //this is the function that actually changes the binding of the key.
	  updateKeyBinding: function updateKeyBinding(event) {
	    var code = this.props.targetKey.charCodeAt();
	    var path = "/soundfiles/" + this.props.targetSong;

	    this.props.bindings.forEach(function (ele, idx) {
	      if (ele.key === code) {
	        this.props.bindings[idx].path = path;
	      }
	    }, this);
	  },
	  //method for previewing sound before binding it.
	  playSample: function playSample() {
	    var soundExample = window.location.href + "soundFiles/" + this.props.targetSong;
	    var $soundNode = document.getElementById('secretSound');

	    $soundNode.pause();
	    $soundNode.src = soundExample;
	    $soundNode.currentTime = 0;
	    $soundNode.play();
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "rebindNode", onClick: this.updateKeyBinding },
	      React.createElement(
	        "p",
	        { className: "rebindSong", onClick: this.props.reRender },
	        " ",
	        this.props.targetSong.slice(0, -4).split("-").join(" "),
	        " "
	      ),
	      React.createElement("img", { className: "rebindIcon", src: "assets/listen.png", onClick: this.playSample })
	    );
	  }
	});
	//

	//this is actually not needed. Just remember that you might need to do this someday.
	window.rebindNode = RebindNode;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	//VKey React class.  Represents one key on our virtual keyboard.
	var VKey = React.createClass({
	  displayName: 'VKey',

	  //method for removing styling from key after its audio element has stopped playing.
	  handleAudioEnd: function handleAudioEnd(event) {
	    var $vKey = $('#' + this.props.keyId).parent();

	    $vKey.removeClass('green red pressed');
	    event.preventDefault();
	    this.render();
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'key' },
	      React.createElement(
	        'p',
	        { className: 'keyLabel' },
	        keyCodes[this.props.keyId]
	      ),
	      React.createElement(
	        'p',
	        { className: 'filename' },
	        this.props.path.substr(12).slice(0, -4).split("-").join(" ")
	      ),
	      React.createElement('audio', { id: this.props.keyId, src: this.props.path, onEnded: this.handleAudioEnd, preload: 'auto' })
	    ) //
	    ;
	  }
	});

/***/ }
/******/ ]);