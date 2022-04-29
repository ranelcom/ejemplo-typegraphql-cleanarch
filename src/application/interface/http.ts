// IHTTPServer Define a server interface to run
export interface IHTTPServer {
  // start method it the responsible to turn on the server.
  start(): Promise<void>;
  // stop method it the responsible to turn off the server.
  stop(): Promise<void>;
  // setup method it the responsible to configure the server using constructor params
  setup(): Promise<void>;
  // route method used to add a route on the HTTP server
  // route(method: string, path: string, handler: RequestListener): void
}

export type Response = {
  data: any;
  status: number;
};

// IHTTPClient Define a http client interface
export interface IHTTPClient {
  get(url: string): Promise<Response>;
  post(url: string, data: any): Promise<Response>;
  delete(url: string): Promise<Response>;
}
