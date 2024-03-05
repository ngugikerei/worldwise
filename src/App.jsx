import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Homepage from './Pages/Homepage';
import PageNotFound from './Pages/PegeNotFound';
import AppLayout from './Pages/AppLayout';
import Login from './Pages/Login';
import Form from './components/Form';
import City from './components/City';
import CityList from './components/CityList';

export default function Worldwise() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>List of Countries</p>} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
<p></p>;
