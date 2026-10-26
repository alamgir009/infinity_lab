import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const Loading = () => (
  <p className="container-section py-16 text-sm text-text-muted" role="status">
    Loading page…
  </p>
);

function NotFound() {
  return (
    <section className="container-section py-24 text-center">
      <h1 className="type-heading">Page not found</h1>
      <p className="mt-4 text-text-secondary">
        The page you are looking for does not exist. Please use the navigation
        above or return to the homepage.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Skip link — first focusable element, visible on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-btn-bg focus:px-4 focus:py-2 focus:text-btn-text focus:shadow-pop"
      >
        Skip to main content
      </a>
      <Header />
      {/* Landmark: banner (header) above, main content below */}
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}
