# BeyondChat AI Articles Enhancer

AI Powered full-stack application for scraping, refining, and managing articles of BeyondChats Articles.

# Live Demo

Visit here : [https://chandani-beyondchat-articleenhancer.netlify.app/](https://chandani-beyondchat-articleenhancer.netlify.app/)

## Local Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Firebase project with Firestore enabled
- Google Gemini API key


### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:
   ```
   FB_PROJECT_ID=your_firebase_project_id
   FB_PRIVATE_KEY=your_firebase_private_key
   FB_CLIENT_EMAIL=your_firebase_client_email
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For development, set the environment variable (optional, defaults to production):
  # In client/.env.local
   ```bash
   VITE_ENV=/dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or similar Vite port)


## Data Flow Diagram

``` text
User → Frontend → Backend (Scrape BeyondChats Articles) → Store Raw Article in Firestore
 → Send to AI (Gemini) → Receive Optimized Content → Update Same Article in Firestore
 → Show Real-time Update in UI
```


## Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React)       │◄──►│   (Express.js)  │◄──►│   Services      │
│                 │    │                 │    │                 │
│ - Article Cards │    │ - API Routes    │    │ - BeyondChats   │
│ - Preview       │    │ - Scraping      │    │   Website       │
│ - AI Refinement │    │ - AI Processing │    │ - Gemini AI     │
└─────────────────┘    └─────────────────┘    │ - SerpAPI       │
                                              └─────────────────┘
┌─────────────────┐
│   Database      │
│   (Firestore)   │
│                 │
│ - Raw Articles  │
│ - Refined       │
│   Articles      │
└─────────────────┘
```

## API DOCUMENTATION
------------------------------------------------------------------------

### ENDPOINT 1: [GET] /fetchFromBeyond

Description: Scrapes raw blog data.
Action:      Crawls the BeyondChats blog pages.
Logic:       Filters and picks the 5 oldest articles.
Database:    Saves titles, links, and descriptions into Firestore.


### ENDPOINT 2: [POST] /refine-article

Description: AI Content Processing.
Action:      Sends article details to the Gemini AI engine.
Response:    Returns a JSON object containing:
             - SEO-optimized title
             - Full content in Markdown
             - Top-ranked Google references


### ENDPOINT 3: [POST] /save-refined

Description: Updates Database with AI content.
Action:      Matches the article in Firestore using the 'link'.
Result:      Overwrites raw data with AI-refined content.
Flag:        Sets { isRefined: true } upon success.




