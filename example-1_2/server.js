import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);
  const isDevMode = !isProd;

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite = null;

  /**
   * If we are in dev mode, setup vite middlware & setup HMR
   */
  if (isDevMode) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true,
        hmr: {
          // port: hmrPort,
          port: 4010,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    /**
     * If we are in prod mode, we don't need HMR and vite middleware.
     * Observe how, we're using `serve-static` in prod to serve our static assets,
     * whereas in dev mode, vite is handling all of that for us.
     */
    // app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = '/';
      let template, render;
      if (isDevMode && vite) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template); // Insert react-refresh for local development
        render = (await vite.ssrLoadModule('/app/entry-server.tsx')).SSRRender;
      } else {
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).SSRRender;
      }

      const appHtml = render(url); //Rendering component without any client side logic de-hydrated like a dry sponge
      const html = template.replace(`<!--app-html-->`, appHtml); //Replacing placeholder with SSR rendered components

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html); //Outputing final html
    } catch (error) {
      if (isDevMode && vite) {
        vite.ssrFixStacktrace(e);
      } else {
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(5173, () => {
    console.log('Listening on http://localhost:5173');
  })
);
