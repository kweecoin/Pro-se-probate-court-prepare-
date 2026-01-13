
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { AppStep, Message, LegalDocument, CourtPrepReport } from './types';
import { CASE_TYPES, DISCLAIMER_TEXT } from './constants';
import { chatWithAI, generateReport } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.INITIAL);
  const [caseType, setCaseType] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [report, setReport] = useState<string>('');
  const [userInput, setUserInput] = useState('');

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'model',
        text: "Welcome to ProbatePro. Dealing with court can be stressful, but I'm here to help you get organized. What kind of hearing or issue are you preparing for today?",
        timestamp: new Date()
      }]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Explicitly type file as File to fix 'unknown' type errors reported in line 36-38, 43
      Array.from(e.target.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = (event.target?.result as string).split(',')[1];
          const newDoc: LegalDocument = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: file.size,
            base64: base64
          };
          setDocuments(prev => [...prev, newDoc]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMsg: Message = {
      role: 'user',
      text: userInput,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const responseText = await chatWithAI(newMessages, documents);
      setMessages(prev => [...prev, {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I encountered an error. Please check your connection and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const createReport = async () => {
    setIsTyping(true);
    setCurrentStep(AppStep.REPORT);
    try {
      const reportContent = await generateReport(messages, documents);
      setReport(reportContent);
    } catch (err) {
      console.error(err);
      setReport("Failed to generate report. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Layout currentStep={currentStep} onStepChange={setCurrentStep}>
      {currentStep === AppStep.INITIAL && (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 serif">Prepare for Court in Hours</h2>
            <p className="text-lg text-slate-600">Representing yourself is hard. ProbatePro helps you organize facts, analyze documents, and practice for the judge.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <h3 className="text-xl font-semibold mb-6 text-slate-800">Choose Your Case Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CASE_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => { setCaseType(type); setCurrentStep(AppStep.DOCUMENTS); }}
                  className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <span className="font-medium text-slate-700">{type}</span>
                  <div className="text-emerald-500">→</div>
                </button>
              ))}
            </div>
            <p className="mt-8 p-4 bg-amber-50 rounded-lg text-sm text-amber-800 border border-amber-200">
              <strong>Notice:</strong> {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      )}

      {currentStep === AppStep.DOCUMENTS && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 serif">Upload Evidence & Filings</h2>
            <p className="text-slate-600 mb-6">Upload Wills, Trusts, Petitions, or Emails. I will analyze them to help build your case arguments.</p>
            
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium">Click to upload files</p>
              <p className="text-slate-400 text-sm mt-1">PDF, JPG, PNG, DOCX</p>
            </div>

            {documents.length > 0 && (
              <div className="mt-8 space-y-3">
                <h4 className="font-semibold text-slate-800">Uploaded Documents ({documents.length})</h4>
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded shadow-sm">📄</div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{doc.name}</p>
                        <p className="text-xs text-slate-500">{(doc.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button onClick={() => removeDocument(doc.id)} className="text-slate-400 hover:text-red-500 px-2 text-xl">&times;</button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex justify-end">
              <button
                onClick={() => setCurrentStep(AppStep.CHAT)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
              >
                Proceed to Prep Session <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === AppStep.CHAT && (
        <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="font-semibold text-sm uppercase tracking-wider">Active Prep Session: {caseType}</h3>
            </div>
            <button 
              onClick={createReport}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
            >
              Finish & Generate Plan
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question or explain your side of the story..."
                className="flex-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!userInput.trim() || isTyping}
                className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center w-12"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">Tip: Mention specific dates or document clauses for better results.</p>
          </div>
        </div>
      )}

      {currentStep === AppStep.REPORT && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 print:shadow-none">
            <div className="bg-emerald-600 p-8 text-white">
              <h2 className="text-3xl font-bold serif">Your Court Preparation Strategy</h2>
              <p className="mt-2 text-emerald-100">Personalized summary for {caseType}</p>
            </div>
            
            <div className="p-8 sm:p-12 prose prose-slate max-w-none">
              {isTyping ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-medium animate-pulse">Assembling your final preparation plan...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-normal">
                  {report || "No report content available. Try chatting more with the assistant first."}
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 012-2H5a2 2 0 012 2v4a2 2 0 002 2z" />
                </svg>
                Print for Court
              </button>
              <button 
                onClick={() => setCurrentStep(AppStep.CHAT)}
                className="text-slate-600 font-semibold hover:text-emerald-600 transition-all"
              >
                ← Back to Prep Session
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-xl border-l-4 border-emerald-500 shadow-sm flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-bold text-slate-900">Final Tip</h4>
              <p className="text-slate-600 text-sm">Review this cheat sheet at least 3 times before your hearing. Bring 3 copies of every document (one for the judge, one for opposing counsel, and one for yourself).</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
