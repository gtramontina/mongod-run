var DatabaseCleaner = require('database-cleaner');
var cleaner = new DatabaseCleaner('mongodb');
var connect = require('database-cleaner/node_modules/mongodb').connect;

module.exports = function (url) { return function (callback) {
  connect(url, function (error, db) {
    cleaner.clean(db, function () {
      db.close();
      callback && callback();
    });
  });
};};
