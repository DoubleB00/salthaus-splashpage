import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SalthausPage } from './SalthausPage';
import { StorefrontPage } from './StorefrontPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalthausPage />} />
        <Route path="/store" element={<StorefrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
