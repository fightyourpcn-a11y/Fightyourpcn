import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, FileText, PoundSterling, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-primary h-8 w-8" />
            <span className="text-2xl font-bold text-primary">FightYourPCN</span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#how-it-works" className="text-slate-600 hover:text-primary transition">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-primary transition">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-primary transition">FAQ</a>
            <Link to="/upload" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-light transition">
              Generate My Appeal
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            Received a Parking Ticket? <br />
            <span className="text-primary-light">Get an AI-Generated UK Appeal Draft for £1</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Upload your parking ticket (PCN) and receive a professional, regulation-based appeal draft in minutes. No subscriptions, no solicitor fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/upload" className="bg-primary text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition shadow-lg w-full sm:w-auto">
              Generate My Appeal Now
            </Link>
            <p className="text-sm text-slate-500 font-medium">
              Fixed £1 fee • Secure Upload • UK-Focused
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <Zap className="text-primary-light h-10 w-10 mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast Results</h3>
              <p className="text-slate-600 text-sm">Receive your draft appeal in under 2 minutes after payment.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <ShieldCheck className="text-primary-light h-10 w-10 mb-4" />
              <h3 className="font-bold text-lg mb-2">UK Parking Experts</h3>
              <p className="text-slate-600 text-sm">AI trained on UK parking regulations and council-specific guidelines.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <PoundSterling className="text-primary-light h-10 w-10 mb-4" />
              <h3 className="font-bold text-lg mb-2">Fixed £1 Fee</h3>
              <p className="text-slate-600 text-sm">No hidden costs or subscriptions. Pay only when you need it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-slate-600">Challenge your parking ticket in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Upload Ticket', desc: 'Take a photo or upload a PDF of your PCN.' },
              { step: 2, title: 'AI Review', desc: 'Our AI analyzes the details and identifies grounds for appeal.' },
              { step: 3, title: 'Generate', desc: 'Pay £1 and receive a fully written appeal draft.' },
              { step: 4, title: 'Download', desc: 'Download as a PDF and send it to the council/operator.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl border-2 border-primary">
            <h2 className="text-3xl font-bold text-primary mb-6">Simple Pricing</h2>
            <div className="text-6xl font-black text-primary mb-4">£1</div>
            <p className="text-xl text-slate-600 mb-8 font-semibold">Per Appeal Draft</p>
            <ul className="text-left space-y-4 mb-10 max-w-md mx-auto">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>Full AI analysis of your ticket</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>Professionally written appeal letter</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>PDF Download ready to send</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span>One-time payment, no subscription</span>
              </li>
            </ul>
            <Link to="/upload" className="block w-full bg-primary text-white text-xl px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition shadow-lg">
              Start My Appeal
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Is this legal advice?</h3>
              <p className="text-slate-600">No. FightYourPCN provides AI-generated informational assistance and draft appeal documents only. It does not provide legal advice or solicitor representation.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Will this guarantee success?</h3>
              <p className="text-slate-600">No. While our AI is highly effective at identifying common grounds for appeal based on UK regulations, we cannot guarantee that any specific appeal will be successful.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Which tickets can I appeal?</h3>
              <p className="text-slate-600">We support Council PCNs, bus lane penalties, private parking notices, ULEZ, and Clean Air Zone penalties in the UK.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-white h-6 w-6" />
              <span className="text-xl font-bold">FightYourPCN</span>
            </div>
            <p className="text-slate-400 text-sm">
              Helping UK drivers challenge unfair parking tickets with AI technology.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Contact</h4>
            <p className="text-sm text-slate-400">
              support@fightyourpcn.co.uk
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p className="mb-4 font-bold text-slate-400">Disclaimer: FightYourPCN provides AI-generated informational assistance and draft appeal documents only. It does not provide legal advice or solicitor representation.</p>
          <p>&copy; {new Date().getFullYear()} FightYourPCN. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
