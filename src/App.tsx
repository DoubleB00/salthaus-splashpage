import { SalthausPage } from './SalthausPage';
import { PasswordGate } from './PasswordGate';

function App() {
  return (
    <PasswordGate>
      <SalthausPage />
    </PasswordGate>
  );
}

export default App;
