const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class FetchLoop {
  #options = {
    intervalMilliseconds: 0,
    requestsPerInterval: 0,
  };
  #queue = [];

  constructor(options) {
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (key in this.#options) this.#options[key] = value;
      }
    }
  }

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
