import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

/**
Similar to index.tsx files in React client side rendered react apps (create-react-app, parcel etc),
we have a mount point & its called it has ReactDOM.hydrateRoot
and root id to render our entire application inside a div.
The only difference in our index.tsx is instead of sticking with `ReactDOM.createRoot`
we opted for `ReactDOM.hydrateRoot` because we'll render server-side generated code
instead of directly invoking it on the client.
*/
ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
