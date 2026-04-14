import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import Layout from '../components/common/Layout/Layout';
import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary';

const TodosPage        = lazy(() => import('../pages/TodosPage'));
const FormBuilderPage  = lazy(() => import('../pages/FormBuilderPage'));
const FormPreviewPage  = lazy(() => import('../pages/FormPreviewPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/todos" replace />,
      },
      {
        path: 'todos',
        element: (
          <div className="container">
            <TodosPage />
          </div>
        ),
      },
      {
        path: 'form-builder',
        element: (
          <div className="container">
            <FormBuilderPage />
          </div>
        ),
      },
      {
        path: 'form-preview',
        element: (
          <div className="container">
            <FormPreviewPage />
          </div>
        ),
      },
    ],
  },
  {
    // Catch-all — redirect unknown paths to /todos
    path: '*',
    element: <Navigate to="/todos" replace />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
