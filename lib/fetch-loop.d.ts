/** FetchLoop config options. */
interface FetchLoopOptions {
  intervalMilliseconds: number;
  requestsPerInterval: number;
}

/**
 * A class representing a simple abstraction over `fetch`.
 */
export class FetchLoop {
  /** Creates a new FetchLoop instance. */
  constructor(options?: FetchLoopOptions);

  /**
   * Has same interface as the browser default `fetch` function.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)
   */
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}
