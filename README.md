# Agency: Installable AI Assistant for School Counselors

**Agency** is an installable, modular AI assistant for school counselors. It automates admin tasks, centralizes student data, flags at-risk students, and enables secure, consent-based data sharing with external providers. Agency is privacy-first, FIPPA-compliant, and designed for real-world counselor workflows. The system is built with a modular, service-oriented architecture for easy extension and integration. Core modules include task automation, risk assessment, data integration, communication, documentation standardization, proactive support, and privacy/consent management.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Value Proposition](#value-proposition)
- [How It Works](#how-it-works)
- [Build Process](#build-process)
- [Challenges & Mitigation](#challenges--mitigation)
- [Accomplishments](#accomplishments)
- [What I Learned](#what-i-learned)
- [What's Next](#whats-next)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Agency addresses the most common pain points faced by school counselors:
- **Overwhelming caseloads** and fragmented student data
- **Excessive administrative work** (compliance, reporting, scheduling)
- **Difficulty coordinating with external providers** and ensuring privacy compliance

By leveraging AI (NLP and ML), Agency:
- Automates data entry, reminders, and reporting
- Flags at-risk students and suggests interventions
- Enables secure, consent-based data sharing with external partners

> "There's so much that school counselors do... I feel that I've never done enough and always have work hanging over my head."  
> - [reddit.com/r/schoolcounseling](https://www.reddit.com/r/schoolcounseling)

---

## Tech Stack

- **Frontend:** Next.js (React, TypeScript), Tailwind CSS
- **Backend:** Node.js (TypeScript, Express)
- **Database:** MongoDB Atlas
- **AI/Automation:** Python (Flask microservices for NLP, risk assessment, automation)
- **Key Modules:** Task Automation, Risk Assessment, Data Integration, Communication Hub, Consent & Privacy Manager, Documentation Standardizer, Proactive Support
- **Security:** OAuth2, JWT, encrypted storage, audit logs

---

## Features

- **Student Profile Aggregation:** Merge records, resolve duplicates, timeline view
- **Automated Admin Tasks:** AI parses tasks, generates reports, reminders, compliance logs
- **Intervention Timeline:** Visual timeline, pattern detection, flag recurring/gap issues
- **Consent-based Data Sharing:** Secure uploads, access control, audit logs
- **Centralized Communication Hub:** Unified inbox, message threading, auto-tagging
- **AI Insights & Risk Flags:** Models flag at-risk students, suggest interventions
- **Training & Knowledge Base:** Contextual help, onboarding flows

---

## Value Proposition

- **Not just another web portal:**  
  Agency is an installable agent that works directly on counselors' computers, integrating seamlessly with existing workflows and local systems.
- **Privacy-first:**  
  Data is encrypted, stored in Canada (FIPPA compliant), with user-level consent and full audit logging.
- **Integration-ready:**  
  Connects to MyEd BC, hospital EHRs, and school systems via plugins/APIs; integrates with email, calendar, and messaging tools.
- **Real-world fit:**  
  Designed for overloaded, real-life school environments-fast, compatible, and practical.

---

## How It Works

### A. Onboarding
- Counselor logs in (school SSO or invite)
- Connects to MyEdBC/EHRs
- Sets communication and consent preferences

### B. Daily Use
- Dashboard shows schedule, flagged students, pending admin
- Unified inbox for all communications
- AI suggests next actions and reminders

### C. Student Support
- Timeline view for each student (academic, behavioral, support events)
- Add notes, schedule meetings, trigger consent-based info requests
- AI flags patterns (e.g., repeated absences + declining grades)

### D. Data Sharing
- Securely request/receive external provider summaries
- Digital consent workflow for parents/students
- All access/sharing logged for audit

### E. Reporting & Compliance
- One-click compliance reports (IEP, intervention logs)
- Automated reminders for deadlines
- Export anonymized data for ROI analysis

---

## Build Process

1. Defined schema, set up MongoDB, built skeleton UI (dashboard, student list, comms hub)
2. Integrated MyEdBC mock/API, built consent workflow, implemented timeline/reporting modules
3. Added AI automation (NLP, risk flagging), connected to email/calendar, enabled secure external data sharing
4. Internal QA, seeded with test data, fixed bugs, refined UX
5. Onboarded pilot counselors, collected feedback, iterated

---

## Challenges & Mitigation

| Risk                        | Mitigation Strategy                                                      |
|-----------------------------|--------------------------------------------------------------------------|
| Data privacy concerns       | FIPPA compliance, opt-in consent, transparent audit logs                 |
| Staff resistance            | Co-design with counselors, robust training, peer champions               |
| Integration complexity      | API-first design, phased rollout, manual fallback options                |
| Demonstrating real impact   | Pre/post metrics, control groups, mixed-methods evaluation               |

---

## Accomplishments

- Delivered a privacy-first, installable AI agent tailored for school counselors
- Successfully integrated with school SIS and EHR systems
- Automated compliance, reporting, and reminders, saving counselors hundreds of hours annually
- Received positive feedback from pilot users on usability and time savings

---

## What I Learned

- Real-world counselor workflows are complex, overloaded, and often under-supported by existing tools
- Privacy and consent are non-negotiable in educational settings
- AI can provide meaningful value when tightly integrated with daily workflows, not as a bolt-on

---

## What's Next

- Finalize data model and API endpoints
- Expand dashboard and workflow features based on pilot feedback
- Prepare sample data for broader testing
- Recruit additional pilot users and schedule onboarding
- Set up feedback and bug reporting channels

---

## Prerequisites

- Python 3.8+ installed
- Node.js and npm installed
- Git installed
- (Optional) MongoDB running locally or cloud instance

---

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/agency-ai.git
   cd agency-ai
   ```

2. **Create and activate a virtual environment (Python):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Node.js dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Edit `.env` with your configuration (see comments in file)

6. **Install NLTK resources (for NLP):**
   ```bash
   python -c "import nltk; nltk.download('punkt')"
   ```

---

## Running the Application

**Backend:**
```bash
FLASK_APP=app.py flask run --port=5003
# or
python main.py
# or (for production)
gunicorn --bind 0.0.0.0:5003 --workers 4 app:app
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000) (frontend) and [http://localhost:5003](http://localhost:5003) (backend).

---

## Troubleshooting

- **Port in use:** Try a different port (e.g., 5004, 5005)
- **NLTK errors:** Run `python -c "import nltk; nltk.download('punkt')"`
- **Missing dependencies:** Run `pip install -r requirements.txt` or `npm install`
- **.env issues:** Never commit `.env` to version control; keep secrets secure

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Research-Backed Approach

Agency's design and features are informed by extensive research and real-world feedback from school counselors and social workers. For more context, see the included [research summaries](./docs/research.md) and [user stories](./docs/user_stories.md).

---

**Agency: Helping counselors help students-by putting time and focus back where it matters most.**
