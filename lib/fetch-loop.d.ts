export class FetchLoop {
  constructor(
    options = { requestsPerInterval: number, intervalMilliseconds: number }
  );

  /**
   * Has same interface as the browser default `fetch` function.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)
   */
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}
