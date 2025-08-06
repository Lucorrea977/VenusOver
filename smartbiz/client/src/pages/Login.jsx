import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../app/slices/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const d = useDispatch();
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await d(login({ email, password })).unwrap();
      nav('/dash');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">SmartBiz Login</h2>
        <input className="w-full border p-2 mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 mb-4" placeholder="Password" value={password} onChange={e => setPass(e.target.value)} />
        <button className="bg-blue-700 text-white w-full py-2 rounded">Ingresar</button>
      </form>
    </div>
  );
}
