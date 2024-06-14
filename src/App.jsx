import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Suspence component used to show spinnerFullPage for Suspended Elements
import { Suspense, lazy } from 'react';

// import Product from './Pages/Product';
// import Pricing from './Pages/Pricing';
// import Homepage from './Pages/Homepage';
// import PageNotFound from './Pages/PegeNotFound';
// import AppLayout from './Pages/AppLayout';
// import Login from './Pages/Login';

import SpinnerFullPage from './components/SpinnerFullPage';

import Form from './components/Form';
import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';

import ProtectedRoute from './components/ProtectedRoute';
import { CitiesProvider } from '../contexts/CitiesContext';
import { AuthProvider } from '../contexts/AuthContext';

//implement lazyLoading to reduce bundle size, using lazy()
const Homepage = lazy(() => import('./Pages/Homepage'));
const Product = lazy(() => import('./Pages/Product'));
const Pricing = lazy(() => import('./Pages/Pricing'));
const PageNotFound = lazy(() => import('./Pages/PageNotFound'));
const Login = lazy(() => import('./Pages/Login'));
const AppLayout = lazy(() => import('./Pages/AppLayout'));

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
