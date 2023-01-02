import { Link, Route, Routes } from 'react-router-dom';

const PagePathsWithComponents = import.meta.glob('./routes/*.tsx', { eager: true });
//Example Output:
// const modules = {
//   './routes/About.tsx': () => import('./routes/About.js'),
//   './routes/Home.tsx': () => import('./routes/Home.tsx')
// }

const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const name = path.match(/\.\/routes\/(.*)\.tsx$/)![1];
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    //@ts-ignore
    component: PagePathsWithComponents[path].default,
  };
});

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
