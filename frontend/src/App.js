import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './redux/store';
import theme from './theme';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactSupport from './pages/ContactSupport';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import TestAdmin from './pages/TestAdmin';
import AddItem from './components/items/AddItem';
import AddItemDebug from './components/items/AddItemDebug';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Router>
            <ErrorBoundary>
              <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
              }}>
                <Header />
                <main style={{ 
                  flex: 1, 
                  paddingTop: '80px', // Account for fixed header
                  minHeight: 'calc(100vh - 80px)'
                }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactSupport />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/test-admin" element={<TestAdmin />} />
                    <Route path="/add-item" element={<AddItem />} />
                    <Route path="/add-item-debug" element={<AddItemDebug />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastStyle={{
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                }}
              />
            </ErrorBoundary>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 