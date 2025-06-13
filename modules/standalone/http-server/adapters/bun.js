/**
 * Creates a new server adapter using Bun's HTTP server.
 * 
 * @returns {HttpServer.Adapter}
 */
export const makeHttpServerAdapter = () =>
{
  /** @type {import('bun').Server} */
  let server = null;

  return {
    //
    serve: (config) =>
    {
      if (server !== null)
      {
        throw new Error('Server is already running.');
      }

      server = Bun.serve(
        {
          port: config.port,

          routes:
          {
            [`${config.assets.route}/*`]:
            {
              GET: (request) =>
              {
                const url = new URL(request.url);
                const path = url.pathname.substring(config.assets.route.length + 1);

                return makeFileResponse(`${config.assets.folder}/${path}`);
              },
            },

            ...createRoutePipelines(config.routes, config.middlewares || []),
          },

          fetch: (request) =>
          {
            return new Response(null, { status: 404 });
          }
        }
      )
    },

    shutdown: async () =>
    {
      if (server === null)
      {
        throw new Error('Server is not running.');
      }

      await server.stop();
    }
  };
}

/**
 * @param {Request} request
 * @returns {HttpServer.RequestContext}
 */
export const makeHttpServerRequestContext = (request) =>
{
  return {
    request,
    data: {},

    file: makeFileResponse,
    html: makeHtmlResponse,
    json: makeJsonResponse
  };
}

/**
 * @param {HttpServer.Route[]} routes
 * @param {HttpServer.Middleware[]} middlewares
 */
const createRoutePipelines = (routes, middlewares) =>
{
  const pipelines = {};

  /**
   * @param {HttpServer.RequestMethod} routeMethod
   * @param {string} routePath
   */
  const createMiddlewareStack = (routeMethod, routePath) =>
  {
    const stack = [];

    for (const { handler, method, path } of middlewares)
    {
      const matchesRoute = path === '*' || path === routePath || routePath.startsWith(`${path}/`);
      const matchesMethod = method === 'ANY' || method === routeMethod;

      if (matchesRoute && matchesMethod) stack.push(handler);
    }

    return stack;
  };

  for (const { path, method, handler } of routes)
  {
    const middlewareStack = createMiddlewareStack(method, path);

    pipelines[path] = pipelines[path] || {};

    /** @param {Request} request */
    pipelines[path][method] = async (request) =>
    {
      const context = makeHttpServerRequestContext(request);

      for (const middleware of middlewareStack)
      {
        const response = await middleware(context);

        if (response instanceof Response)
        {
          return response; // Return the intercepted response.
          // This will effectively short-circuit the route handler.
        }
      }

      return handler(context);
    };
  }

  return pipelines;
};

/**
 * @param {string} filePath
 */
export const makeFileResponse = async (filePath) =>
{
  try
  {
    const assetFile = Bun.file(filePath);
    const fileExists = await assetFile.exists();
    const status = fileExists ? 200 : 404;

    return new Response(fileExists ? assetFile : null, { status });
  }
  catch (error)
  {
    return new Response(null, { status: 500 });
  }
};

/**
 * @param {string} content
 */
export const makeHtmlResponse = (content) =>
{
  return new Response(content, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};

/**
 * @param {JsonValue} data
 */
export const makeJsonResponse = (data) =>
{
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
};