import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Download, Loader2, AlertTriangle, ArrowLeft, ShieldCheck, Copy } from 'lucide-react';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [appeal, setAppeal] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAppeal = async () => {
      if (!sessionId) {
        setError('No session ID found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/appeal-status?session_id=${sessionId}`);
        if (response.data.status === 'completed') {
          setAppeal(response.data.appeal);
          setLoading(false);
        } else if (response.data.status === 'processing') {
          // Poll every 3 seconds
          setTimeout(fetchAppeal, 3000);
        } else {
          setError('Could not retrieve your appeal. Please contact support.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Fetch appeal failed', err);
        setError('Failed to load your appeal draft.');
        setLoading(false);
      }
    };

    fetchAppeal();
  }, [sessionId]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/download-pdf?session_id=${sessionId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FightYourPCN_Appeal.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download PDF.');
    }
  };

  const copyToClipboard = () => {
    if (appeal?.content) {
      navigator.clipboard.writeText(appeal.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-2">Generating Your Appeal</h1>
        <p className="text-slate-600">Our AI is analyzing your ticket and crafting a professional appeal. This usually takes less than a minute...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-2">Oops! Something went wrong</h1>
        <p className="text-slate-600 mb-8">{error}</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-light transition shadow-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-primary h-6 w-6" />
            <span className="text-xl font-bold text-primary">FightYourPCN</span>
          </Link>
          <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 px-3 py-1 rounded-full">
            <CheckCircle2 className="h-4 w-4" />
            Payment Successful
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Your Appeal Draft is Ready</h1>
              <p className="text-slate-600">Review, copy, or download your generated appeal draft below.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2.5 rounded-lg font-semibold border border-slate-300 hover:bg-slate-50 transition"
              >
                <Copy className="h-5 w-5" />
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-light transition shadow-lg"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Appeal Draft Letter</span>
              <span>Generated by AI</span>
            </div>
            <div className="p-8 md:p-12">
              <div className="prose prose-slate max-w-none whitespace-pre-wrap font-serif text-lg leading-relaxed text-slate-800">
                {appeal?.content}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-12">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="h-5 w-5" />
              What to do next?
            </h3>
            <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
              <li>Review the draft above and ensure all facts are correct.</li>
              <li>Fill in any bracketed information (like [Date], [Address]) if they weren't automatically populated.</li>
              <li>Download the PDF or copy the text.</li>
              <li>Send it to the council/operator via their online portal or by post.</li>
            </ol>
          </div>

          <div className="text-center p-8 border-t border-slate-200">
             <p className="text-xs text-slate-500 max-w-2xl mx-auto italic">
              Disclaimer: FightYourPCN provides AI-generated informational assistance and draft appeal documents only. It does not provide legal advice or solicitor representation. Success is not guaranteed. Use this draft at your own risk.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 text-center">
        <Link to="/" className="text-slate-600 hover:text-primary font-medium flex items-center gap-2 justify-center transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Link>
      </footer>
    </div>
  );
};

// Re-using Info icon from lucide-react
const Info = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default Success;
