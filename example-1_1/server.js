import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// TODO: add types to this file and make it a TS file.
export async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p);
  app.use(
    (await import('serve-static')).default(resolve('dist/client'), {
      index: false,
    })
  );

  /**
   * Setup middleware for all incoming requests.
   * When an incoming requests comes in:
   *  1. get the `index.html` file
   *  2. SSR render `entry-server.js`, which is the version of our app thats only gets run on the server & will eventually be sent to the browser.
   */
  app.use('*', async (req, res) => {
    const url = '/';
    const template = fs.readFileSync(
      resolve('dist/client/index.html'),
      'utf-8'
    );
    const ssrRender = (await import('./dist/server/entry-server.js')).SSRRender;

    const appHtml = ssrRender(url); //Rendering component without any client side logic de-hydrated like a dry sponge
    const html = template.replace(`<!--app-html-->`, appHtml); //Replacing placeholder with SSR rendered components

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html); //Outputing final html
  });

  // return { app, vite };
  return { app };
}

createServer().then(({ app }) =>
  app.listen(3033, () => {
    console.log('http://localhost:3033');
  })
);
