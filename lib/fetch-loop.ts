function createAFLoop(callback: Function, intervalMilliseconds: number) {
  const delta = intervalMilliseconds;
  let lastTime = new Date().getTime();
  let requestId: number;

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
  private queue: any[] = [];

  public fetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.queue.push({
        reject,
        resolve,
        input,
        init,
      });
    });
  }

  public start(
    requestsPerTimeInterval: number,
    intervalMilliseconds: number = 1_000
  ) {
    return createAFLoop(() => {
      const items = this.queue.splice(0, requestsPerTimeInterval);
      items.forEach(({ reject, resolve, input, init }) => {
        // global fetch
        fetch(input, init).then(resolve).catch(reject);
      });
    }, intervalMilliseconds);
  }
}
