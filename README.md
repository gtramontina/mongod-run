# mongod-run
Runs mongod. Useful when testing APIs.

## Motivation
When running tests for APIs that are backed by a database, we usually either have the DB up as a service somewhere or do this extra step of bringing it up before running the tests. I didn't want to do any of these, so I wrote `mongod-run`.

## Example
___Note___: _I focused mainly on getting it working with [mocha](http://visionmedia.github.io/mocha/), as this is what I've been testing with._

Use the following in a "global spec file" e.g. `mongoose-setup.spec.js` so that it is executed before all of your tests

```javascript
const mongod = require('mongod-run');
const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost/unittest-my-application';

require('mocha-mongoose')(dbUrl); // clears db on every test

before(function (done) {
    mongod.start(() => mongoose.connect(dbUrl, done));
});

after(mongod.stop);
```

## API
* `start(callback)`: runs mongod and call the callback once it is up and running.
* `stop()`: kills the mongod process. This is automatically called if/when the test process exits.

## Notes
The `mongod` process is being ran with the following command:
```bash
mongod --dbpath=<temp_directory> --rest
```
The temporary directory is removed at the end – either via .stop() or process exit.

# License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license – [http://unlicense.org](http://unlicense.org)
