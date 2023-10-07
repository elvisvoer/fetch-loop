function createAFLoop(callback, intervalMilliseconds) {
  const delta = intervalMilliseconds;
  let lastTime = new Date().getTime();
  let requestId;

  const timer = () => {
    requestId = requestAnimationFrame(timer);
    const currentTime = new Date().getTime();

    if (currentTime - lastTime >= delta) {
      lastTime = currentTime;
      callback();
    }
  };
  // autostart
  timer();

  // call it once at start
  callback();

  return () => {
    cancelAnimationFrame(requestId);
  };
}

export class FetchLoop {
  #queue = [];

  fetch(input, init) {
    return new Promise((resolve, reject) => {
      this.#queue.push({
        reject,
        resolve,
        input,
        init,
      });
    });
  }

  start(requestsPerTimeInterval, intervalMilliseconds = 1_000) {
    return createAFLoop(() => {
      const items = this.#queue.splice(0, requestsPerTimeInterval);
      items.forEach(({ reject, resolve, input, init }) => {
        // global fetch
        fetch(input, init).then(resolve).catch(reject);
      });
    }, intervalMilliseconds);
  }
}
