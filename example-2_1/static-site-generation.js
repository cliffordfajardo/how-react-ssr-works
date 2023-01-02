/*
This script for generating pages ahead of time "Static Site Generation" (SSG)
If we know some pages will be entirely static, pre-render the specified
routes.
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getAbsolutePath = (p) => path.resolve(__dirname, p);

// TODO add types to this file`
const template = fs.readFileSync(getAbsolutePath('dist/static/index.html'), 'utf-8');
const render = (await import('./dist/server/entry-server.js')).SSRRender;

// Determine routes to pre-render from src/pages.
// For examples sake, we'll pre-render all the pages inside of `pages` directory, since they technically all static (not fetching data from an external source like an API etc)
const routesToPrerender = fs
  .readdirSync(getAbsolutePath('src/pages'))
  .map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase();
    return name === 'home' ? `/` : `/${name}`;
  });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = render(url);

    const html = template.replace(`<!--app-html-->`, appHtml);

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
    fs.writeFileSync(getAbsolutePath(filePath), html);
  }
})();
