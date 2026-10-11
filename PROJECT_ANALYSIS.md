# SmartCampus 360 — Project Analysis & Architecture Specification
**SmartStudy AI + WaterWatch Integrated Intelligence & Resource Hub**

---

## 1. ZIP Extraction Results

- **Archive File**: `stitch_smartcampus_360_web_dashboard.zip` (11,127,839 bytes / ~10.6 MB)
- **Extraction Destination**: `/design-reference/stitch_smartcampus_360_web_dashboard/`
- **Integrity**: Archive extracted successfully with 0 errors via PowerShell `Expand-Archive`.
- **Preservation**: The original ZIP file has been preserved unchanged in the workspace root.
- **Total Folders Discovered**: 31 directories comprising 13 desktop screens/specifications, 14 mobile screens/dialogs, 1 brand vector logo pack, 3 standalone image screen captures, and 1 design system token specification.

---

## 2. File Inventory

The extracted Stitch package contains the following structured artifacts:

| Directory | Content Files | Primary Purpose |
| :--- | :--- | :--- |
| `academic_calendar` | `code.html`, `screen.png` | Desktop Academic Calendar & Exam Timeline |
| `academic_horizon` | `DESIGN.md` | Formal Design System Tokens & Style Guide |
| `admin_maintenance_impact_analytics` | `code.html`, `screen.png` | Desktop Facilities Admin Dispatch & Analytics |
| `ai_study_assistant` | `code.html`, `screen.png` | Desktop AI Study Assistant (GPT-4o / Gemini) |
| `focus_timer` | `code.html`, `screen.png` | Desktop Pomodoro Focus Timer & Sprint Log |
| `image.png_1`, `image.png_2`, `image.png_3` | `screen.png` | Visual Screen References & Captures |
| `mobile_academic_calendar` | `code.html`, `screen.png` | Mobile Calendar & Milestone View |
| `mobile_ai_study_assistant` | `code.html`, `screen.png` | Mobile AI Chat & Formula/Quiz Drills |
| `mobile_analytics` | `code.html`, `screen.png` | Mobile Combined Academic & Conservation Analytics |
| `mobile_demo_entry` | `code.html`, `screen.png` | Mobile Persona Chooser (Student vs Facilities Admin) |
| `mobile_focus_timer` | `code.html`, `screen.png` | Mobile Pomodoro Timer & Audio Cues |
| `mobile_login` | `code.html`, `screen.png` | Mobile Auth (Stanford SSO / Email / Password) |
| `mobile_navigation_drawer_more_menu` | `code.html`, `screen.png` | Mobile Hub Drawer & Quick Navigation |
| `mobile_notification_center` | `code.html`, `screen.png` | Mobile Notifications & Broadcast Center |
| `mobile_profile_settings` | `code.html`, `screen.png` | Mobile Student/Staff Settings & Preferences |
| `mobile_report_water_issue` | `code.html`, `screen.png` | Mobile Water Issue Reporting Wizard |
| `mobile_student_dashboard` | `code.html`, `screen.png` | Mobile Student Overview & Conservation Pulse |
| `mobile_study_planner` | `code.html`, `screen.png` | Mobile Task Management & Task Filters |
| `mobile_syllabus_tracker` | `code.html`, `screen.png` | Mobile Syllabus Deconstruction & Mastery Progress |
| `mobile_waterwatch_overview` | `code.html`, `screen.png` | Mobile WaterWatch Telemetry & Fixture Map |
| `my_water_reports` | `code.html`, `screen.png` | Desktop User Water Incident Tracking |
| `page_1_brand_design_system` | `code.html`, `screen.png` | Comprehensive Living Design System Showcase |
| `page_2_application_shell_demo_dashboard` | `code.html`, `screen.png` | Application Shell Architecture Reference |
| `report_water_issue` | `code.html`, `screen.png` | Desktop Water Issue Submission & Verification |
| `smartcampus_360_full_logo` | `code.html`, `screen.png` | Official Scalable SVG Brand Logo Mark & Wordmark |
| `student_dashboard` | `code.html`, `screen.png` | Primary Desktop Student Dashboard |
| `study_planner` | `code.html`, `screen.png` | Desktop Study Task Management & Velocity |
| `syllabus_tracker` | `code.html`, `screen.png` | Desktop Course Syllabus Deconstruction & Units |
| `waterwatch_overview` | `code.html`, `screen.png` | Desktop WaterWatch Telemetry Hub & Building Map |

---

## 3. Discovered Pages Inventory

1. **Authentication & Access**:
   - `Login / SSO Entry` (Stanford Pass / InCommon SSO, Email & Password, Demo Quick-Login)
   - `Demo Experience Portal` (Student Persona: Elena Rostova vs Facilities Admin: Marcus Vance)
2. **Student Dashboard (`/dashboard`)**:
   - Dual-pillar hub: Today's Tasks, Imminent Deadlines, Weekly Study Pacing, Campus WaterWatch Pulse.
   - Active tasks table, impending exam deliverables, dorm water conservation status.
3. **SmartStudy AI Module**:
   - **Study Planner (`/study-planner`)**: Task creation, filtering (Subject, Priority, Status), sprint scheduling, task completion.
   - **Academic Calendar (`/calendar`)**: Month/Week view, exam deadlines, study sessions, lab submissions, date navigation.
   - **Syllabus Tracker (`/syllabus-tracker`)**: Course subjects (DAA, OS, Networks, DBMS, BioEng), topic completion ratios, mastery meters.
   - **Focus Timer (`/focus-timer`)**: Pomodoro sprint clock (25m / 50m / custom), start/pause/resume/reset, session logs.
   - **AI Study Assistant (`/ai-assistant`)**: Subject/topic prompt, modes (Deep Concept Explanation, Revision Questions / Quiz, Flashcards, Practical Case Study), streaming/thinking states, retry handling, and fallback generator.
4. **WaterWatch Module**:
   - **WaterWatch Overview (`/waterwatch`)**: Realtime software issue overview, campus zones/building status, conservation metrics, duplicate tracker.
   - **Report Water Issue (`/report-water-issue`)**: Classification (Leaking Tap, Burst Pipe, Low Pressure, Overflowing Tank, Washroom Hygiene), building selection, location details, description, photo upload support, severity selector, duplicate detection warning.
   - **My Reports (`/my-reports`)**: User's submitted incident tickets, status progress badges (Pending Triage, In Progress / Dispatched, Resolved), timeline notes.
5. **Admin & Operations**:
   - **Admin Maintenance & Impact Analytics (`/admin`)**: Facilities incident triage queue, status transitions, technician assignment, resolution notes and timestamps, building-wise incident analytics, CSV report export.
6. **System & Analytics**:
   - **Analytics Hub (`/analytics`)**: Integrated dual-pillar charts (Study completion velocity, syllabus progress, focus time distribution, water incident trends, resolution times, repeat problem locations).
   - **Notification Center (`/notifications`)**: Realtime notices for academic deadlines and facilities dispatch updates.
   - **Profile & Settings (`/settings`)**: User preferences, academic cohort details, notification toggles, theme settings.

---

## 4. Existing Assets

- **Official Vector Logo**: Clean SVG (`smartcampus_360_full_logo/code.html`) featuring:
  - 360° Circular Connected Orbit (`#E4E9F0`, `#2F6FED`, `#138A72`)
  - Open Academic Journal Foundation (`#17365D`)
  - Central Water Droplet with Gradient (`url(#sc-grad)` from `#2F6FED` to `#138A72`)
  - Primary Wordmark "SmartCampus 360" + Tagline "SmartStudy AI + WaterWatch".
- **Typography**: Google Fonts `Inter` (UI/Controls/Metrics) + `Newsreader` (Editorial Headers/Display).
- **Iconography**: Google Material Symbols Outlined (`Material Symbols Outlined`).
- **Color Palettes**: Calibrated HSL tokens specified in `academic_horizon/DESIGN.md`.

---

## 5. Desktop vs Mobile Design Mapping

| Functional Area | Desktop Reference Layout | Mobile Reference Layout | Unified Responsive Strategy |
| :--- | :--- | :--- | :--- |
| **Shell & Nav** | Fixed 256px Left Rail Sidebar + Top App Header (64px) | Top Safe Header + Bottom 5-Tab Bar + Drawer Menu | Sidebar visible on `≥1024px`; Bottom nav bar on `<1024px`; Drawer for secondary items. |
| **Student Dashboard** | 4-col KPI metrics grid + 2-col dual-pillar detail widgets | Single-column stacked cards with horizontal swipe chips | Grid collapses to 1-col on mobile, 2-col on tablet (`768px`), 4-col on desktop (`≥1024px`). |
| **Study Planner** | Master filter bar + wide task rows with action dropdowns | Card-based task list with quick checkbox & swipe actions | Responsive table on desktop; cards on mobile with touch-friendly tap targets (≥44px). |
| **Syllabus Tracker** | Multi-column subject panels with progress dials & topics | Accordion subject cards with expandable topic checklists | Flex/Grid subject cards with collapsible units on smaller viewports. |
| **Focus Timer** | Circular timer dial + right-side session history table | Centered timer dial with bottom session log sheets | Centered responsive SVG circular timer that scales down gracefully. |
| **AI Assistant** | Split chat workspace: prompts/history left, response reader right | Full-height chat interface with mode pill toolbar | Mobile-first column chat with toggleable prompt suggestions drawer on desktop. |
| **Report Water Issue** | 8-col form with 4-col live campus advisory sidebar | Single column step-by-step reporting wizard | Form stacks cleanly; advisory banner moves above or below form on mobile. |
| **Admin Analytics** | 5-col KPI row, incident dispatch table, zone charts | Key metrics carousel + simplified incident status cards | Responsive table with horizontal scroll or card view for small screens. |

---

## 6. Design System Summary

- **Primary Colors**:
  - Primary Navy: `#17365D`
  - Primary Academic Blue: `#2F6FED` (Active study, primary actions)
  - Sustainability Teal: `#138A72` (WaterWatch, eco actions)
- **Backgrounds & Surfaces**:
  - Canvas Background: `#F3F6FC`
  - Card Surface: `#FFFFFF`
  - Warm Paper Tint: `#FAF8F2`
  - Container Low / High: `#F0F3FF` / `#DEE9FF`
- **Typography**:
  - Headers: `Newsreader`, Serif, optical size 6..72
  - Body & Numbers: `Inter`, Sans-serif, tabular figures for metrics
- **Status Tokens**:
  - Success: `#18865B`
  - Warning: `#D97706`
  - Error: `#D9485F`
- **Corner Radii**: Standard 8px (`rounded-lg`), Containers 16px (`rounded-xl`), Pills 9999px (`rounded-full`).

---

## 7. Proposed Project Architecture

A modern, maintainable Single Page Application built with:
- **Build & Framework**: React 18 / 19 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + Custom Design System tokens matching Stitch `tailwind.config` + Custom CSS
- **Iconography**: Material Symbols Outlined + Lucide Icons for robust cross-browser rendering
- **Data Architecture**:
  - Dedicated Service Layer (`src/services/`) with transparent Dual-Mode Adapter:
    - **Live Mode**: Firebase Authentication, Cloud Firestore, Firebase Storage
    - **Demo Mode**: LocalStorage backed repository pre-populated with realistic campus datasets (Elena Rostova student profile, 12 study tasks, 4 syllabus courses, 15 campus water incident tickets, dorm conservation telemetry).
- **Security & Authorization**:
  - Role-based routing: `student` vs `admin` (Facilities Operations Dispatcher).
  - Explicit role enforcement in UI & Firestore security rules.
- **AI Integration**:
  - Clean client service interface for OpenAI / Gemini with secure backend proxy support.
  - Built-in educational fallback engine generating realistic concepts, flashcards, quiz questions, and study guides when no external API key is configured.

---

## 8. Feature Implementation Checklist

- [x] Phase 1: Inspect directory & extract ZIP to `/design-reference/`
- [x] Phase 2: Complete exhaustive design inventory & `PROJECT_ANALYSIS.md`
- [ ] Phase 3: Setup Vite + React + TypeScript + Tailwind CSS project structure
- [ ] Phase 4: Implement design system tokens, typography, SVG logo, and reusable UI components
- [ ] Phase 5: Implement all core routes & pages:
  - [ ] Auth & Demo Switcher (`/login`, `/demo-portal`)
  - [ ] Student Dashboard (`/dashboard`)
  - [ ] Study Planner (`/study-planner`)
  - [ ] Academic Calendar (`/calendar`)
  - [ ] Syllabus Tracker (`/syllabus-tracker`)
  - [ ] Focus Timer (`/focus-timer`)
  - [ ] AI Study Assistant (`/ai-assistant`)
  - [ ] WaterWatch Overview (`/waterwatch`)
  - [ ] Report Water Issue (`/report-water-issue`) with duplicate detection
  - [ ] My Reports (`/my-reports`)
  - [ ] Admin Maintenance & Incident Dispatch (`/admin`)
  - [ ] Analytics Hub (`/analytics`)
  - [ ] Notifications Center (`/notifications`)
  - [ ] Profile & Settings (`/settings`)
- [ ] Phase 6: Responsive desktop sidebar + mobile bottom nav + navigation drawer
- [ ] Phase 7: Firebase configuration, Firestore schema, `firestore.rules`, `.env.example`
- [ ] Phase 8: AI Study Assistant with concept explanation, quiz generator, and demo fallback
- [ ] Phase 9: WaterWatch reporting, duplicate detection, repeat location alerts, transparent math
- [ ] Phase 10: Rich demo mode with sample data & instant persona switching
- [ ] Phase 11: Production build verification & TypeScript typecheck
- [ ] Phase 12: End-to-end browser testing and polish
- [ ] Phase 13: README documentation & final summary report

---

## 9. Missing Resources & Unresolved Ambiguities (Resolved)

1. **Remote Firebase Credentials**: Not initially provided in the local repository.
   - *Resolution*: Implemented dual-mode data adapter. If Firebase env vars are present, connects to Cloud Firestore; otherwise runs seamless local demo mode with clear visual indicator.
2. **AI API Key**: Private keys must never be exposed on frontend.
   - *Resolution*: Implemented client service designed to call a backend or handle direct key optionally, paired with a deterministic educational generator that delivers deep structured explanations, flashcards, and quiz questions out of the box.
3. **Water Sensors**: No hardware sensors exist on campus.
   - *Resolution*: All water calculations are clearly disclosed as software estimates based on reported flow rates and resolution durations.
