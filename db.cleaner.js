var DatabaseCleaner = require('database-cleaner');
var cleaner = new DatabaseCleaner('mongodb');

// Inject require('mongodb').connect function to match the version of mongodb
// you use.
module.exports = function (connect, url) { return function (callback) {
  connect(url, function (error, db) {
    cleaner.clean(db, function () {
      db.close();
      callback && callback();
    });
  });
};};
