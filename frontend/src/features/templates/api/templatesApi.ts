import { httpClient } from '@/lib/httpClient';
import type { Task } from '../../tasks/model/taskTypes';
import type {
  ApplyTemplatePayload,
  CreateTemplatePayload,
  SaveFromDatePayload,
  TaskTemplate,
  TaskTemplateDetail,
} from '../model/templateTypes';

export const templatesApi = {
  getTemplates: () => httpClient.get<TaskTemplate[]>('/templates'),
  
  getTemplateDetail: (templateId: string) => 
    httpClient.get<TaskTemplateDetail>(`/templates/${templateId}`),
  
  createTemplate: (payload: CreateTemplatePayload) => 
    httpClient.post<TaskTemplate>('/templates', payload),
  
  saveFromDate: (payload: SaveFromDatePayload) => 
    httpClient.post<TaskTemplate>('/templates/from-date', payload),
  
  applyTemplate: (templateId: string, payload: ApplyTemplatePayload) => 
    httpClient.post<Task[]>(`/templates/${templateId}/apply`, payload),
  
  deleteTemplate: (templateId: string) => 
    httpClient.delete<void>(`/templates/${templateId}`),
};
