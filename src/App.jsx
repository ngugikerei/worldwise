import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Homepage from './Pages/Homepage';
import PageNotFound from './Pages/PegeNotFound';

import AppLayout from './Pages/AppLayout';
import Login from './Pages/Login';
import Form from './components/Form';
import CityList from './components/CityList';
import City from './components/City';

import CountryList from './components/CountryList';
import { CitiesProvider } from '../contexts/CitiesContext';

export default function App() {
  return (
    <BrowserRouter>
      <CitiesProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />

            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CitiesProvider>
    </BrowserRouter>
  );
}
