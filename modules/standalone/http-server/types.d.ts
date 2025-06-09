export {};

declare global
{
  interface IHttpServerAdapter
  {
    serve: (config: IHttpServerAdapterConfig) => void;
    shutdown: () => MaybePromise<void>;
  }

  interface IHttpServerAdapterConfig
  {
    routes: any[],
    middlewares: any[],
    port: number,

    assets: { route: string, folder: string }
  }

  interface IHttpServerRequestContext<T = Request>
  {
    request: T,
    data: Record<string, any>,

    file: (path: string) => Promise<Response>,
    html: (content: string) => MaybePromise<Response>,
    json: (data: JsonValue) => MaybePromise<Response>
  }

  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  type HttpServerOptions = { port: number, assets: { route: string, folder: string } };
  type HttpServerMiddleware = { path: string, method: HttpMethod | 'ANY', handler: HttpServerMiddlewareHandler };
  type HttpServerMiddlewareHandler = (context: IHttpServerRequestContext) => MaybePromise<MaybeVoid<Response>>;
  type HttpServerRoute = { path: string, method: HttpMethod, handler: HttpServerRouteHandler };
  type HttpServerRouteHandler = (context: IHttpServerRequestContext) => MaybePromise<Response>;
}