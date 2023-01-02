import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';

/*
To render our React application in node, we need to call ReactDOMServer.renderToString,
and instead of using BrowserRouter we need to call `StaticRouter` with location to provide
current location. StaticRouter is used in node environments" https://reactrouter.com/en/6.6.1/router-components/static-router
*/
export function SSRRender(url: string | Partial<Location>) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
