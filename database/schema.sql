-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE user_type_enum AS ENUM ('company', 'student');
CREATE TYPE problem_status_enum AS ENUM ('active', 'closed', 'evaluation');
CREATE TYPE submission_status_enum AS ENUM ('pending', 'reviewed', 'winner', 'shortlisted', 'rejected');
CREATE TYPE transaction_type_enum AS ENUM ('purchase', 'bonus', 'used', 'refund');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type user_type_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    logo_url VARCHAR(500),
    credit_balance INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    college VARCHAR(255),
    graduation_year INTEGER,
    phone VARCHAR(20),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(500),
    bio TEXT,
    skills JSONB DEFAULT '[]',
    is_profile_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Problems table
CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    prize_amount INTEGER NOT NULL,
    deadline TIMESTAMP NOT NULL,
    status problem_status_enum DEFAULT 'active',
    category VARCHAR(100),
    tech_stack JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    anonymous_id VARCHAR(50) UNIQUE NOT NULL,
    github_repo_url VARCHAR(500) NOT NULL,
    demo_url VARCHAR(500),
    description TEXT,
    tech_used JSONB DEFAULT '[]',
    status submission_status_enum DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    UNIQUE(problem_id, student_id)
);

-- Profile unlocks table
CREATE TABLE profile_unlocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    credits_used INTEGER DEFAULT 1,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, student_id, submission_id)
);

-- Credit transactions table
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    transaction_type transaction_type_enum NOT NULL,
    credits_amount INTEGER NOT NULL,
    payment_id VARCHAR(255),
    amount_paid INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit packages table
CREATE TABLE credit_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL,
    price INTEGER NOT NULL,
    discount_percentage INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(100) NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_problems_company_id ON problems(company_id);
CREATE INDEX idx_problems_status ON problems(status);
CREATE INDEX idx_problems_deadline ON problems(deadline);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_profile_unlocks_company_id ON profile_unlocks(company_id);
CREATE INDEX idx_profile_unlocks_student_id ON profile_unlocks(student_id);
CREATE INDEX idx_credit_transactions_company_id ON credit_transactions(company_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problems_updated_at BEFORE UPDATE ON problems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
