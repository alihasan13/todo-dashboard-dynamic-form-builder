import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Layout.module.css';

function PageLoader() {
  return (
    <div className={styles.pageLoader} aria-label="Loading page" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
    </div>
  );
}

function Layout() {
  return (
    <div className={styles.root}>
      <Navbar />
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={styles.footer} role="contentinfo">
        <div className="container">
          <p className={styles.footerText}>
            Built with <span aria-label="love">♥</span> using React + TanStack Query
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
