import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './Pages/Product';
import Pricing from './Pages/Pricing';
import Homepage from './Pages/Homepage';
import PageNotFound from './Pages/PegeNotFound';

export default function Worldwise() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
