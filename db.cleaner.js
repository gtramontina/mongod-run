var DatabaseCleaner = require('database-cleaner');
var cleaner = new DatabaseCleaner('mongodb');

// TODO getting mongodb from (peer dep) mongoose/node_modules is not great
// because (a) the path is an implementation detail (though one unlikely to
// change) and (b) apps should be able to use this repo without using mongoose.
// Consider injecting mongodb object or connect function.
var connect = require('mongoose/node_modules/mongodb').connect;

module.exports = function (url) { return function (callback) {
  connect(url, function (error, db) {
    cleaner.clean(db, function () {
      db.close();
      callback && callback();
    });
  });
};};
