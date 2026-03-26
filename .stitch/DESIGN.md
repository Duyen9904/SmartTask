# SmartTask – Design System

## 1. Brand Identity

- **Name**: SmartTask
- **Tagline**: "Plan Smarter. Achieve Together."
- **Personality**: Intelligent, friendly, motivating, modern
- **Logo concept**: Abstract brain + checkmark icon, representing AI-powered task completion

## 2. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Electric Indigo | `#6C5CE7` |
| Primary Light | Soft Lavender | `#A29BFE` |
| Secondary | Coral Energy | `#FF6B6B` |
| Accent | Mint Fresh | `#00D2D3` |
| Success | Emerald | `#00B894` |
| Warning | Amber Glow | `#FDCB6E` |
| Background Dark | Deep Space | `#0A0A1A` |
| Background Card | Night Surface | `#141432` |
| Text Primary | Pure White | `#FFFFFF` |
| Text Secondary | Muted Lavender | `#B8B8D4` |
| Border | Subtle Edge | `rgba(255,255,255,0.08)` |

## 3. Typography

| Use | Font | Weight | Size |
|-----|------|--------|------|
| Display/Hero | Inter | 800 (ExtraBold) | 56-72px |
| Headings | Inter | 700 (Bold) | 32-48px |
| Subheadings | Inter | 600 (SemiBold) | 20-24px |
| Body | Inter | 400 (Regular) | 16px |
| Small/Caption | Inter | 400 (Regular) | 13-14px |
| Buttons | Inter | 600 (SemiBold) | 14-16px |

## 4. Component Style

- **Border radius**: 12-16px for cards, 8px for buttons, 24px for pills/badges
- **Shadows**: Soft glow shadows using primary color at low opacity (`0 4px 24px rgba(108,92,231,0.15)`)
- **Glass effects**: `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- **Gradients**: Primary-to-accent diagonal gradients for CTAs and highlights
- **Cards**: Dark glassmorphism with subtle border and inner glow
- **Hover states**: Scale(1.02) with enhanced glow, smooth 0.3s transitions
- **Icons**: Lucide or Phosphor icon set, 20-24px, matching text color

## 5. Layout Principles

- **Max width**: 1280px centered container
- **Grid**: 12-column grid with 24px gutters
- **Spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Responsive breakpoints**: 480px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide)
- **Navigation**: Sticky top nav with glassmorphism background blur

## 6. Design System Notes for Stitch Generation

**DESIGN SYSTEM (REQUIRED):**

Use a **dark-mode, premium SaaS aesthetic** with the following specifications:

- **Color scheme**: Deep space dark backgrounds (#0A0A1A base, #141432 cards) with Electric Indigo (#6C5CE7) as primary accent, Coral (#FF6B6B) for urgency/energy, Mint (#00D2D3) for success/AI elements, Emerald (#00B894) for completion states
- **Typography**: Inter font family throughout. Hero text 56-72px ExtraBold, headings 32-48px Bold, body 16px Regular. White text on dark, muted lavender (#B8B8D4) for secondary text
- **Visual style**: Glassmorphism cards with backdrop-blur(20px), subtle rgba borders, soft glowing shadows using primary color. Rounded corners (12-16px cards, 8px buttons, 24px pills). Diagonal gradients from indigo to accent colors for CTAs
- **Interactions**: Smooth hover transitions (0.3s), subtle scale transforms, glowing button effects on hover
- **Layout**: 1280px max-width, generous whitespace, 12-column grid. Sticky navigation with glass effect
- **Iconography**: Use inline SVG icons or emoji for visual elements. Style: outlined, modern, 20-24px
- **Atmosphere**: Professional yet approachable. Think "Notion meets Discord" – productivity tool with social energy. Subtle animated gradients or floating particles for hero sections
- **Navigation**: Top sticky nav bar with logo, nav links (Dashboard, Tasks, Social, AI Assistant), and user avatar. Glass background with blur
