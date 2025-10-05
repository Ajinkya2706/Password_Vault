# SecureVault - Password Manager

A secure password management application with client-side encryption, built for privacy-conscious users who need a simple way to store and manage credentials.

## What It Does

SecureVault helps you generate strong passwords and store them safely. Everything is encrypted on your device before being sent to the server, which means even the database only sees encrypted data.

## Key Features

- **Client-Side Encryption**: Passwords are encrypted in your browser using AES-256 before storage
- **Password Generator**: Create secure passwords with customizable options
- **Quick Copy**: Copy passwords with auto-clear after 15 seconds
- **Search & Filter**: Find credentials quickly with live search
- **Clean Interface**: Minimal black and white design focused on usability

## Technical Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Encryption**: CryptoJS for AES-256 encryption
- **Authentication**: JWT with httpOnly cookies

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)

### Installation

```bash
npm install
```

### Configuration

Create `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_minimum_32_characters
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Security Notes

- Master key never leaves your device
- Server only stores encrypted password blobs
- Encryption key derived from email + password
- JWT tokens in httpOnly cookies

## File Structure

```
password-vault/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   └── logout/
│   │   │   │       └── route.ts
│   │   │   └── vault/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── PasswordGenerator.tsx
│   │   ├── VaultList.tsx
│   │   ├── VaultItemForm.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── encryption.ts
│   │   ├── auth.ts
│   │   └── clipboard.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── VaultItem.ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

