CIS 4120 Final Project
Gordon Chen, Fiona Herzog, Michael Pignatelli

Lifeline is a healthcare management web application that allows users to manage their healthcare activities. It consolidates medications, lab results, and medical apointments into a single chronological timeline interface with AI-powered assistance. 

Frontend: React application built with Typescript, TailwindCSS
Backend: we will not be making a true backend
AI Integration: Google Gemini 2.5 Flash Lite

Key Features: 

## Demo Pages

### Requirements
- A `.env` file in the project root with your Gemini key:

```bash
GEMINI_API_KEY=api_key_here
```

To run the demo locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2. **In a second terminal**:
   PORT=3001 node server/index.cjs

3.  **Start the Dev Server**:
    ```bash
    npm run dev
    ```

4.  **View the Pages**:
    Once the server is running, you can access the different demo pages at the following URLs:
    -   **Hello World (Main App)**: `http://localhost:5173/`
    -   **Hello Styles (Style Guide)**: `http://localhost:5173/styles.html`
    -   **Add Entry Demo**: `http://localhost:5173/add-entry.html`
    -   **Chatbot Demo**: `http://localhost:5173/chatbot.html`

**Expected Output**:
   - **Hello World:** basic app demonstrating three tab view.
   - **Hello Styles:** displays brand colors and typography.  
   - **Add Entry Demo:** adding an entry immediately updates the timeline.
   - **Chatbot Demo:** AI assistant replies to questions using sample health entries.
