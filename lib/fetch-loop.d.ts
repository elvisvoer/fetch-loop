export class FetchLoop {
  /**
   * Has same interface as the browser default `fetch` function.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)
   */
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  /**
   * Starts a loop and returns an instance to the `stop` handler.
   */
  start(
    requestsPerTimeInterval: number,
    intervalMilliseconds: number = 1_000
  ): () => void;
}
