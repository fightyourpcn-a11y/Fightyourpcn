import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="text-primary h-6 w-6" />
            <span className="text-xl font-bold text-primary">FightYourPCN</span>
          </Link>
          <Link to="/" className="text-slate-600 hover:text-primary font-medium flex items-center gap-2 transition">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when using our service, including:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Name and email address</li>
                <li>Details of your parking ticket (Council name, ticket type, etc.)</li>
                <li>Files you upload (photos or PDFs of your parking ticket)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Generate your AI-powered appeal draft</li>
                <li>Process your payment via Stripe</li>
                <li>Communicate with you regarding your appeal</li>
                <li>Improve our service and AI models</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Sharing</h2>
              <p>We do not sell your personal data. We share your data with third-party service providers only as necessary to provide our service:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Stripe:</strong> For payment processing.</li>
                <li><strong>AI Providers:</strong> We send ticket details to AI models (like OpenAI or OpenRouter) to generate the appeal draft. We do not include your name or email in these AI prompts unless it is part of the ticket text you've uploaded.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Security</h2>
              <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
              <p>We retain your information for as long as necessary to provide the service and for legal compliance. Uploaded files are deleted from our servers periodically.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
              <p>Under the UK GDPR, you have rights including the right to access, correct, or delete your personal data. Contact us at support@fightyourpcn.co.uk to exercise these rights.</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} FightYourPCN. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Privacy;
