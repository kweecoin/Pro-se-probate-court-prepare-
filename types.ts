
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LegalDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  base64: string;
  analysis?: string;
}

export interface CourtPrepReport {
  hearingDate?: string;
  caseType: string;
  keyFacts: string[];
  keyArguments: string[];
  suggestedQuestions: string[];
  proceduralTips: string[];
}

export enum AppStep {
  INITIAL = 'initial',
  DOCUMENTS = 'documents',
  CHAT = 'chat',
  REPORT = 'report'
}
