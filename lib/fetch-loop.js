// @ts-self-types="./fetch-loop.d.ts"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A class representing a simple abstraction over `fetch`.
 */
export class FetchLoop {
  /** Default options. */
  #options = {
    intervalMilliseconds: 0,
    requestsPerInterval: 0,
  };
  /** Queue of objects representing a request. */
  #queue = [];

  /** Creates a new FetchLoop instance.
   * @param {Object} options - FetchLoop config options.
   * @param {number} options.intervalMilliseconds - delay in ms until a new batch of requests are sent.
   * @param {number} options.requestsPerInterval  - number of requests per batch.
  */
  constructor(options) {
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (key in this.#options) this.#options[key] = value;
      }
    }
  }

  /** Private function processing a certain amount of requests per time interval. */
  async #loop() {
    while (true) {
      const entities = this.#queue.splice(0, this.#options.requestsPerInterval);
      if (!entities.length) break;

      for (const entity of entities) {
        fetch(entity.input, entity.init)
          .then(entity.resolve)
          .catch(entity.reject);
      }

      await delay(this.#options.intervalMilliseconds);
    }
  }

  /**
   * Has same interface as the browser default `fetch` function.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)
   */
  fetch(input, init) {
    const promise = new Promise((resolve, reject) => {
      this.#queue.push({
        input,
        init,
        resolve,
        reject,
      });
    });

    if (this.#queue.length === 1) setTimeout(() => this.#loop(), 0);

    return promise;
  }
}
