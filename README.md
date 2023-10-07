# fetch-loop

[![npm version](https://badge.fury.io/js/fetch-loop.svg)](https://badge.fury.io/js/fetch-loop)

Simple abstraction over fetch to only permit a certain amount of requests per interval of time.

## API

`FetchLoop` provides a simple API over the browser fetch function that permits only a certain
amount of requests per interval of time.

```javascript
import { FetchLoop } from "fetch-loop";

// create new loop instance
const fl = new FetchLoop();

// you can start pending requests and start the loop later
// or you can already start the loop
// fl.start(1, 1_000);

for (let i = 1; i <= 20; i++) {
  // fetch method has same interface as the browser fetch function
  fl.fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
    .then(response => response.json())
    .then(json => console.log(json))
}

// start the loop and execute 1 request every second
const stop = fl.start(1, 1_000);

// stop the loop after 5 seconds
setTimeout(stop, 5_000);
```
