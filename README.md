# fetch-loop

[![NPM version](https://img.shields.io/npm/v/fetch-loop "NPM version")](https://www.npmjs.com/package/fetch-loop)

Simple abstraction over `fetch` to only allow a certain amount of requests per interval of time.

## API

`FetchLoop` provides a simple API over the browser `fetch` function that allows only a certain
amount of requests per interval of time.

```javascript
import { FetchLoop } from "fetch-loop";

const fl = new FetchLoop({
  intervalMilliseconds: 5_000,
  requestsPerInterval: 2,
});

for (let i = 10; i; i--) {
  fl.fetch(`https://jsonplaceholder.typicode.com/todos/${i}`)
    .then((response) => response.json())
    .then((json) => console.log(json));
}
```
