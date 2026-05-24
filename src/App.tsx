import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TeaserPage } from './TeaserPage';
import { SalthausPage } from './SalthausPage';
import { StorefrontPage } from './StorefrontPage';
import { PasswordGate } from './PasswordGate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeaserPage />} />
        <Route
          path="/launch"
          element={
            <PasswordGate>
              <SalthausPage />
            </PasswordGate>
          }
        />
        <Route path="/store" element={<StorefrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
