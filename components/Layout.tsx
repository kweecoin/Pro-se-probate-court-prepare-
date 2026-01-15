import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-semibold">PP</div>
            <div>
              <p className="text-lg font-semibold">PawPromise</p>
              <p className="text-xs text-slate-500">Crowdfunding for pet emergencies</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <a className="hover:text-emerald-600" href="#donor">For Donors</a>
            <a className="hover:text-emerald-600" href="#campaigns">Campaigns</a>
            <a className="hover:text-emerald-600" href="#makers">Campaign Makers</a>
            <a className="hover:text-emerald-600" href="#pricing">Pricing</a>
          </nav>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold hover:border-emerald-500 hover:text-emerald-600 transition">Sign in</button>
            <button className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition">Start a Campaign</button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">PawPromise</h3>
            <p className="text-sm text-slate-400 mt-2">A dignified, transparent space for pet emergencies and rescue campaigns.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-emerald-400" href="#donor">Donor dashboard</a></li>
              <li><a className="hover:text-emerald-400" href="#makers">Campaign maker studio</a></li>
              <li><a className="hover:text-emerald-400" href="#pricing">Fees & payouts</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Share the love</h4>
            <p className="text-sm text-slate-400 mt-3">Spread campaigns instantly.</p>
            <div className="flex gap-3 mt-4 text-sm">
              <a className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-500 hover:text-emerald-400" href="https://instagram.com">Instagram</a>
              <a className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-500 hover:text-emerald-400" href="https://twitter.com">X</a>
              <a className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-emerald-500 hover:text-emerald-400" href="https://facebook.com">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 text-xs text-slate-500 text-center py-4">&copy; {new Date().getFullYear()} PawPromise. 3% platform fee applied to every donation.</div>
      </footer>
    </div>
  );
};

export default Layout;
