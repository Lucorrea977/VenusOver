import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../app/slices/sales';
import Nav from '../comp/Nav';
import Chart from '../comp/Chart';
import PDFBtn from '../comp/PDFBtn';
import axios from 'axios';

export default function Dash() {
  const d = useDispatch();
  const stats = useSelector(s => s.sales.stats);
  const [insights, setInsights] = useState('');

  useEffect(() => { d(getStats()); }, [d]);

  const ai = async () => {
    const r = await axios.get('http://localhost:5000/api/ai/insights');
    setInsights(r.data.insights);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Nav />
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl mb-2">Total Ventas</h2>
          <p className="text-3xl font-bold">${stats.totalSales || 0}</p>
          <PDFBtn stats={stats} />
        </div>
        {stats.topProds && <Chart data={stats.topProds} />}
      </div>
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="font-semibold">IA Insights</h2>
        <button onClick={ai} className="bg-blue-700 text-white px-3 py-1 rounded mt-2">Obtener</button>
        <p className="mt-3">{insights}</p>
      </div>
    </div>
  );
}
