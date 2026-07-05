/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Configurator from './pages/Configurator';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:slug" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="projects" element={<Projects />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
          {/* Configurator gets its own full-screen layout without standard navbar/footer */}
          <Route path="/configurator" element={<Configurator />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="*" element={<div className="p-8"><h1 className="text-2xl font-medium">Coming Soon</h1></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
