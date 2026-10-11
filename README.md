# SmartCampus 360 🎓💧
> **Intelligent Scholar Workstation & Campus Resource Conservation Platform**
> Integrating **SmartStudy AI** and **WaterWatch** into a unified, responsive campus experience.

---

## 🌟 Executive Overview

**SmartCampus 360** unites two critical dimensions of university life:
1. **SmartStudy AI**: High-performance academic workstation featuring curriculum planning, Pomodoro sprints, interactive syllabus mastery tracking, academic calendar scheduling, and AI-assisted conceptual drills.
2. **WaterWatch**: Crowdsourced campus sustainability and facility maintenance system that enables students to report leaks/plumbing hazards, and empowers facilities personnel to triage, dispatch, and track water conservation metrics.

---

## ⚙️ Architectural Highlights

- **Frontend Core**: React 18, TypeScript, Vite, Tailwind CSS.
- **Design Fidelity**: Exact reproduction of the Stitch-exported design system (*Academic Horizon* palette with Stanford Navy `#17365D`, Academic Blue `#2F6FED`, Sustainability Teal `#138A72`, and Newsreader serif typography).
- **Dual-Mode Persistence Layer**:
  - **Cloud Mode**: Seamlessly connects to Google Cloud Firestore and Firebase Auth when API keys are configured.
  - **Demo Experience Mode**: Operates out-of-the-box using persistent browser LocalStorage, pre-seeded with rich, realistic student (Elena Vance) and facilities admin (Marcus Vance) personas.
- **Transparent Estimation Model**:
  - *No fabricated hardware sensors*: All flow metrics and savings figures are clearly documented as empirical software estimates derived from standardized fixture loss rates (e.g. 1.8 gal/hr for tap drips, 18.5 gal/hr for pipe bursts) multiplied by turnaround duration.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.x or v20+ recommended)
- npm or yarn

### 1. Installation
```bash
# Clone or navigate to the project directory
cd PROJECT_WEB

# Install dependencies
npm install
```

### 2. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Personas & Demo Experience

The application includes two pre-configured evaluation personas:

| Persona | Role | Default Email | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Elena Vance (Rostova)** | Student (Bioengineering '26) | `e.rostova@stanford.edu` | Study task management, Pomodoro timer, syllabus mastery checklist, WaterWatch leak reporting |
| **Marcus Vance** | Facilities Administrator | `admin@facilities.stanford.edu` | Maintenance queue triage, dispatch assignment, water loss analytics, repeat leak heatmaps, CSV exports |

*Switch personas at any time from the top header switcher or the Demo Portal (`/demo-portal`).*

---

## 🧭 Page & Route Directory

| Route | View Description |
| :--- | :--- |
| `/login` | Stanford Pass SSO and institutional login portal with state simulation pills |
| `/demo-portal` | Interactive sandbox entry with persona selection and seed reset |
| `/dashboard` | Student scholar dashboard with academic metrics, urgent sprints, and dorm conservation widget |
| `/study-planner` | Study tasks manager with CRUD operations, priority filtering, and course association |
| `/calendar` | Academic calendar with month/week views, assignment deadlines, and exam schedules |
| `/syllabus-tracker` | Interactive syllabus topic checklist with mastery toggle and progress bars |
| `/focus-timer` | Pomodoro focus sprint clock (25/5 min cycles) with ambient sounds and focus session history |
| `/ai-assistant` | AI tutor with interactive flashcards, formula breakdown, and quiz evaluation |
| `/waterwatch` | Conservation portal with dorm leaderboards, savings calculators, and recent reports |
| `/report-water-issue` | Multi-step issue reporting form with classification, photo upload, and duplicate alert |
| `/my-reports` | Student's submitted reports with real-time status tracker (Reported → In Progress → Resolved) |
| `/admin` | Facilities operations console with status triage, work orders, repeat leak warnings, and CSV export |
| `/analytics` | Dual-perspective analytics displaying academic study velocity alongside campus water savings |
| `/notifications` | Campus notifications center with filter by category (Study, Facilities, System) |
| `/settings` | User profile, notification preferences, dorm assignment, and theme settings |

---

## 🔒 Security & Firestore Rules

SmartCampus 360 includes production-ready Firestore security rules in `firestore.rules`:
- **Student Data Isolation**: Tasks, focus logs, and syllabus mastery are strictly scoped to the authenticated student's user ID.
- **WaterWatch Dual Access**: Any authenticated student can view report statuses and submit issues; only users elevated with the `facilities_admin` role can mutate status or dispatch teams.
- **Input Validation**: Rejects unauthorized field tampering or role privilege escalation.

---

## 📄 License
Educational use and campus sustainability initiative. Stanford University Student Life & Facilities Engineering.
