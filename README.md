# Family Information System

A comprehensive Family Information System built using the MERN stack (MongoDB, Express, React, Node.js) with JWT authentication and role-based access control.

## Features

- **Interactive Family Tree**: Visual representation with circular profile images and connecting SVG lines
- **Landing Page**: Beautiful hero section with smooth scroll to family tree
- **Authentication & Authorization**: JWT-based auth with role-based permissions
- **Profile Management**: 
  - Regular users can edit their own profiles
  - Admin users (Mother and Father) can edit all profiles and navigate between them
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Social Media Integration**: Display and link to Facebook, Instagram, and Twitter/X profiles
- **Smooth Animations**: Hover effects, reveal animations, and transitions

## Project Structure

```
family-info-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── familyController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── family.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FamilyTree.jsx
│   │   │   ├── FamilyMemberCircle.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── ProfileModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── AuthForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Tech Stack

### Backend
- **Node.js** & **Express**: Server and API
- **MongoDB** & **Mongoose**: Database and ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router**: Routing
- **Axios**: HTTP client
- **Context API**: State management

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/family-info-system
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Seeding Sample Data (Optional)

To populate the database with sample family members:

```bash
npm run seed
```

This will create:
- 2 Admin users (Father and Mother)
- 5 Member users (Children)

**Default credentials:**
- Father: `john@aguasan.com` / `password123`
- Mother: `maria@aguasan.com` / `password123`
- Children: `[name]@aguasan.com` / `password123`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new family member
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current logged-in user (Protected)

### Family
- `GET /api/family` - Get all family members (Public)
- `GET /api/family/:id` - Get single family member (Public)
- `PUT /api/family/:id` - Update family member (Protected, role-based)

## User Roles

### Admin
- Can edit all family member profiles
- Navigate between profiles in the profile modal
- Typically assigned to Mother and Father

### Member
- Can only edit their own profile
- View all other family member profiles

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/member),
  familyRole: String (Father/Mother/Son/Daughter),
  profileImage: String (URL),
  bio: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  },
  position: {
    row: Number,
    order: Number
  },
  createdAt: Date
}
```

## Usage

1. **Register**: Create an account with your family role (Father, Mother, Son, or Daughter)
2. **Login**: Sign in with your email and password
3. **View Family Tree**: Browse the interactive family tree on the home page
4. **View Profiles**: Click on any family member circle to view their profile
5. **Edit Profile**: 
   - Regular users: Click "Edit Profile" button on your own profile
   - Admin users: Navigate to any profile and edit

## Features in Detail

### Landing Page
- Full-screen hero section with gradient background
- Large title "The Aguasan Family"
- Descriptive text
- "View Our Family Tree" button with smooth scroll
- Animated scroll indicator

### Family Tree
- Top row: Father and Mother with heart icon between them
- Second row: Children (Sons and Daughters)
- SVG lines connecting parents to children
- Hover effects with scale transformation
- Smooth reveal animations
- Responsive layout (stacks vertically on mobile)

### Profile Modal
- Display profile picture, name, and family role
- Show biography and social media links
- Edit mode with form inputs
- Admin navigation bar to switch between profiles
- Success/error messages
- Loading states

## Development

### Backend Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend Scripts
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Security

- **Password Security**: Passwords are hashed using bcryptjs with salt rounds
- **Authentication**: JWT tokens for stateless authentication
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access Control**: Admin and member roles with specific permissions
- **Rate Limiting**: 
  - General API routes: 100 requests per 15 minutes per IP
  - Auth routes: 5 login/register attempts per 15 minutes per IP
- **CORS Protection**: Configurable origin restriction for production
- **Input Validation**: Both frontend and backend validation
- **Error Handling**: Comprehensive error handling with proper status codes
- **ReDoS Protection**: Safe email regex pattern to prevent Regular Expression Denial of Service

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Family photos from Unsplash
- Icons and emojis for social media links
- Tailwind CSS for styling utilities

