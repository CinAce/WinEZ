# WinEZ - Gaming Strategy Platform

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple.svg)

WinEZ is a competitive gaming strategy platform that connects players with expert coaches to improve their skills in popular fighting games and competitive titles. The platform features video tutorials, personalized strategies, and direct coach-to-player communication.

## Supported Games

- **Tekken 8** - Featured characters: Armor King, Nina Williams, King, Bryan Fury, Lee Chaolan, Kazuya, and more
- **Street Fighter 6** - Featured characters: Ryu, Chun-Li
- **Madden 26** - Team-specific strategies
- **Guilty Gear Strive** (Coming Soon)
- **Fatal Fury: City of the Wolves** (Coming Soon)

## Features

### For Players
- **Video Strategy Guides** - Watch detailed tutorials on character-specific techniques
  - Counter-hit (CH) setups
  - Whiff punishing
  - Frame traps
  - Command inputs
- **Personalized Learning** - Browse strategies filtered by game and character
- **Direct Coach Messaging** - Send messages to coaches for personalized guidance
- **Favorites System** - Save your favorite strategies for quick access
- **User Authentication** - Secure account system with role-based access

### For Coaches
- **Content Management** - Upload and manage strategy videos
- **Inbox System** - Receive and respond to player messages
- **Profile Pages** - Showcase rank achievements and expertise
- **Special Invite System** - Exclusive coach registration with invite code

### Technical Features
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Video Auto-play** - Intersection Observer API for smart video playback
- **Timestamp Navigation** - Jump to specific sections within tutorial videos
- **Local Storage Persistence** - Save user data, favorites, and messages locally
- **Modern UI/UX** - Cyberpunk/gaming-inspired design with aurora effects

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CinAce/ITC320Project.git
   cd ITC320Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
itc320project/
├── public/               # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/          # Images, videos, and GIFs
│   ├── components/      # Reusable React components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── data/            # Game and character data
│   │   └── games.js
│   ├── pages/           # Route components
│   │   ├── Home.jsx
│   │   ├── Games.jsx
│   │   ├── Strategies.jsx
│   │   ├── StrategyDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Favorites.jsx
│   │   ├── Inbox.jsx
│   │   ├── UserMessages.jsx
│   │   ├── Team.jsx
│   │   └── Logout.jsx
│   ├── styles/          # CSS stylesheets
│   │   └── styles.css
│   ├── utils/           # Utility functions
│   │   └── auth.js      # Authentication logic
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── eslint.config.js
├── vite.config.js
└── package.json
```

## Authentication System

The platform uses a role-based authentication system stored in browser localStorage:

### User Roles
- **User** - Standard player account with access to strategies and messaging
- **Coach** - Elevated account with access to inbox and content management

### Creating Accounts

**Standard User:**
1. Navigate to `/signup`
2. Enter username (min 3 characters) and password (min 3 characters)
3. Click "Create Account"

**Coach Account:**
1. Navigate to `/signup`
2. Enter username and password
3. Enter the coach invite code: `MAKECOACH2025`
4. Click "Create Account"

### Authentication Functions

Located in `src/utils/auth.js`:
- `registerUser(username, password, inviteCode)` - Create new accounts
- `loginUser(username, password)` - Authenticate existing users
- `getCurrentUser()` - Get current logged-in user
- `logoutUser()` - Clear session
- `promoteUser(username, newRole)` - Change user roles

## Key Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with platform overview |
| `/games` | Games | Browse supported games |
| `/strategies` | Strategies | View all character strategies |
| `/strategy/:game/:name` | StrategyDetail | Detailed strategy with videos |
| `/contact` | Contact | Message coaches |
| `/login` | Login | User login |
| `/signup` | Signup | User registration |
| `/favorites` | Favorites | Saved strategies (requires login) |
| `/messages` | UserMessages | Sent messages (requires login) |
| `/inbox` | Inbox | Received messages (coaches only) |
| `/team` | Team | Meet the coaches |
| `/logout` | Logout | End session |

## Video Strategy System

Strategies include sectioned video tutorials with timestamps:

```javascript
videos: [
  {
    section: "CH Setups",
    videoFile: armorKingGuide,
    timestamp: 0,
    explanation: "Baiting opponent into pressing a button..."
  },
  {
    section: "Whiff Punishes",
    videoFile: armorKingGuide,
    timestamp: 22,
    explanation: "Spacing opponent and then hitting them..."
  }
]
```

Users can click section buttons to jump to specific timestamps in the video.

## Data Storage

The application uses browser localStorage for data persistence:

- **users** - User accounts and credentials
- **currentUser** - Active session data
- **favorites** - User's favorited strategies
- **messages** - All platform messages

## Design & Styling

- Custom CSS with cyberpunk/gaming aesthetic
- Neon green (`#00ff0d`) accent color
- Aurora gradient backgrounds
- Responsive grid layouts
- Smooth transitions and hover effects
- Video auto-play with Intersection Observer

## Technologies Used

- **React 19.1.1** - UI framework
- **React Router DOM 7.9.5** - Client-side routing
- **Vite 7.1.7** - Build tool and dev server
- **ESLint** - Code linting
- **LocalStorage API** - Data persistence
- **Intersection Observer API** - Video auto-play

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Team

- **Adams (CinAce)** - Tekken God Supreme - Armor King, King, Lee specialist
- **Shannon (JoshDKilla)** - Kishin rank - Nina Williams specialist
- **Gill (ZayThaActivist)** - Tekken King - Bryan Fury specialist

## Contributing

This is a class project for ITC320. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is created for educational purposes as part of ITC320 coursework.

## Known Issues

- Video files are currently stored locally in the assets folder
- No backend server - all data stored in localStorage
- Messages are not persistent across different browsers/devices

## Future Enhancements

- Backend API integration
- Database for user accounts and messages
- Video streaming from CDN
- Live coaching sessions
- Tournament brackets and rankings
- Payment integration for premium coaching
- More games and characters
- Social features (friend lists, match replays)

## Contact

Project Link: [https://github.com/CinAce/ITC320Project](https://github.com/CinAce/ITC320Project)
