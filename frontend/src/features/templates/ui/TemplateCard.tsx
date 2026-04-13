import React from 'react';
import type { TaskTemplate } from '../model/templateTypes';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash, CalendarPlus } from 'lucide-react';
import { format } from 'date-fns';

interface TemplateCardProps {
  template: TaskTemplate;
  onApply: (template: TaskTemplate) => void;
  onDelete?: (template: TaskTemplate) => void;
}

export function TemplateCard({ template, onApply, onDelete }: TemplateCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-4 bg-white/50 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-gray-900">{template.title}</h4>
          <span className="text-xs text-gray-500">
            Created: {format(new Date(template.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
        <Badge variant={template.category === 'PERSONAL' ? 'default' : 'secondary'} className="bg-indigo-100 text-indigo-700">
          {template.category}
        </Badge>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
        <span>Usage Count: {template.usageCount}</span>
        {template.isPublic && <Badge variant="outline" className="text-xs py-0 h-4">Public</Badge>}
      </div>

      <div className="flex justify-between mt-auto pt-2 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 h-auto"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(template);
          }}
        >
          <Trash className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="default" 
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4"
          onClick={(e) => {
            e.stopPropagation();
            onApply(template);
          }}
        >
          <CalendarPlus className="w-4 h-4 mr-2" />
          Apply
        </Button>
      </div>
    </Card>
  );
}
