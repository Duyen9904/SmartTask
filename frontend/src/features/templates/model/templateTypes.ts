export interface TemplateItem {
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  scheduledTime?: string;
  estimatedHours?: number;
  displayOrder: number;
}

export interface TaskTemplate {
  id: string;
  title: string;
  category: 'PERSONAL' | 'WORK' | 'SHOPPING' | 'FITNESS' | 'STUDY' | 'OTHER';
  isPublic: boolean;
  usageCount: number;
  createdAt: string;
}

export interface TaskTemplateDetail extends TaskTemplate {
  items: TemplateItem[];
}

export interface CreateTemplatePayload {
  title: string;
  category?: 'PERSONAL' | 'WORK' | 'SHOPPING' | 'FITNESS' | 'STUDY' | 'OTHER';
  isPublic?: boolean;
  items: Omit<TemplateItem, 'displayOrder'>[]; // The backend determines order by sequence
}

export interface SaveFromDatePayload {
  sourceDate: string; // YYYY-MM-DD
  templateTitle: string;
}

export interface ApplyItemOverride {
  displayOrder: number;
  title?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  scheduledTime?: string;
  skip?: boolean;
}

export interface ApplyTemplatePayload {
  targetDate: string; // YYYY-MM-DD
  overrides?: ApplyItemOverride[];
}
