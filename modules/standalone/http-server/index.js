/**
 * ?
 * 
 * @param {HttpServer.Adapter} adapter
 * @param {Partial<HttpServer.Options>} options
 */
export const makeHttpServer = (adapter, options = {}) =>
{
  const config =
  {
    routes: [],
    middlewares: [],

    port: options.port || 800,

    assets: {
      route: options.assets?.route || '/public',
      folder: options.assets?.folder || './public'
    }
  };

  return {
    /**
     * ?
     */
    start: () => adapter.serve(config),

    /**
     * ?
     */
    stop: () => adapter.shutdown(),

    /**
     * ?
     * 
     * @param {HttpServer.Middleware[]} middlewares
     */
    registerMiddlewares: (middlewares) =>
    {
      config.middlewares.push(...middlewares);
    },

    /**
     * ?
     * 
     * @param {HttpServer.Route[]} routes
     */
    registerRoutes: (routes) =>
    {
      config.routes.push(...routes);
    }
  };
}