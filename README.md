# mongod-run
Runs mongod. Useful when testing APIs.

## Motivation
When running tests for APIs that are backed by a database, we usually either have the DB up as a service somewhere or do this extra step of bringing it up before running the tests. I didn't want to do any of these, so I wrote `mongod-run`.

## Example
___Note___: _I focused mainly on getting it working with [mocha](http://visionmedia.github.io/mocha/), as this is what I've been testing with._

```javascript
var mongod = require('mongod-run');

before(mongod.start);
after(mongod.stop);
afterEach(mongod.cleanup('mongodb://localhost:27017/example.test'));

describe('my app', function () {
  // ...
});
```

## API
* `start(callback)`: runs mongod and call the callback once it is up and running.
* `stop()`: kills the mongod process. This is automatically called if/when the test process exits.
* `cleanup(url)`: performs a cleanup on the database specified by the given url.

## Notes
The `mongod` process is being ran with the following command:
```bash
mongod -f . --dbpath=<temp_directory> --rest
```
The temporary directory is removed at the end – either via .stop() or process exit.

_I have the feeling that customizing this command line might be something that people might want to do. If so, feel free to submit a pull request!_

# License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license – [http://unlicense.org](http://unlicense.org)
