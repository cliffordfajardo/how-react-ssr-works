import { Link, Route, Routes } from 'react-router-dom';


/**
 * @description
 * Grab all the modules in the `pages` directory.
 * @example
  {
    './pages/About.tsx': {
      getServerSideProps?: [Function: getServerSideProps],
      default: [Function: About]
    },
    './pages/Home.tsx': {..}
  }
 */
const PagePathsWithComponents = import.meta.glob('./pages/*.tsx', {
  /**
   * Matched files are by default lazy-loaded via dynamic import and will be split into separate chunks during build.
   * Instead, import all the modules directly
   * @example
   * https://vitejs.dev/guide/features.html#glob-import
   */
  eager: true
}) as Record<string, {
  /**
   * @description
   * Some page files may export `getServerSideProps`
   */
  getServerSideProps?: Function,
  /**
   * @description
   * The default export for the module. In our 'pages' directory, this will be the
   * react component to render.
   */
  default: any
}>;


/**
 * @description
 * Create our a list of routes from our app.
 * Eventually we will map over these and pass create our routes using react-router.
 */
const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const pageName = path.match(/\.\/pages\/(.*)\.tsx$/)![1];

  return {
    name: pageName,
    path: pageName === 'Home' ? '/' : `/${pageName.toLowerCase()}`,
    component: PagePathsWithComponents[path].default,
  };
});

/**
 * @description
 * Both `entry-client.tsx` and `entry-client.tsx` import this.
 * Differences
 * - `entry-client.tsx`: this component gets wrapped with <BrowserRouter>
 * - `entry-server.tsx`: this component gets wrapped with <StaticRouter>
 */
export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
      </Routes>
    </>
  );
}
