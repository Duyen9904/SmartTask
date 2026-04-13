import { useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesApi } from './templatesApi';
import { TEMPLATE_KEYS } from './useTemplateQuery';
import { taskKeys } from '../../tasks/api/useTasksQuery';
import { toast } from 'sonner';

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templatesApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.lists() });
      toast.success('Template created successfully');
    },
    onError: () => {
      toast.error('Failed to create template');
    },
  });
};

export const useSaveFromDate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templatesApi.saveFromDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.lists() });
      toast.success('Day saved as template successfully');
    },
    onError: () => {
      toast.error('Failed to save day as template');
    },
  });
};

export const useApplyTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ templateId, payload }: { templateId: string; payload: Parameters<typeof templatesApi.applyTemplate>[1] }) => 
      templatesApi.applyTemplate(templateId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all }); // To update usage counts
      toast.success('Template applied successfully');
    },
    onError: () => {
      toast.error('Failed to apply template');
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: templatesApi.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.lists() });
      toast.success('Template deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete template');
    },
  });
};
