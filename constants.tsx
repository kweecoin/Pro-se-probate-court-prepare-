import { Campaign, DonorPlan, CampaignToolkitItem } from './types';

export const CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'Luna’s Emergency Surgery',
    location: 'Austin, TX',
    goal: '$6,000',
    raised: '$4,320',
    story: 'Hit by a car and needs orthopedic surgery within 48 hours.',
    tags: ['Emergency Care', 'Dog', 'Surgery']
  },
  {
    id: '2',
    name: 'Mochi’s Rescue Rehab',
    location: 'Portland, OR',
    goal: '$2,500',
    raised: '$1,740',
    story: 'Rescued from the streets, now healing from malnutrition and trauma.',
    tags: ['Rescue', 'Cat', 'Rehab']
  },
  {
    id: '3',
    name: 'Harper’s Daily Meds Fund',
    location: 'Atlanta, GA',
    goal: '$1,200',
    raised: '$860',
    story: 'Managing chronic kidney disease with monthly treatments.',
    tags: ['Ongoing Care', 'Dog', 'Medication']
  }
];

export const DONOR_PLANS: DonorPlan[] = [
  {
    id: 'donor-1',
    title: 'Quick Donate',
    description: 'Save a payment method and donate in two taps when emergencies hit.',
    highlights: ['One-tap checkout', 'Auto receipts', 'Impact tracker']
  },
  {
    id: 'donor-2',
    title: 'Monthly Guardian',
    description: 'Sponsor multiple pets monthly with bundled giving and progress updates.',
    highlights: ['Monthly summary', 'Priority campaigns', 'Tax-ready history']
  }
];

export const CAMPAIGN_TOOLKIT: CampaignToolkitItem[] = [
  {
    id: 'tool-1',
    title: 'Create & Verify',
    description: 'Identity checks, vet verification, and rescue documentation in one flow.'
  },
  {
    id: 'tool-2',
    title: 'Story Builder',
    description: 'Guided prompts for timelines, costs, and photos that build trust.'
  },
  {
    id: 'tool-3',
    title: 'Share Everywhere',
    description: 'Auto-generated social posts and QR codes for vet clinics.'
  }
];
