import React from 'react';
import Layout from './components/Layout';
import { CAMPAIGNS, CAMPAIGN_TOOLKIT, DONOR_PLANS } from './constants';

const App: React.FC = () => {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
              Pet emergency crowdfunding
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">
              A classy, trusted home for the pets who need us most.
            </h1>
            <p className="text-lg text-slate-600">
              PawPromise brings donors and campaign makers together with transparent vet verification, instant payouts, and a polished experience built for urgent care.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
                Start a Campaign
              </button>
              <button className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition">
                Browse Campaigns
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <div>
                <p className="font-semibold text-slate-900">3% platform fee</p>
                <p>Only a 3% charge off the top of each donation.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Stripe powered</p>
                <p>Secure checkout with Apple Pay and cards.</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-3xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Quick donor sign up</h2>
            <p className="text-sm text-slate-500">Create a donor profile to follow pets, track impact, and donate fast.</p>
            <div className="space-y-3">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Full name" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Email address" />
              <button className="w-full rounded-xl bg-slate-900 text-white py-3 text-sm font-semibold hover:bg-slate-800">Create donor account</button>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-700">
              Verified donors get priority access to time-sensitive campaigns.
            </div>
          </div>
        </div>
      </section>

      <section id="donor" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Donor dashboard built for momentum</h2>
            <p className="text-slate-600">
              Discover verified campaigns, follow progress in real time, and send love with one-tap Stripe checkout.
            </p>
            <div className="grid gap-4">
              {DONOR_PLANS.map(plan => (
                <div key={plan.id} className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{plan.title}</h3>
                    <span className="text-xs text-emerald-600 font-semibold">Donor</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">{plan.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                    {plan.highlights.map(item => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-emerald-500">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Donor feed</h3>
              <button className="text-xs px-3 py-1 rounded-full border border-slate-700">Live</button>
            </div>
            <div className="mt-6 space-y-4">
              {CAMPAIGNS.map(campaign => (
                <div key={campaign.id} className="rounded-2xl bg-slate-800 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{campaign.name}</p>
                      <p className="text-xs text-slate-400">{campaign.location}</p>
                    </div>
                    <button className="text-xs bg-emerald-500 text-slate-900 px-3 py-1 rounded-full font-semibold">Donate</button>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{campaign.story}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-emerald-200">
                    {campaign.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-emerald-500/10">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-slate-400">Raised {campaign.raised} of {campaign.goal}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="campaigns" className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Browse verified campaigns</h2>
              <p className="text-slate-600">Search by urgency, species, or location. Every campaign is verified by a vet or rescue partner.</p>
            </div>
            <div className="flex gap-2">
              <input className="rounded-full border border-slate-200 px-4 py-2 text-sm" placeholder="Search campaigns" />
              <button className="rounded-full bg-slate-900 text-white px-4 py-2 text-sm">Search</button>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAMPAIGNS.map(campaign => (
              <div key={campaign.id} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                    <p className="text-xs text-slate-500">{campaign.location}</p>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold">Verified</span>
                </div>
                <p className="text-sm text-slate-600 mt-3">{campaign.story}</p>
                <div className="mt-4 text-xs text-slate-500">{campaign.raised} raised of {campaign.goal}</div>
                <button className="mt-4 w-full rounded-xl border border-slate-200 py-2 text-sm font-semibold hover:border-emerald-500 hover:text-emerald-600">View campaign</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="makers" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold">Campaign maker studio</h2>
            <p className="text-slate-600">Create campaigns with proof of care, upload photos, and manage every donor update from one dashboard.</p>
            <div className="grid gap-4">
              {CAMPAIGN_TOOLKIT.map(item => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
            <button className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Create a campaign</button>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My campaigns</h3>
              <span className="text-xs text-slate-500">Owner view</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Rocket’s Recovery</p>
                    <p className="text-xs text-slate-500">Photos, updates, donor messages</p>
                  </div>
                  <button className="text-xs px-3 py-1 rounded-full border border-slate-200">Manage</button>
                </div>
                <div className="mt-4 flex gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Create update</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">Upload photos</span>
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Whiskers Dental Fund</p>
                    <p className="text-xs text-slate-500">Ongoing care plan</p>
                  </div>
                  <button className="text-xs px-3 py-1 rounded-full border border-slate-200">Manage</button>
                </div>
                <div className="mt-4 flex gap-2 text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Share campaign</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">Message donors</span>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">+ Create new campaign</div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold">Transparent fees, instant payouts</h2>
            <p className="text-slate-600 mt-4">
              Every donation uses Stripe Connect. PawPromise only takes 3% off the top to keep the platform secure, verified, and classy.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <h3 className="font-semibold">Stripe integration</h3>
                <p className="text-sm text-slate-500 mt-2">Apple Pay, ACH, cards, and instant transfers.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <h3 className="font-semibold">Secure databases</h3>
                <p className="text-sm text-slate-500 mt-2">Separate donor and campaign maker records with verification logs.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <h3 className="font-semibold">Automatic 3% fee</h3>
                <p className="text-sm text-slate-500 mt-2">Fee deducted before payout, visible on every receipt.</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <h3 className="font-semibold">Receipts & analytics</h3>
                <p className="text-sm text-slate-500 mt-2">Downloadable receipts and progress analytics for transparency.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Stripe payout example</h3>
            <p className="text-sm text-slate-400 mt-2">Donation amount: $100</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Platform fee (3%)</span>
                <span>$3.00</span>
              </div>
              <div className="flex justify-between">
                <span>Stripe processing</span>
                <span>$2.90</span>
              </div>
              <div className="border-t border-slate-700 pt-3 flex justify-between font-semibold text-white">
                <span>Net payout</span>
                <span>$94.10</span>
              </div>
            </div>
            <button className="mt-6 w-full rounded-xl bg-emerald-500 text-slate-900 py-3 text-sm font-semibold">Talk to sales</button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold">Ready to rescue more pets?</h2>
            <p className="text-slate-600 mt-2">Launch a campaign or become a donor today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-full bg-slate-900 text-white font-semibold">Donor signup</button>
            <button className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:border-emerald-500 hover:text-emerald-600">Campaign signup</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
