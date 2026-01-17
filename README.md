# SkillSwap - Skill Exchange Platform

SkillSwap is a modern web application designed to facilitate peer-to-peer skill exchange. Users can teach skills they master and learn new ones from others in a time-banking system.

![SkillSwap Banner](https://via.placeholder.com/800x200?text=SkillSwap+Platform)

## 🚀 Features

### Phase 1: Core Foundation
-   **User Authentication**: Simulated login/registration with profile management.
-   **Dashboard**: Overview of user stats (Tokens, Level) and upcoming sessions.
-   **Profile System**: Detailed profiles with skills, bio, and reviews.

### Phase 2: Core Interactions
-   **Matching System**: Search and filter skills by category.
-   **Session Management**: Book, view, and cancel teaching/learning sessions.
-   **Token Economy**: Wallet system to track earnings and spending.
-   **Real-time Chat**: Messaging system to coordinate with mentors (simulated).

### Phase 3: Engagement & Analytics
-   **Gamification**: XP system, Levels (e.g., Novice, Expert), and Achievement Badges.
-   **Notifications**: Real-time alerts for messages and session updates.
-   **Analytics Dashboard**: Visual insights into earnings, teaching hours, and sessions.

## 🛠️ Tech Stack

-   **Framework**: [React 18](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Utilities**: `clsx`, `tailwind-merge`, `date-fns`

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/skill-swap.git
    cd skill-swap
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start development server**
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── features/       # Feature-specific components (Chat, Wallet, Gamification)
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/             # Core UI elements (Button, Card, Input)
├── pages/              # Main route pages
├── services/           # API mock services
├── store/              # Zustand state stores
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

## 🧪 Verification

-   run `npx tsc` to verify TypeScript types.
-   run `npm run lint` for code quality checks.
-   run `npm run build` to create a production-ready build.

## 📝 License

This project is licensed under the MIT License.
