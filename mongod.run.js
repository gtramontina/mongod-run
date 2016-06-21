var s = require('shelljs');
s.which('mongod') || fail();

var temp = require('temp').track();
var noop = function () {};
var listeners = [];
var mongod;

(isRunning()? notifyListeners : run)();

function isRunning () {
  return !!s.exec('pgrep mongod', { silent: true }).output;
}

function notifyListeners () {
  var l; while(l = listeners.pop()) l();
}

function tmp () {
  return temp.mkdirSync('tmpdata');
}

function run () {
  var checkRunning = function (data) {
    if (!data.toString().match(/waiting for connections on port/)) return;
    checkRunning = noop;
    notifyListeners();
  };
  mongod = s.exec('mongod --dbpath='+tmp()+' --rest', { async: true, silent: true });
  mongod.stdout.on('data', checkRunning);
}

function fail () {
  throw new Error('Could not find "mongod". Do you have mongodb installed?');
  process.exit(code);
}

/* -------------------------------------------------------------------------- */

exports.start = function (callback) {
  callback = callback || noop;
  if (!isRunning()) listeners.push(callback);
  else callback();
};

exports.stop = function () {
  mongod && mongod.kill();
  mongod = null;
  temp.cleanup();
};

exports.cleanup = require('./db.cleaner');
process.on('exit', exports.stop);
