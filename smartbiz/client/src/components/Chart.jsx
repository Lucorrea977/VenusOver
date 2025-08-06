import { PieChart, Pie, Tooltip, Cell } from 'recharts';

export default function Chart({ data }) {
  const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">Top Productos</h2>
      <PieChart width={250} height={250}>
        <Pie data={data} dataKey="total_qty" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
