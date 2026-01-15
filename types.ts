export interface Campaign {
  id: string;
  name: string;
  location: string;
  goal: string;
  raised: string;
  story: string;
  tags: string[];
}

export interface DonorPlan {
  id: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface CampaignToolkitItem {
  id: string;
  title: string;
  description: string;
}
