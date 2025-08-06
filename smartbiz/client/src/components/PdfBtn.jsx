import jsPDF from 'jspdf';

export default function PdfBtn({ stats }) {
  const createPdf = () => {
    const doc = new jsPDF();
    doc.text('Reporte SmartBiz', 10, 10);
    doc.text(`Ventas totales: $${stats.totalSales || 0}`, 10, 20);
    doc.save('reporte.pdf');
  };

  return (
    <button onClick={createPdf} className="bg-green-600 text-white px-3 py-1 rounded mt-3">
      Descargar PDF
    </button>
  );
}
