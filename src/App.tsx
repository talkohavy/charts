import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PageNotFound from './pages/PageNotFound';
import { routes } from './routes';

const LineChartExamplePage = routes[0].Component;

export default function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route key={-1} path='/' element={<LineChartExamplePage />} />

          {routes.map(({ to: path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
