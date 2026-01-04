# Local Jobs Finder
### Mobile-First Job Discovery for Semi-Skilled Workers

A **React-based, mobile-first job discovery platform** designed specifically for India’s semi-skilled and blue-collar workforce — such as **maids, drivers, security guards, delivery partners, plumbers, and electricians**.

This project rethinks job search from the ground up by prioritizing **simplicity, trust, speed, and accessibility** over feature overload.

---

## Why This Project

Traditional job portals like Naukri or LinkedIn work well for corporate professionals — but they **fail to serve millions of semi-skilled workers**.

### Real challenges faced by the target users:
- Limited English proficiency
- Low literacy or discomfort with long text
- Mobile phones as the primary device
- Very limited time to search
- Strong trust concerns about employers and payments

This application was designed by **starting with the user’s constraints**, not assumptions.

---

## Objectives

- Help users find **nearby jobs quickly**
- Reduce reading effort using **audio and icons**
- Build trust through **verified badges & ratings**
- Deliver a **mobile-first, thumb-friendly experience**


---

## How I Approached the Problem

Instead of thinking _“What features should a job portal have?”_  
I thought of:

> **“What is the fastest, safest way for this user to get a job?”**

That led to a few guiding principles:

- **Visual over textual** – icons, chips, and badges instead of paragraphs
- **Audio-first support** – read job details aloud in the user’s language
- **Minimal decisions** – clear “best match” instead of endless lists
- **Forgiving UX** – large touch targets, simple flows, no complex forms

---

## Key UX & Product Features

### Smart Job Discovery
- Search by job title (text or voice)
- Voice search limited to 5 seconds for clarity
- Sorting by:
    - Nearby first
    - Salary (high → low / low → high)

### Audio-First Experience
- One-tap **read-out of complete job details**
- Speech adapts to selected language (English / Hindi)
- Helps users with low literacy or reading fatigue

### Multi-Language Support
- English & Hindi supported
- Language switch available at all times
- All UI, tooltips, and audio fully localized

### Trust Signals Built-In
- Verified employer badge with explanation
- Ratings shown visually
- “Best Match” highlighting to reduce decision fatigue

### 📱 Mobile-First Design
- Optimized for small screens
- Large buttons and chips
- Minimal scrolling, maximum clarity

### 📡 Offline Awareness
- Offline banner shown when internet is unavailable
- Graceful fallback using cached responses

---

## Technical Choices

| Area | Choice | Why |
|----|----|----|
| Frontend | React | Component-based, scalable UI |
| State | Redux | Predictable global state (jobs, language) |
| Styling | Tailwind CSS | Rapid, consistent, mobile-first styling |
| Animations | Framer Motion | Lightweight, smooth UX feedback |
| i18n | react-i18next | Robust localization + interpolation |
| Icons | react-icons | Visual clarity without heavy assets |
| Voice | Web Speech API | Native, no external dependency |

All decisions were made to **reduce complexity for the user**, not the developer.

---

## Challenges Solved

### Designing for Low Literacy
**Solution:**
- Replaced text-heavy layouts with icons and chips
- Added full job audio readout

### Preventing Accidental Audio
**Solution:**
- Removed card-level click-to-speak
- Explicit speaker button only

### Trust Without Overwhelming
**Solution:**
- Verified badge + tooltip explanation
- Visual trust cues instead of long disclaimers

### Voice UX on Mobile
**Solution:**
- Listening popup with countdown
- Auto-stop after 5 seconds
- Clear feedback during recording

---

## What I’m Most Proud Of

- Designing **with empathy**, not assumptions
- Building an experience that works for **non-corporate users**
- Keeping the UI **simple without being simplistic**
- Making accessibility a **core feature**, not an afterthought

This project reflects how I think about **real users, real constraints, and real impact**.



## Setup Instructions

```bash
npm install
npm start
```