import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useTemplatesQuery, useTemplateDetailQuery } from '../api/useTemplateQuery';
import { useApplyTemplate } from '../api/useTemplateMutation';
import { TemplateCard } from './TemplateCard';
import type { TaskTemplate, ApplyItemOverride } from '../model/templateTypes';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft } from 'lucide-react';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetDate: Date;
}

export function TemplatePickerModal({ isOpen, onClose, targetDate }: TemplatePickerModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);
  const [step, setStep] = useState<'list' | 'customize'>('list');
  const [overrides, setOverrides] = useState<Record<number, ApplyItemOverride>>({});

  const { data: templates, isLoading: isLoadingTemplates } = useTemplatesQuery();
  const { data: templateDetail, isLoading: isLoadingDetail } = useTemplateDetailQuery(
    selectedTemplate?.id || '',
    step === 'customize' && !!selectedTemplate
  );

  const { mutate: applyTemplate, isPending: isApplying } = useApplyTemplate();

  const handleApply = (template: TaskTemplate) => {
    applyTemplate(
      { templateId: template.id, payload: { targetDate: format(targetDate, 'yyyy-MM-dd') } },
      { onSuccess: onClose }
    );
  };

  const handleCustomize = (template: TaskTemplate) => {
    setSelectedTemplate(template);
    setOverrides({});
    setStep('customize');
  };

  const handleApplyCustomized = () => {
    if (!selectedTemplate) return;
    
    const overridesList = Object.values(overrides);
    applyTemplate(
      { 
        templateId: selectedTemplate.id, 
        payload: { 
          targetDate: format(targetDate, 'yyyy-MM-dd'),
          overrides: overridesList.length > 0 ? overridesList : undefined
        } 
      },
      { onSuccess: onClose }
    );
  };

  const handleOverrideChange = (order: number, field: keyof ApplyItemOverride, value: any) => {
    setOverrides(prev => ({
      ...prev,
      [order]: {
        ...prev[order],
        displayOrder: order,
        [field]: value
      }
    }));
  };

  // Reset state when closing
  const handleClose = () => {
    setSelectedTemplate(null);
    setStep('list');
    setOverrides({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step === 'customize' && (
              <Button variant="ghost" size="icon" onClick={() => setStep('list')} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {step === 'list' 
                ? `Apply Template to ${format(targetDate, 'MMM d, yyyy')}` 
                : `Customize: ${selectedTemplate?.title}`}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 -mx-4 px-4 h-full">
          {step === 'list' && (
            <div className="flex flex-col gap-4 py-4">
              {isLoadingTemplates ? (
                <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /></div>
              ) : templates?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No templates found. Save a day as a template to get started.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates?.map(template => (
                    <div key={template.id} className="relative group">
                      <TemplateCard 
                        template={template} 
                        onApply={(t) => handleApply(t)} 
                      />
                      <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm rounded-lg border">
                        <Button onClick={() => handleApply(template)} className="bg-indigo-600 hover:bg-indigo-700">Quick Apply</Button>
                        <Button variant="outline" onClick={() => handleCustomize(template)}>Customize</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 'customize' && (
            <div className="flex flex-col gap-4 py-4">
              {isLoadingDetail ? (
                <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /></div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-500 mb-2">Uncheck tasks you want to skip, or edit titles.</p>
                  {templateDetail?.items.map((item) => {
                    const order = item.displayOrder;
                    const override = overrides[order];
                    const isSkipped = override?.skip ?? false;
                    
                    return (
                      <div key={order} className={`flex items-start gap-3 p-3 rounded-md border transition-colors ${isSkipped ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200'}`}>
                        <Checkbox 
                          checked={!isSkipped}
                          onCheckedChange={(checked) => handleOverrideChange(order, 'skip', !checked)}
                          className="mt-1"
                        />
                        <div className="flex-1 flex flex-col gap-2">
                          <Input 
                            value={override?.title !== undefined ? override.title : item.title}
                            onChange={(e) => handleOverrideChange(order, 'title', e.target.value)}
                            disabled={isSkipped}
                            className={`h-8 ${isSkipped ? 'line-through text-gray-400' : ''}`}
                          />
                          {item.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {step === 'customize' && (
          <DialogFooter className="mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setStep('list')} disabled={isApplying}>
              Cancel
            </Button>
            <Button 
              onClick={handleApplyCustomized} 
              disabled={isApplying || isLoadingDetail}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isApplying ? 'Applying...' : 'Apply Customized Template'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
