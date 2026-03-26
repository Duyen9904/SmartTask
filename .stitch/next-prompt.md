---
page: templates-marketplace
---
A community templates marketplace page for SmartTask where users browse, share, download, and rate reusable task templates created by the community.

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
2. Header: "📋 Template Marketplace" with "Create Template" button and search bar
3. Category filter bar: All, Productivity, Study, Fitness, Work, Creative, Morning Routines
4. Featured templates carousel: 3 top-rated community templates with author info, ratings, usage stats
5. Template grid: 3x3 grid of template cards with name, description, subtask count, rating, downloads, author avatar, "Use Template" and "Preview" buttons
6. My Templates section: templates the user has created with edit/delete/share options and download stats
7. Recently used templates with quick-apply buttons
