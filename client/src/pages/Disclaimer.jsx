import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
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
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertTriangle className="text-amber-600 h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Legal Disclaimer</h1>
          </div>
          
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-xl">
              <p className="font-bold text-amber-900 mb-2">Important Notice:</p>
              <p className="text-amber-800">FightYourPCN is not a law firm, and our employees are not acting as your solicitors. Our service and AI-generated documents are for informational purposes only and do not constitute legal advice.</p>
            </div>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">No Solicitor-Client Relationship</h2>
              <p>Your use of this website or our service does not create a solicitor-client relationship between you and FightYourPCN. We are not regulated by the Solicitors Regulation Authority (SRA).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Accuracy of Information</h2>
              <p>While we strive to keep our AI models updated with current UK parking regulations, laws and council guidelines change frequently. We cannot guarantee the accuracy, completeness, or suitability of the information provided or the appeal drafts generated.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">User Responsibility</h2>
              <p>You are solely responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Verifying all facts and legal arguments in your appeal draft.</li>
                <li>Ensuring your appeal is submitted within the legal time limits.</li>
                <li>Any costs, fines, or legal consequences resulting from your appeal or the use of our service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">No Guarantee of Success</h2>
              <p>The success of a parking ticket appeal depends on many factors, including the specific evidence and the discretion of the issuing authority. FightYourPCN makes no guarantee that any appeal generated through our service will be successful or result in the cancellation of a fine.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Consult a Professional</h2>
              <p>If you require legal advice for a specific problem, you should consult a qualified solicitor or legal professional.</p>
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

export default Disclaimer;
