import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Dash from './views/Dash';
import Prods from './views/Prods';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/prods" element={<Prods />} />
      </Routes>
    </BrowserRouter>
  );
}
