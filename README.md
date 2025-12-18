# Problem Solving Platform

A full-stack competitive coding platform where companies post challenges with cash prizes and students submit anonymous solutions to showcase their skills.

## Features

### For Students
- Browse coding challenges from top companies with real cash prizes (₹15,000 - ₹50,000+)
- Submit anonymous solutions via GitHub repositories
- Get discovered by companies based on code quality, not background
- Win prizes and get hired by top companies
- Track submission status and receive real-time notifications
- Build your public portfolio and appear on the leaderboard

### For Companies
- Post coding challenges with custom requirements and prize amounts
- Review anonymous submissions without bias
- Select winners and shortlist candidates
- Unlock student profiles (costs 1 credit per unlock)
- Get 5 free credits on signup + 2 bonus credits per problem posted
- Purchase credit packages for profile unlocks
- Direct access to talented developers

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with proper schema and indexes
- **Authentication**: JWT + bcrypt for secure password hashing
- **File Storage**: AWS S3 for resume/logo uploads
- **Payments**: Razorpay integration for credit purchases
- **Email**: SendGrid for transactional emails
- **Real-time**: Socket.io for live notifications
- **Logging**: Winston for structured logging

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Heroicons, React Hot Toast

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database Migrations**: Custom migration scripts
- **Seed Data**: Sample companies, problems, and students

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/          # Database, logger configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # (TypeScript types)
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # S3, email, payment, notification services
│   │   ├── utils/           # JWT, errors, helpers
│   │   └── server.ts        # Express app entry point
│   ├── migrations/          # Database schema migrations
│   ├── seeds/               # Sample data seeders
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client, socket, auth
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript interfaces
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── database/
│   └── schema.sql           # PostgreSQL schema
├── docker-compose.yml
├── package.json             # Root package.json
└── README.md
```

## Database Schema

### Core Tables
- **users**: Authentication and user type (company/student)
- **companies**: Company profiles with credit balance
- **students**: Student profiles with skills and resume
- **problems**: Coding challenges with prizes and deadlines
- **submissions**: Anonymous student submissions
- **profile_unlocks**: Track which profiles companies have unlocked
- **credit_transactions**: Credit purchase and usage history
- **credit_packages**: Available credit packages for purchase
- **notifications**: Real-time user notifications

See `database/schema.sql` for complete schema with indexes and triggers.

## Setup Instructions

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Docker & Docker Compose (optional but recommended)
- AWS Account (for S3 file uploads)
- Razorpay Account (for payment processing)
- SendGrid Account (for emails)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IVISLABS
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your credentials

   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with API URL
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec backend npm run migrate
   ```

5. **Seed the database with sample data**
   ```bash
   docker-compose exec backend npm run seed
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Health Check: http://localhost:3000/health

### Option 2: Local Setup

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Set up PostgreSQL database**
   ```bash
   createdb problem_solving_platform
   ```

3. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit both .env files with your credentials
   ```

4. **Run migrations**
   ```bash
   cd backend
   npm run migrate
   ```

5. **Seed database**
   ```bash
   npm run seed
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/problem_solving_platform

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=problem-solving-platform
AWS_REGION=ap-south-1

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@platform.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

## Test Accounts

After seeding the database, you can login with these accounts:

**Company Accounts:**
- Email: `contact@ivislabs.com`, Password: `password123`
- Email: `hr@techcorp.in`, Password: `password123`

**Student Accounts:**
- Email: `john.doe@student.com`, Password: `student123`
- Email: `jane.smith@student.com`, Password: `student123`

## API Documentation

### Authentication Endpoints

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
GET    /api/auth/me          - Get current user
```

### Problem Management

```
POST   /api/problems              - Create problem (company only)
GET    /api/problems              - List problems
GET    /api/problems/:id          - Get problem details
PUT    /api/problems/:id          - Update problem
DELETE /api/problems/:id          - Delete problem
PUT    /api/problems/:id/close    - Close problem
GET    /api/problems/:id/submissions - Get submissions (company)
```

### Submission Management

```
POST   /api/submissions           - Submit solution (student)
GET    /api/submissions           - List own submissions
GET    /api/submissions/:id       - Get submission
PUT    /api/submissions/:id       - Update submission
DELETE /api/submissions/:id       - Delete submission
PUT    /api/submissions/:id/review - Review submission (company)
POST   /api/submissions/:id/unlock - Unlock profile (company)
```

### Company Routes

```
GET    /api/companies/profile         - Get company profile
PUT    /api/companies/profile         - Update profile
POST   /api/companies/profile/logo    - Upload logo
GET    /api/companies/credits         - Get credit balance
GET    /api/companies/transactions    - Get transactions
GET    /api/companies/unlocked-profiles - Get unlocked profiles
```

### Student Routes

```
GET    /api/students/profile          - Get student profile
PUT    /api/students/profile          - Update profile
POST   /api/students/profile/resume   - Upload resume
GET    /api/students/notifications    - Get notifications
```

### Credit Management

```
GET    /api/credits/packages          - Get credit packages
POST   /api/credits/purchase          - Create purchase order
POST   /api/credits/verify            - Verify payment
```

### Public Routes

```
GET    /api/public/problems           - Browse all problems
GET    /api/public/problems/:id       - View problem
GET    /api/public/submissions        - Browse solutions
GET    /api/public/leaderboard        - Top students
GET    /api/public/stats              - Platform statistics
```

## Key Features Implementation

### Anonymous Submission System
- When students submit, a unique anonymous ID is generated (e.g., "Student_A47B2C")
- Companies see only anonymous IDs until they unlock profiles
- Ensures unbiased evaluation based on code quality

### Credit System
- Companies get 5 free credits on signup
- 2 bonus credits awarded when posting a problem
- 1 credit required to unlock each student profile
- Purchase credit packages via Razorpay

### Profile Unlock Flow
1. Company views anonymous submission
2. Clicks "Unlock Profile" button
3. System checks credit balance
4. Deducts 1 credit from company
5. Creates unlock record
6. Sends notification to student
7. Reveals student's full profile (name, email, phone, resume, etc.)

### Real-time Notifications
- Socket.io connection established on login
- Students receive instant notifications for:
  - Profile unlocks by companies
  - Winner announcements
  - Submission reviews
- Notification bell shows unread count

### Payment Integration (Razorpay)
1. Company selects credit package
2. Backend creates Razorpay order
3. Frontend displays Razorpay checkout
4. On payment success, signature is verified
5. Credits added to company account
6. Transaction recorded in database

## Production Deployment Checklist

- [ ] Set strong JWT_SECRET
- [ ] Configure production DATABASE_URL
- [ ] Set up AWS S3 bucket with proper CORS
- [ ] Configure Razorpay production keys
- [ ] Set up SendGrid with verified sender
- [ ] Enable HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Configure rate limiting
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure backup strategy for database
- [ ] Set up CI/CD pipeline
- [ ] Review and tighten CORS settings
- [ ] Enable database connection pooling
- [ ] Set up logging aggregation

## Development Tips

### Running Migrations
```bash
cd backend
npm run migrate
```

### Running Seeders
```bash
cd backend
npm run seed
```

### Viewing Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuilding Containers
```bash
docker-compose down
docker-compose up --build
```

### Database Access
```bash
docker-compose exec postgres psql -U postgres -d problem_solving_platform
```

## Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt (10 salt rounds)
- Rate limiting on authentication endpoints
- SQL injection prevention via parameterized queries
- CORS configuration
- Input validation on all endpoints
- Razorpay payment signature verification
- Secure file upload with S3 pre-signed URLs

## Performance Optimizations

- Database indexes on foreign keys and frequently queried fields
- Connection pooling for PostgreSQL
- Pagination on all list endpoints (20 items per page)
- Lazy loading for images and components
- Code splitting for frontend bundles
- Efficient Socket.io room management

## Support & Contributions

For issues, feature requests, or contributions, please open an issue or submit a pull request.

## License

MIT License

---

Built with ❤️ for connecting talented students with innovative companies.
