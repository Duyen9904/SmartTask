import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { useSaveFromDate } from '../api/useTemplateMutation';

interface SaveAsTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceDate: Date;
}

export function SaveAsTemplateModal({ isOpen, onClose, sourceDate }: SaveAsTemplateModalProps) {
  const [title, setTitle] = useState('');
  const { mutate: saveFromDate, isPending } = useSaveFromDate();

  const handleSave = () => {
    if (!title.trim()) return;

    saveFromDate(
      {
        sourceDate: format(sourceDate, 'yyyy-MM-dd'),
        templateTitle: title.trim(),
      },
      {
        onSuccess: () => {
          setTitle('');
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Day as Template</DialogTitle>
          <DialogDescription>
            Create a reusable template from all non-deleted tasks on {format(sourceDate, 'MMM d, yyyy')}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Template Title
            </label>
            <Input
              id="title"
              placeholder="e.g. Morning Routine, Project Kickoff"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!title.trim() || isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isPending ? 'Saving...' : 'Save Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
