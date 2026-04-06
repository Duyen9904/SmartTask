import {
  Brain,
  Users,
  Flame,
  LayoutTemplate,
  Heart,
  BarChart3,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Static Data for the Landing Page                                   */
/* ------------------------------------------------------------------ */

export type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: 'AI Smart Scheduling',
    description:
      'AI analyzes your habits and generates optimal daily schedules tailored to your peak focus hours.',
  },
  {
    icon: Users,
    title: 'Social Accountability',
    description:
      'Share tasks with friends and groups for motivation. Get gentle nudges from your accountability partners.',
  },
  {
    icon: Flame,
    title: 'Streaks & Gamification',
    description:
      'Build consistency with streaks, badges, and productivity scores. Turn daily chores into a rewarding game.',
  },
  {
    icon: LayoutTemplate,
    title: 'Task Templates',
    description:
      'Reuse proven routines and share high-performance templates with the global SmartTask community.',
  },
  {
    icon: Heart,
    title: 'Mood Check-ins',
    description:
      "Quick mood tracking that influences your AI schedule. Burnt out? We'll prioritize recovery tasks.",
  },
  {
    icon: BarChart3,
    title: 'Progress Insights',
    description:
      'Beautiful interactive analytics showing your productivity trends and where your time actually goes.',
  },
]

export type Step = {
  title: string
  description: string
}

export const STEPS: Step[] = [
  {
    title: 'Create Tasks',
    description: 'Add tasks, set priorities, and pick from community templates in seconds.',
  },
  {
    title: 'AI Plans Your Day',
    description: 'Our AI engine arranges your day based on deadlines and energy levels.',
  },
  {
    title: 'Achieve Together',
    description: 'Share progress, earn rewards, and stay accountable with your inner circle.',
  },
]

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The AI scheduling is a game-changer. It knows exactly when I'm most productive and slots my deep work right there.",
    name: 'Sarah Jenkins',
    role: 'Lead Designer, Aura',
  },
  {
    quote:
      'Social accountability keeps me honest. Seeing my friends hit their daily goals motivates me to clear my board too.',
    name: 'Marcus Chen',
    role: 'Software Engineer',
  },
  {
    quote:
      "I've tried every productivity app. SmartTask is the first one that actually understands the rhythm of my life.",
    name: 'Elena Rodriguez',
    role: 'Content Creator',
  },
]

export type FooterLinkColumn = {
  title: string
  links: string[]
}

export const FOOTER_LINKS: FooterLinkColumn[] = [
  {
    title: 'Product',
    links: ['AI Engine', 'Social Features', 'Pricing', 'Integrations'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Privacy Policy', 'Terms'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Documentation', 'Support Center', 'Community'],
  },
]
