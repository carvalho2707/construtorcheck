# ObraReview

A Portuguese construction company review platform that helps homeowners find reliable builders and contractors across Portugal.

## Features

- **Multi-dimensional Rating System** - Rate companies across 6 categories: Work Quality, Meeting Deadlines, Communication, Problem Resolution, Value for Money, and Professionalism
- **Radar Chart Visualization** - Visual breakdown of company ratings across all dimensions
- **Smart Company Status** - Automatic status calculation (Recommended, Neutral, Problems, Avoid) based on average ratings
- **Photo Reviews** - Upload photos with automatic compression to document work quality
- **Anonymous Reviews** - Option to submit reviews anonymously
- **Real-time Search** - Fast company search with debouncing
- **District Filtering** - Filter companies by Portuguese districts (including Azores and Madeira)
- **Work Category Filters** - Filter by construction type (New Build, Renovation, Plumbing, Electrical, etc.)
- **Helpfulness Voting** - Vote on reviews to surface the most useful feedback
- **Company Responses** - Companies can respond to reviews

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom editorial design system
- **Backend**: Firebase (Authentication, Firestore, Storage, Hosting)
- **State Management**: Zustand (global), React Context (auth)
- **Forms**: React Hook Form + Zod validation
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/obrareview.git
   cd obrareview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Fill in your Firebase configuration in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Firebase Setup

1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication providers:
   - Google Sign-In
   - Email/Password
3. Create a Firestore database
4. Create a Storage bucket
5. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample data |
| `firebase deploy` | Deploy to Firebase Hosting |

## Project Structure

```
src/
├── components/
│   ├── auth/          # Login, signup modals, user menu
│   ├── companies/     # Company cards, lists, search, filters
│   ├── layout/        # Header, footer, page wrapper
│   ├── reviews/       # Star ratings, review cards, photo upload
│   └── ui/            # Base UI primitives (Button, Input, Modal, etc.)
├── context/           # React Context providers
├── lib/               # Firebase configuration and helpers
├── pages/             # Route components
├── store/             # Zustand store
├── types/             # TypeScript interfaces
└── utils/             # Constants, calculations, validation
```

## Data Model

### Companies
- Company profiles with location, categories, and aggregated ratings
- Auto-calculated status based on average rating

### Reviews
- User reviews with 6-dimension ratings
- Support for photos, anonymous posting, and company responses

### Users
- User profiles linked to Firebase Auth

### Votes
- Helpfulness votes on reviews

## Design System

The app uses a warm, editorial design inspired by magazine aesthetics:

- **Typography**: Fraunces (display serif) + DM Sans (body)
- **Primary Color**: Terracotta (#C45D3A)
- **Background**: Cream tones
- **Accents**: Sand and olive

### Status Colors
| Status | Meaning | Rating Range |
|--------|---------|--------------|
| Recommended | Excellent track record | ≥ 4.0 |
| Neutral | Mixed reviews | 2.5 - 4.0 |
| Problems | Notable issues reported | 1.5 - 2.5 |
| Avoid | Serious concerns | < 1.5 |

## Rating Categories

1. **Qualidade do Trabalho** - Work Quality
2. **Cumprimento de Prazos** - Meeting Deadlines
3. **Comunicacao** - Communication
4. **Resolucao de Problemas** - Problem Resolution
5. **Qualidade/Preco** - Value for Money
6. **Profissionalismo** - Professionalism

## License

MIT