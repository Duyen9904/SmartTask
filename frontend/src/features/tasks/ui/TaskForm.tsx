import React from 'react'
import { Calendar, Clock, Upload, Briefcase, GraduationCap, User, Users, HeartPulse } from 'lucide-react'
import { PrioritySelector } from './PrioritySelector'
import type { TaskPriority, TaskCategory, CreateTaskPayload } from '../model/taskTypes'
import { timeDiffMinutes, formatDuration } from '@/utils/date'

const categories: { value: TaskCategory; label: string; icon: React.ElementType }[] = [
  { value: 'PERSONAL', label: 'Personal', icon: User },
  { value: 'WORK',     label: 'Work',     icon: Briefcase },
  { value: 'STUDY',    label: 'Study',    icon: GraduationCap },
  { value: 'HEALTH',   label: 'Health',   icon: HeartPulse },
  { value: 'SOCIAL',   label: 'Social',   icon: Users },
]

type TaskFormProps = {
  initialData?: {
    title?: string
    description?: string
    priority?: TaskPriority
    dueDate?: string
    category?: TaskCategory
    startTime?: string
    endTime?: string
  }
  onSubmit: (payload: CreateTaskPayload) => void
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Create Task',
}: TaskFormProps) {
  const [title, setTitle] = React.useState(initialData?.title ?? '')
  const [description, setDescription] = React.useState(initialData?.description ?? '')
  const [priority, setPriority] = React.useState<TaskPriority>(initialData?.priority ?? 'MEDIUM')
  const [dueDate, setDueDate] = React.useState(initialData?.dueDate ?? '')
  const [category, setCategory] = React.useState<TaskCategory>(initialData?.category ?? 'PERSONAL')
  const [startTime, setStartTime] = React.useState(initialData?.startTime ?? '')
  const [endTime, setEndTime] = React.useState(initialData?.endTime ?? '')
  const [errors, setErrors] = React.useState<Record<string, string>>({})  

  // Sync initial data when it changes (e.g. from timeline click)
  React.useEffect(() => {
    if (initialData?.startTime !== undefined) setStartTime(initialData.startTime)
    if (initialData?.endTime !== undefined) setEndTime(initialData.endTime)
    if (initialData?.title !== undefined) setTitle(initialData.title)
    if (initialData?.dueDate !== undefined) setDueDate(initialData.dueDate)
  }, [initialData?.startTime, initialData?.endTime, initialData?.title, initialData?.dueDate])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Task title is required'
    if (title.trim().length > 200) newErrors.title = 'Title must be under 200 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /** Calculate estimatedHours from start/end time strings (HH:mm) */
  const calcEstimatedHours = (): string | undefined => {
    if (!startTime || !endTime) return undefined
    const diffMin = timeDiffMinutes(startTime, endTime)
    if (diffMin <= 0) return undefined
    return (diffMin / 60).toFixed(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      scheduledDate: dueDate || undefined,
      scheduledTime: startTime || undefined,
      estimatedHours: calcEstimatedHours(),
      category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* ─── Title ──────────────────────────────────────────────── */}
      <div className="space-y-2">
        <label htmlFor="task-title" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Task Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: '' })) }}
          placeholder="What needs to be done?"
          autoFocus
          className={[
            'w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500',
            'outline-none transition-all focus:bg-white/[0.08]',
            errors.title
              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
              : 'border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20',
          ].join(' ')}
        />
        {errors.title && (
          <p className="text-xs text-red-400 mt-1">{errors.title}</p>
        )}
      </div>

      {/* ─── Description ────────────────────────────────────────── */}
      <div className="space-y-2">
        <label htmlFor="task-desc" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Description
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.08] resize-none"
        />
      </div>

      {/* ─── Priority ───────────────────────────────────────────── */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Priority
        </label>
        <PrioritySelector value={priority} onChange={setPriority} />
      </div>

      {/* ─── Due Date ───────────────────────────────────────────── */}
      <div className="space-y-2">
        <label htmlFor="task-due" className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Due Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            id="task-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.08] [color-scheme:dark]"
          />
        </div>
      </div>

      {/* ─── Time Range ──────────────────────────────────────────── */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Time Range
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="task-start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.08] [color-scheme:dark]"
            />
          </div>
          <span className="text-muted-foreground text-sm font-medium">→</span>
          <div className="relative flex-1">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              id="task-end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-white/[0.08] [color-scheme:dark]"
            />
          </div>
        </div>
        {startTime && endTime && (() => {
          const diffMin = timeDiffMinutes(startTime, endTime)
          if (diffMin > 0) {
            return (
              <p className="text-[11px] text-primary/70 mt-1">
                Duration: {formatDuration(diffMin)}
              </p>
            )
          }
          if (diffMin <= 0) {
            return <p className="text-[11px] text-red-400 mt-1">End time must be after start time</p>
          }
          return null
        })()}
      </div>

      {/* ─── Category ───────────────────────────────────────────── */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Category
        </label>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const isActive = category === cat.value
            const Icon = cat.icon
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border',
                  isActive
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Photo Proof Upload ──────────────────────────────────── */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          Photo Proof <span className="text-slate-500 font-normal normal-case">(optional)</span>
        </label>
        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/30 hover:bg-white/[0.02] transition-all cursor-pointer group">
          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Upload className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
            Drag & drop photo proof here
          </p>
          <p className="text-[10px] text-slate-500">
            Supports PNG, JPG (Max 5MB)
          </p>
        </div>
      </div>

      {/* ─── Actions ─────────────────────────────────────────────── */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}
