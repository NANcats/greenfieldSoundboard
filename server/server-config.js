var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

// set a normalized path to public.
var rootPath = path.normalize(__dirname + '/../public');

// set paths from this directory to the others that are serving static files to client.
// note that the script tags in index.html are simplified as a result.
app.use('/dist', express.static(__dirname + '/../dist/'));
app.use('/soundfiles', express.static(__dirname + '/../foley/'));
app.use('/node_modules', express.static(__dirname + '/../node_modules/'));
app.use('/compiled', express.static(__dirname + '/../compiled/'));
app.use('/styles', express.static(__dirname + '/../public/components/styles/'));
app.use('/assets', express.static(__dirname + '/assets/'));

// At root, send index.html. It's location is appended to the rootPath.
app.get('/', function(req, res) {
  res.sendFile(path.join(rootPath + '/index.html'));
});

//returns an array of all the sounds in foley folder
app.get('/sounds', function (req, res) {
  fs.readdir(path.join(__dirname + '/../foley/'), function(err, files) {
    if (err) console.error(err);
    res.send(files);
  });
});

app.get('/defaults', function (req, res) {
  var defaults = {
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
    120: "/soundfiles/boing-a.wav",
    121: "/soundfiles/techno-drums.wav",
    122: "/soundfiles/guitar-chord.wav"
  };
  res.send(defaults);
});

module.exports = app;
