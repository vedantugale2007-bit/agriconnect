import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Search,
  Filter,
  ArrowDownToLine,
} from 'lucide-react';
import { ScreenType, Invoice } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface InvoicesScreenProps {
  setCurrentScreen: (screen: ScreenType) => void;
  invoices: Invoice[];
}

export const InvoicesScreen: React.FC<InvoicesScreenProps> = ({ setCurrentScreen, invoices }) => {
  const { language, t } = useLanguage();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(invoices[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus !== 'ALL' && inv.status !== filterStatus) return false;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-white font-display">
              {t('invoices')} & {language === 'mr' ? 'वित्तीय इतिहास' : 'Financial History'}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'mr' ? 'कृषी वाहतुकीसाठी GST मान्यताप्राप्त डिजिटल कर इनव्हॉइस' : 'Automated GST/Tax compliant invoices for agricultural freight'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>{language === 'mr' ? 'इनव्हॉइस प्रिंट करा' : 'Print Invoice'}</span>
          </button>

          <button
            onClick={() => alert(`Downloaded PDF for Invoice #${selectedInvoice.invoiceNumber}`)}
            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'mr' ? 'PDF डाउनलोड करा' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 Cols: Invoice Selector List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">{language === 'mr' ? 'पावती निवडा' : 'Select Statement'}</span>
            <div className="flex space-x-1 text-[10px]">
              {['ALL', 'PAID', 'PENDING'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2 py-1 rounded-lg ${
                    filterStatus === st ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  {st === 'PAID' ? (language === 'mr' ? 'भरलेले' : 'PAID') : st === 'PENDING' ? (language === 'mr' ? 'प्रलंबित' : 'PENDING') : (language === 'mr' ? 'सर्व' : 'ALL')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                onClick={() => setSelectedInvoice(inv)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedInvoice.id === inv.id
                    ? 'bg-emerald-950/60 border-emerald-500/80 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">{inv.invoiceNumber}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    {inv.status === 'PAID' ? (language === 'mr' ? 'जमा' : 'PAID') : inv.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{inv.farmerName}</div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400">{inv.date}</span>
                  <span className="font-extrabold text-white">₹ {inv.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 8 Cols: Printable Invoice Preview */}
        <div className="lg:col-span-8">
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl space-y-6 font-sans print:p-0">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl font-bold">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black text-slate-950 font-display">AgriConnect Maharashtra</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Agricultural Freight Stewardship & GST Tax Invoice</p>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-1">
                  {language === 'mr' ? 'पूर्ण जमा (PAID)' : 'PAID IN FULL'}
                </span>
                <h2 className="text-lg font-bold text-slate-900">{selectedInvoice.invoiceNumber}</h2>
                <p className="text-[11px] text-slate-500">दिनांक: {selectedInvoice.date}</p>
              </div>
            </div>

            {/* Billed To / From */}
            <div className="grid grid-cols-2 gap-6 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{language === 'mr' ? 'शेतकरी / पाठवणारे' : 'Shipper / Farmer'}</span>
                <div className="font-bold text-slate-900 mt-1">{selectedInvoice.farmerName}</div>
                <div className="text-slate-500 leading-tight">{selectedInvoice.farmerAddress}</div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{language === 'mr' ? 'ट्रान्सपोर्टर / वाहक' : 'Transporter / Carrier'}</span>
                <div className="font-bold text-slate-900 mt-1">{selectedInvoice.transporterName}</div>
                <div className="text-slate-500 leading-tight">{selectedInvoice.transporterAddress}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2">{language === 'mr' ? 'तपशील' : 'Description'}</th>
                    <th className="py-2 text-center">{language === 'mr' ? 'प्रमाण / टन' : 'Qty / Tons'}</th>
                    <th className="py-2 text-right">{language === 'mr' ? 'दर (दर टन)' : 'Rate'}</th>
                    <th className="py-2 text-right">{language === 'mr' ? 'एकूण रक्कम' : 'Amount'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-medium">{item.description}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">₹ {item.rate.toLocaleString('en-IN')}</td>
                      <td className="py-3 text-right font-bold">₹ {item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Breakdown */}
            <div className="border-t border-slate-200 pt-4 flex justify-end text-xs">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>{language === 'mr' ? 'वाहतूक भाडे' : 'Subtotal'}</span>
                  <span className="font-semibold text-slate-900">₹ {selectedInvoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST / कर (5%)</span>
                  <span className="font-semibold text-slate-900">₹ {selectedInvoice.taxGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>प्लॅटफॉर्म शुल्क</span>
                  <span className="font-semibold text-slate-900">₹ {selectedInvoice.platformFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-950 border-t border-slate-200 pt-2">
                  <span>{t('totalPayable')}</span>
                  <span className="text-emerald-700">₹ {selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 flex justify-between">
              <span>पेमेंट मार्ग: {selectedInvoice.paymentMethod}</span>
              <span>AgriConnect महाराष्ट्र अधिकृत डिजिटल पावती</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

