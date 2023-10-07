function createAFLoop(callback: Function, intervalMS: number) {
  const delta = intervalMS;
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
  private requestsPerMinute: number = 1;

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

  public start(rpm: number) {
    this.requestsPerMinute = rpm;
    return createAFLoop(() => {
      const items = this.queue.splice(0, this.requestsPerMinute);
      items.forEach(({ reject, resolve, input, init }) => {
        // global fetch
        fetch(input, init).then(resolve).catch(reject);
      });
    }, 5_000);
  }
}
