import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { taskService } from '../api/tasksApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '../api/useTasksQuery';
import { toast } from 'sonner';

interface CopyDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceDate: Date;
}

export function CopyDayModal({ isOpen, onClose, sourceDate }: CopyDayModalProps) {
  const [targetDateStr, setTargetDateStr] = useState('');
  const queryClient = useQueryClient();

  const { mutate: copyDay, isPending } = useMutation({
    mutationFn: (target: string) => 
      taskService.copyDay({ 
        sourceDate: format(sourceDate, 'yyyy-MM-dd'), 
        targetDate: target 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success('Tasks copied successfully');
      setTargetDateStr('');
      onClose();
    },
    onError: () => {
      toast.error('Failed to copy tasks');
    }
  });

  const handleCopy = () => {
    if (!targetDateStr) return;
    copyDay(targetDateStr);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy Tasks to Another Date</DialogTitle>
          <DialogDescription>
            Copy all tasks from {format(sourceDate, 'MMM d, yyyy')} to the selected date.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="targetDate" className="text-sm font-medium text-gray-700">
              Target Date
            </label>
            <Input
              id="targetDate"
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleCopy} 
            disabled={!targetDateStr || isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isPending ? 'Copying...' : 'Copy Tasks'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
