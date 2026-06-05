import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload as UploadIcon, FileText, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import axios from 'axios';
import API_URL from '../config';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    councilName: '',
    ticketType: 'Council PCN',
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload your parking ticket.');

    setLoading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('councilName', formData.councilName);
      data.append('ticketType', formData.ticketType);

      // We'll create this endpoint in the backend
      const response = await axios.post(`${API_URL}/api/upload-and-pay`, data);
      
      // Redirect to Stripe checkout
      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-slate-600 hover:text-primary transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-primary h-6 w-6" />
            <span className="text-xl font-bold text-primary">FightYourPCN</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Upload Your Ticket</h1>
            <p className="text-slate-600">Provide the details of your PCN to start generating your appeal draft.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Council / Authority Name</label>
                  <input
                    type="text"
                    name="councilName"
                    required
                    value={formData.councilName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="e.g. Lambeth Council"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ticket Type</label>
                  <select
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option>Council PCN</option>
                    <option>Private Parking Notice</option>
                    <option>Bus Lane Penalty</option>
                    <option>ULEZ / Clean Air Zone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Ticket (Photo or PDF)</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary transition group">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {preview ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-12 w-12 text-primary mb-2" />
                      <p className="text-sm font-medium text-slate-700">{file?.name}</p>
                      <button 
                        type="button" 
                        onClick={() => {setFile(null); setPreview(null);}}
                        className="text-xs text-red-500 mt-2 hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadIcon className="h-12 w-12 text-slate-400 mb-2 group-hover:text-primary transition" />
                      <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG or PDF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  By clicking "Proceed to Payment", you agree to our Terms. FightYourPCN provides AI-generated informational assistance and draft appeal documents only. It does not provide legal advice or solicitor representation. Success is not guaranteed.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Proceed to Payment (£1)'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 text-center text-xs text-slate-500">
        <p>FightYourPCN provides AI-generated informational assistance and draft appeal documents only.</p>
      </footer>
    </div>
  );
};

export default Upload;
