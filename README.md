CIS 4120 Final Project
Gordon Chen, Fiona Herzog, Michael Pignatelli

Lifeline is a healthcare management web application that allows users to manage their healthcare activities. It consolidates medications, lab results, and medica apointments into a single chronological timeline interface with AI-powered assistance. 

Frontend:
Backend: 
AI Integration: Google Gemini 2.5 Flash Lite

Key Features: 

## Standalone demo pages

For customer demos, each core feature is available as its own runnable page:

- Chatbot: open `/chatbot.html`
- Tabs (Timeline / Calendar / Summary): open `/tabs.html`
- Add Entry: open `/add-entry.html`

Run locally:

1) Start the API server (required for the chatbot demo):
   - `node server/index.cjs`
   - Optionally set `GEMINI_API_KEY` in your environment for live AI responses.

2) Start the frontend:
   - `npm install`
   - `npm run dev`
   - Then visit:
     - Chatbot: `http://localhost:5173/chatbot.html`
     - Tabs: `http://localhost:5173/tabs.html`
     - Add Entry: `http://localhost:5173/add-entry.html`

Build output will include these pages as separate entries.

