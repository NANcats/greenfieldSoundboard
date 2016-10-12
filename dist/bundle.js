/******/ (function(modules) { // webpackBootstrap
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
/*!***********************************!*\
  !*** ./public/components/app.jsx ***!
  \***********************************/
/***/ function(module, exports) {

	"use strict";
	
	//input syntax:  {
	//  targetKeyCode1: "/path/to/source/file.wav",
	//  targetKeyCode2: "/path/to/next/source.wav"
	//  ...
	//}
	var testData = {
	  97: "/soundfiles/deep-techno-groove.wav",
	  98: "/soundfiles/bam-bam-bolam.wav",
	  99: "/soundfiles/footsteps.wav",
	  100: "/soundfiles/day.wav",
	  101: "/soundfiles/beads.wav",
	  102: "/soundfiles/drums.wav",
	  103: "/soundfiles/pew-pew.wav",
	  104: "/soundfiles/grendel.wav",
	  105: "/soundfiles/derp-yell.mp3",
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
	  120: "/soundfiles/boing-a.wav",
	  121: "/soundfiles/techno-drums.wav",
	  122: "/soundfiles/footsteps.wav"
	};
	
	var qwertyMap = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 0, 97, 115, 100, 102, 103, 104, 106, 107, 108, 0, 122, 120, 99, 118, 98, 110, 109];
	
	//sample input:
	//This example would bind the 'a' key to the "example.wav" file.
	//{
	//  65: '/path/to/example'
	//}
	
	//For a comprehensive list of keycode bindings, see "keycode.js"
	//in this same directory.
	var VKey = React.createClass({
	  displayName: "VKey",
	
	  handleAudioEnd: function handleAudioEnd(event) {
	    var $vKey = $('#' + this.props.keyId).parent();
	
	    $vKey.removeClass('green red pressed');
	    event.preventDefault();
	    this.render();
	  },
	
	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "key" },
	      React.createElement(
	        "p",
	        { className: "keyLabel" },
	        keyCodes[this.props.keyId]
	      ),
	      React.createElement(
	        "p",
	        { className: "filename" },
	        this.props.path.substr(12).slice(0, -4)
	      ),
	      React.createElement("audio", { id: this.props.keyId, src: this.props.path, onEnded: this.handleAudioEnd, preload: "auto" })
	    ) //
	    ;
	  }
	});
	var RebindNode = React.createClass({
	  displayName: "RebindNode",
	
	  updateKeyBinding: function updateKeyBinding(event) {
	    var code = this.props.targetKey.charCodeAt();
	    var path = "/soundfiles/" + this.props.targetSong;
	
	    this.props.bindings.forEach(function (ele, idx) {
	      if (ele.key === code) {
	        this.props.bindings[idx].path = path;
	      }
	    }, this);
	  },
	  render: function render() {
	    return React.createElement(
	      "div",
	      { onClick: this.updateKeyBinding },
	      React.createElement(
	        "p",
	        null,
	        " ",
	        this.props.targetSong.slice(0, -4),
	        " "
	      )
	    );
	  }
	});
	var App = React.createClass({
	  displayName: "App",
	
	  // componentDidMount: function(event) {
	  //   $('.loading').hide();
	  // },
	  getInitialState: function getInitialState() {
	    return (//playing with es6
	      {
	        bindings: [],
	        soundList: [],
	        changeKey: ""
	      }
	    );
	  },
	  componentDidMount: function componentDidMount() {
	    $('#bindingWindow').hide();
	    this.serverRequest = $.get(window.location.href + "sounds", function (result) {
	      this.setState({
	        soundList: result,
	        bindings: qwertyMap.map(function (key) {
	          return key !== 0 ? { key: key, path: testData[key], loop: false, playing: false } : 0;
	        })
	      });
	    }.bind(this));
	
	    window.addEventListener('keypress', this.handleKeyPress);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.serverRequest.abort(); //not sure what this is for but online said to put it in.
	  },
	  handleKeyPress: function handleKeyPress(event) {
	    var key = event.code.toLowerCase()[3],
	        keyNumber = key.charCodeAt(),
	        $audio = document.getElementById(keyNumber),
	        $vKey = $('#' + keyNumber).parent();
	
	    if (event.ctrlKey && $('#keyboardWindow').is(':visible')) {
	      if (keyNumber < 123 && keyNumber > 96) {
	        this.setState({ changeKey: key });
	        this.handleCtrlKey();
	      }
	    } else if (event.shiftKey) {
	      $vKey.addClass('red pressed');
	      this.handleShiftKey($audio, event);
	    } else {
	      this.triggerKey($vKey, $audio);
	    }
	  },
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
	  handleCtrlKey: function handleCtrlKey() {
	
	    $('#bindingWindow').animate({ height: 'toggle' }, 350);
	    $('#keyboardWindow').animate({ width: 'toggle' }, 350);
	  },
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
	        { id: "bindingWindow", className: "keyboard" },
	        React.createElement(
	          "h1",
	          null,
	          "Click on a file to change the binding of ",
	          this.state.changeKey,
	          " to"
	        ),
	        React.createElement(
	          "ul",
	          { onClick: this.reRender },
	          this.state.soundList.map(function (sound, idx) {
	            return (//es6 again
	              React.createElement(RebindNode, { key: idx, targetSong: sound, targetKey: _this.state.changeKey, bindings: _this.state.bindings })
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
	
	setTimeout(function () {
	  ReactDOM.render(React.createElement(
	    "div",
	    null,
	    React.createElement(App, null)
	  ), document.getElementById('app'));
	}, 2000);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map