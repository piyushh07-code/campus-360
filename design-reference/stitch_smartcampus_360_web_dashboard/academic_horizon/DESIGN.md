---
name: Academic Horizon
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee9ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#424654'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#737786'
  outline-variant: '#c2c6d7'
  surface-tint: '#0056d0'
  primary: '#0055ce'
  on-primary: '#ffffff'
  primary-container: '#2f6fed'
  on-primary-container: '#ffffff'
  inverse-primary: '#b1c5ff'
  secondary: '#435f89'
  on-secondary: '#ffffff'
  secondary-container: '#b4d0ff'
  on-secondary-container: '#3d5982'
  tertiary: '#006b57'
  on-tertiary: '#ffffff'
  tertiary-container: '#07866e'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001847'
  on-primary-fixed-variant: '#0040a0'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#acc8f7'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#2b486f'
  tertiary-fixed: '#90f5d8'
  tertiary-fixed-dim: '#73d8bd'
  on-tertiary-fixed: '#002019'
  on-tertiary-fixed-variant: '#005141'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
  headline-lg:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  metric-val:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an intelligent, tranquil, and scholarly workspace. Synthesizing the quiet focus of an editorial study journal with the real-time operational precision of an environmental utility monitor, the visual language balances intellectual rigor with modern ecological accountability.

The target audience spans focused university students organizing demanding workloads and campus administrators monitoring collective resource flows. Rather than chaotic notification streams or gamified visual clutter, the interface provides a grounded, calm atmosphere that honors cognitive bandwidth.

The design movement combines **Corporate Modern** structure with **Editorial Minimalism**: crisp data cards, generous margins, restrained borders, and scholarly typographic contrast where warm editorial serifs meet clinical, highly legible sans-serif metrics.

## Colors

The palette establishes distinct functional territories across the campus operating ecosystem:

- **Primary Academic Blue (`#2F6FED`)**: Represents active cognitive focus, actionable primary elements, interactive states, and active academic planning tools.
- **Deep Navy (`#17365D`)**: Anchors structural navigation, persistent shell rails, dense header blocks, and institutional hierarchy.
- **Sustainability Teal (`#138A72`)**: Designates resource metrics, environmental consumption monitors (e.g., WaterWatch modules), and efficiency achievements.
- **Neutral Main Text (`#202B3C`) & Secondary Text (`#6B7280`)**: Balances high legibility against tinted canvas surfaces without the harsh contrast of pure black.
- **Pale Blue Background (`#F3F6FC`) & Warm Surface (`#FAF8F2`)**: The canvas employs `#F3F6FC` to frame the overarching viewport, while cards and content panels use crisp `#FFFFFF` or warm academic paper tint `#FAF8F2` to reduce eye strain during prolonged research sessions.
- **Semantic Accents**: Critical indicators feature crisp thresholds—Success (`#18865B`), Warning (`#D97706`), and Alert/Error (`#D9485F`).

## Typography

The typographic hierarchy intentionally divides editorial contemplation from utilitarian analytics:

- **Headlines & Editorial Statements (`Newsreader`)**: Evoking classical university anthologies and literary journals, display and header tiers set a measured, reflective pace. Used strictly for page titles, milestone overviews, and primary section labels.
- **Functional Interface & Data Presentation (`Inter`)**: Controls, tables, schedules, numerical graphs, and forms depend entirely on Inter for maximal clarity at compact scales and high densities.
- **Metric Figures (`metric-val`)**: Large analytical readouts utilize tabular figures from Inter to ensure alignment across real-time water utility gauges and academic progress summaries.

## Layout & Spacing

The layout model pairs a structured vertical navigation spine with a fluid, multi-tier modular grid:

- **Grid Architecture**: On desktop viewports (≥1024px), a fixed left rail (240px) anchors navigation, feeding into a 12-column fluid content area with `1.25rem` (20px) gutters and `2rem` (32px) margins.
- **Modular Breakpoints**: 
  - *Desktop (≥1024px)*: 12 columns; accommodates dual-card comparative widgets (study schedules alongside conservation flowrates).
  - *Tablet (768px - 1023px)*: 6 columns; sidebar collapses into an icon rail or top bar, gutters adjust to `1rem`.
  - *Mobile (<768px)*: 4 columns; layout linearizes into single-column vertical cards with `0.75rem` gutters and `1rem` safe margins.
- **Density & Cadence**: Spacing within data modules strictly respects the 4px baseline rhythm (`space-xs` through `space-xl`), ensuring compact information density without visual crowding.

## Elevation & Depth

Visual depth follows a soft, paper-like tactile stratification rather than heavy digital layering:

- **Subtle Surface Tiers**:
  - *Canvas Level (Elevation 0)*: Background `#F3F6FC` sets the environmental foundation.
  - *Card Tier (Elevation 1)*: Primary modules sit on pure `#FFFFFF` or `#FAF8F2` bordered with a 1px crisp rule (`#E4E9F0`). Shadows are hyper-diffused: `0 1px 3px rgba(23, 54, 93, 0.04), 0 4px 12px rgba(23, 54, 93, 0.03)`.
  - *Overlay & Dropdown Tier (Elevation 2)*: Modals and flyout menus rely on a soft collegiate blue cast: `0 8px 24px rgba(23, 54, 93, 0.08)`.
- **Low-Contrast Separation**: Hierarchy relies predominantly on background tone transitions and delicate 1px structural dividers rather than aggressive drop shadows.

## Shapes

The design system implements a Level 2 (`roundedness: 2`) curvature paradigm, creating soft rectangular silhouettes:

- **Standard Elements (0.5rem / 8px)**: Buttons, form fields, filter chips, and interactive data nodes use an 8px radius, retaining clean geometry while avoiding severe corners.
- **Containers & Surfaces (1rem / 16px - `rounded-lg`)**: Metric summary cards, schedule calendars, and utility telemetry panels use a 16px corner profile.
- **Interactive Badges & Pills**: Status badges and progress tags transition to continuous pill profiles (`rounded-full`) to contrast against the architectural cards they inhabit.

## Components

### Buttons
- **Primary**: Background `#2F6FED`, text `#FFFFFF`, 8px corner radius, font `label-lg`. Padding: `0.625rem 1.25rem`. Hover state darkens toward `#2056C2`.
- **Secondary / Academic Outline**: Transparent background, 1px solid `#E4E9F0`, text `#17365D`. Hover brings `#F3F6FC` fill.
- **Eco Action**: Background `#138A72`, text `#FFFFFF`. Reserved strictly for WaterWatch conservation toggles and green initiatives.

### Metric Cards & Dashboard Tiles
- Enclosed with 1px border `#E4E9F0`, white `#FFFFFF` surface, 16px radius (`rounded-lg`), padded with `space-lg`.
- Top row pairs an academic label (`label-sm` in `#6B7280`) with a status badge.
- Body displays a bold numerical readout (`metric-val` in `#202B3C`) complemented by a mini sparkline or progress tracker.

### Input Fields & Controls
- **Inputs**: Height 40px, border 1px solid `#E4E9F0`, surface `#FFFFFF`, text `#202B3C`. Focus states produce a 2px ring in `#2F6FED` at 20% opacity with border `#2F6FED`.
- **Checkboxes & Radios**: 18px size, 4px border radius for checkboxes, full circle for radios. Checked background `#2F6FED` with clean white iconography.

### Chips & Status Tags
- Height 24px, 12px radius (`rounded-full`), padded `0.25rem 0.75rem`.
- **Study AI Tag**: Background `#EBF2FE`, text `#2F6FED`.
- **WaterWatch Tag**: Background `#E6F5F1`, text `#138A72`.
- **Urgent / Exam Tag**: Background `#FDF0F2`, text `#D9485F`.

### Schedule & Telemetry Lists
- Divided by thin 1px `#E4E9F0` rules.
- Alternate zebra-striping avoided in favor of clean whitespace (`space-sm` vertical spacing) and hover highlight using `#F3F6FC`.