# Family Information System - Features Documentation

## Overview
This document provides detailed information about the features implemented in the Family Information System.

## 1. Landing Page

### Features
- **Hero Section**: Full-screen welcome page with gradient background
- **Family Title**: Large, prominent "The Aguasan Family" heading
- **Description**: Welcoming text explaining the purpose of the site
- **Call-to-Action Button**: "View Our Family Tree" button with hover effects
- **Smooth Scroll**: Clicking the button smoothly scrolls to the family tree section
- **Animated Scroll Indicator**: Bouncing arrow at the bottom indicating more content below

### Technical Details
- Responsive design adapting to all screen sizes
- CSS animations for fade-in effects
- Smooth scroll behavior using JavaScript

## 2. Family Tree

### Visual Layout
```
        [Father]  ❤️  [Mother]
              |
      ________________________
      |    |    |    |    |
   [Son] [Daughter] [Son] [Daughter] [Son]
```

### Features
- **Parent Row**: 
  - Circular profile images for Father and Mother
  - Heart icon (❤️) positioned between them
  - Hover effects with scale transformation
  
- **Children Row**: 
  - Up to 5 circular profile images for children
  - Arranged in a horizontal line below parents
  - Hover effects on each circle
  
- **SVG Connections**: 
  - Vertical line from parents to horizontal connection line
  - Horizontal line connecting all children
  - Vertical lines from horizontal line to each child
  - Lines hidden on mobile for better layout

### Interactive Elements
- **Clickable Profiles**: Click any family member to view their profile
- **Hover Effects**: Circles scale up and shadow increases on hover
- **Animations**: Fade-in-up animation when tree loads

## 3. Profile Modal

### View Mode
- **Profile Image**: Large circular profile picture
- **Name**: Full name of the family member
- **Family Role**: Father, Mother, Son, or Daughter
- **Biography**: Personal description
- **Social Media Links**: 
  - Facebook (📘)
  - Instagram (📷)
  - Twitter/X (🐦)
  - Each link opens in a new tab

### Edit Mode (Authorized Users)
- **Editable Fields**:
  - Name
  - Profile Image URL
  - Biography (textarea)
  - Facebook URL
  - Instagram URL
  - Twitter/X URL
  
- **Form Validation**: URL and text validation
- **Save/Cancel Buttons**: Clearly labeled action buttons
- **Success/Error Messages**: Feedback on submission

### Admin Features
- **Navigation Bar**: List of all family members to quickly switch between profiles
- **Edit Any Profile**: Admins can edit all family member profiles
- **Current Profile Highlight**: Active profile highlighted in navigation

### Regular User Features
- **Edit Own Profile Only**: Members can only edit their own profile
- **View All Profiles**: Can view any family member's profile

## 4. Authentication System

### Login Page
- **Email Input**: Validated email format
- **Password Input**: Masked password field
- **Login Button**: Submits credentials
- **Registration Link**: Navigate to registration page
- **Error Messages**: Display login errors

### Registration Page
- **Required Fields**:
  - Name
  - Email (validated)
  - Password (minimum 6 characters)
  - Family Role (Father, Mother, Son, Daughter)
  - User Role (Admin or Member)
  - Position (Row and Order for tree placement)
  
- **Form Validation**: Client-side and server-side validation
- **Success Redirect**: Automatic login and redirect on success

### Security Features
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Token Storage**: localStorage for token persistence
- **Auto-logout**: Token validation on protected routes

## 5. Navigation Bar

### Features
- **Fixed Position**: Stays at top of page while scrolling
- **Logo/Title**: "Aguasan Family" clickable to return home
- **User Status Display**:
  - When logged out: Login and Register buttons
  - When logged in: "Welcome, [Name]" and Logout button
  
- **Responsive**: Adapts to mobile screens

## 6. API Endpoints

### Authentication Endpoints
```
POST /api/auth/register - Create new user account
POST /api/auth/login    - Login with credentials
GET  /api/auth/me       - Get current user info (protected)
```

### Family Endpoints
```
GET  /api/family     - Get all family members (public)
GET  /api/family/:id - Get single member (public)
PUT  /api/family/:id - Update member (protected, role-based)
```

## 7. Role-Based Permissions

### Admin Role (Mother & Father)
✅ View all profiles
✅ Edit all profiles
✅ Navigate between profiles in modal
✅ Access all features

### Member Role (Children)
✅ View all profiles
✅ Edit own profile only
❌ Cannot edit other profiles
✅ View-only for other family members

## 8. Responsive Design

### Desktop (> 768px)
- Full family tree with SVG connecting lines
- Side-by-side layout elements
- Larger profile images (128px)
- Horizontal children arrangement

### Tablet (768px - 1024px)
- Adjusted spacing
- Medium profile images (96px)
- Responsive padding and margins

### Mobile (< 768px)
- Vertical stacking of family tree
- Hidden SVG connecting lines
- Smaller profile images (96px)
- Touch-optimized buttons
- Full-width forms

## 9. Loading States

### Family Tree Loading
- Animated spinning loader
- "Loading Family Tree..." message
- Centered on screen
- Gradient background maintained

### Form Submissions
- Disabled buttons during submission
- "Processing..." text feedback
- Loading indicators

## 10. Error Handling

### Network Errors
- Error message display
- "Try Again" button
- User-friendly error descriptions
- Console logging for debugging

### Form Errors
- Validation error messages
- Field-specific error highlights
- Server error message display
- Clear error descriptions

## 11. Animations & Transitions

### CSS Animations
- `fadeIn`: 1 second fade-in effect
- `fadeInUp`: 0.6 second fade-in with upward motion
- `pulse`: Heart icon pulsing animation
- `bounce`: Scroll indicator bouncing
- `spin`: Loading spinner rotation

### Hover Transitions
- Scale transformation on profile circles
- Button color changes
- Shadow increases
- Smooth 300ms transitions

## 12. Security Features

### Rate Limiting
- **General API**: 100 requests per 15 minutes
- **Auth Endpoints**: 5 attempts per 15 minutes
- **IP-Based**: Per IP address tracking

### Input Security
- Email regex validation (ReDoS-safe)
- Password minimum length (6 characters)
- SQL injection prevention (Mongoose)
- XSS prevention (React)

### Network Security
- CORS origin restriction
- JWT token expiration (30 days)
- Password hashing (bcryptjs)
- HTTPS recommended for production

## 13. Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6),
  role: String (admin/member),
  familyRole: String (Father/Mother/Son/Daughter),
  profileImage: String (URL, default placeholder),
  bio: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  },
  position: {
    row: Number (required),
    order: Number (required)
  },
  createdAt: Date
}
```

## Sample Data

The seed script creates 7 family members:
- **John Aguasan** (Father, Admin) - Row 1, Order 1
- **Maria Aguasan** (Mother, Admin) - Row 1, Order 2
- **Michael Aguasan** (Son, Member) - Row 2, Order 1
- **Sarah Aguasan** (Daughter, Member) - Row 2, Order 2
- **David Aguasan** (Son, Member) - Row 2, Order 3
- **Emily Aguasan** (Daughter, Member) - Row 2, Order 4
- **James Aguasan** (Son, Member) - Row 2, Order 5

All accounts use `password123` as the default password.

## Technology Stack

### Backend
- Node.js v14+
- Express.js v5
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-rate-limit
- CORS

### Frontend
- React 18
- Vite (build tool)
- Tailwind CSS v3
- React Router v6
- Axios
- Context API

## Performance Optimizations

- Vite for fast builds and hot module replacement
- Code splitting with React Router
- CSS purging with Tailwind
- Optimized images (external CDN)
- Gzip compression ready
- Lazy loading components

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML elements
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Responsive text sizing
