export interface Project {
  id: string;
  name: string;
  description: string;
  prompt: string;
  templateId?: string;
  subTemplateId?: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  /** Auto-extracted after each AI turn: file list + detected stack. Injected into system prompt for context continuity. */
  contextSummary?: string;
}

export interface SubTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  /** 'framework' generates code scaffolds (default); 'playbook' generates strategy docs. */
  type?: 'framework' | 'playbook';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'etl' | 'web' | 'api' | 'mobile' | 'performance' | 'security' | 'ai'
          | 'unit' | 'database' | 'cloud' | 'contract' | 'accessibility' | 'chaos'
          | 'cicd' | 'iot' | 'compliance' | 'blockchain' | 'desktop' | 'events' | 'visual'
          | 'bdd' | 'testdata' | 'usability' | 'i18n' | 'mutation'
          | 'exploratory' | 'uat' | 'observability' | 'dr-testing' | 'migration' | 'enterprise-integration';
  /** Groups templates into browsable collections on the home screen. */
  collection: 'core-engineering' | 'product-experience' | 'platform-reliability' | 'data-ai' | 'governance-risk' | 'specialized-systems';
  subTemplates: SubTemplate[];
  /** Industry / domain tiles shown next to sub-template cards. */
  domains: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

