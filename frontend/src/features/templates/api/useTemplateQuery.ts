import { useQuery } from '@tanstack/react-query';
import { templatesApi } from './templatesApi';
import type { TaskTemplate, TaskTemplateDetail } from '../model/templateTypes';

export const TEMPLATE_KEYS = {
  all: ['templates'] as const,
  lists: () => [...TEMPLATE_KEYS.all, 'list'] as const,
  detail: (id: string) => [...TEMPLATE_KEYS.all, 'detail', id] as const,
};

export const useTemplatesQuery = () => {
  return useQuery<TaskTemplate[], Error>({
    queryKey: TEMPLATE_KEYS.lists(),
    queryFn: () => templatesApi.getTemplates(),
  });
};

export const useTemplateDetailQuery = (templateId: string, enabled: boolean = true) => {
  return useQuery<TaskTemplateDetail, Error>({
    queryKey: TEMPLATE_KEYS.detail(templateId),
    queryFn: () => templatesApi.getTemplateDetail(templateId),
    enabled: enabled && !!templateId,
  });
};
