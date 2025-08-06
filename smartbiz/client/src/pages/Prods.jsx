import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProds } from '../app/slices/prod';
import axios from 'axios';
import Nav from '../comp/Nav';

export default function Prods() {
  const d = useDispatch();
  const prods = useSelector(s => s.prod.list);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => { d(getProds()); }, [d]);

  const addProd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/sales/prods', { name, price, stock });
    d(getProds());
    setName(''); setPrice(''); setStock('');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Nav />
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-xl font-bold mb-3">Productos</h2>
        <form onSubmit={addProd} className="flex gap-2 mb-3">
          <input className="border p-1" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
          <input className="border p-1" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
          <input className="border p-1" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
          <button className="bg-green-600 text-white px-3 rounded">Agregar</button>
        </form>
        <ul>
          {prods.map(p => (
            <li key={p.id} className="border-b p-1 flex justify-between">
              <span>{p.name}</span>
              <span>${p.price} | Stock: {p.stock}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
