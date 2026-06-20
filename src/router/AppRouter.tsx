import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

// Lazy loading pages for performance optimization
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Projects = lazy(() => import('../pages/Projects'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

// A clean visual loading spinner for Suspense fallback
const PageLoader: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '2.5rem',
        height: '2.5rem',
        border: '3px solid hsl(var(--border))',
        borderTopColor: 'hsl(var(--primary))',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <PageLayout>
      <Suspense fallback={<PageLoader />}>
        {/* AnimatePresence allows components to animate out when they're removed from the DOM */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </PageLayout>
  );
};
export default AppRouter;
