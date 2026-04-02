---
page: notifications
---
A notifications center page for SmartTask where users manage alerts for task reminders, social interactions, AI suggestions, and achievement unlocks.

**DESIGN SYSTEM (REQUIRED):**

Use a **dark-mode, premium SaaS aesthetic** with the following specifications:

- **Color scheme**: Deep space dark backgrounds (#0A0A1A base, #141432 cards) with Electric Indigo (#6C5CE7) as primary accent, Coral (#FF6B6B) for urgency/energy, Mint (#00D2D3) for success/AI elements, Emerald (#00B894) for completion states
- **Typography**: Inter font family throughout. Hero text 56-72px ExtraBold, headings 32-48px Bold, body 16px Regular. White text on dark, muted lavender (#B8B8D4) for secondary text
- **Visual style**: Glassmorphism cards with backdrop-blur(20px), subtle rgba borders, soft glowing shadows using primary color. Rounded corners (12-16px cards, 8px buttons, 24px pills). Diagonal gradients from indigo to accent colors for CTAs
- **Interactions**: Smooth hover transitions (0.3s), subtle scale transforms, glowing button effects on hover
- **Layout**: 1280px max-width, generous whitespace, 12-column grid. Sticky navigation with glass effect
- **Iconography**: Use inline SVG icons or emoji for visual elements. Style: outlined, modern, 20-24px
- **Atmosphere**: Professional yet approachable. Think "Notion meets Discord" – productivity tool with social energy
- **Navigation**: Top sticky nav bar with logo, nav links (Dashboard, Tasks, Social, AI Assistant), and user avatar. Glass background with blur

**Page Structure:**
1. Sticky navigation with glass morphism
2. Header: "🔔 Notifications" with filter tabs (All, Tasks, Social, AI, Achievements) and "Mark All Read" button
3. Notification list grouped by date (Today, Yesterday, This Week)
4. Each notification card: icon, title, description, timestamp, read/unread indicator, action button
5. Empty state with illustration when no notifications
