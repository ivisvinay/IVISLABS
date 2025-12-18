export interface User {
  id: string;
  email: string;
  userType: 'company' | 'student';
}

export interface Company {
  id: string;
  user_id: string;
  company_name: string;
  industry?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  credit_balance: number;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  full_name: string;
  college?: string;
  graduation_year?: number;
  phone?: string;
  github_url?: string;
  linkedin_url?: string;
  resume_url?: string;
  bio?: string;
  skills: string[];
  is_profile_public: boolean;
  created_at: string;
}

export interface Problem {
  id: string;
  company_id: string;
  title: string;
  description: string;
  requirements?: string;
  prize_amount: number;
  deadline: string;
  status: 'active' | 'closed' | 'evaluation';
  category?: string;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
  company_name?: string;
  logo_url?: string;
  website?: string;
  submission_count?: number;
}

export interface Submission {
  id: string;
  problem_id: string;
  student_id: string;
  anonymous_id: string;
  github_repo_url: string;
  demo_url?: string;
  description?: string;
  tech_used: string[];
  status: 'pending' | 'reviewed' | 'winner' | 'shortlisted' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  problem_title?: string;
  prize_amount?: number;
  company_name?: string;
  is_unlocked?: boolean;
  student_name?: string;
  student_email?: string;
  contact_email?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  discount_percentage: number;
  is_active: boolean;
}

export interface CreditTransaction {
  id: string;
  company_id: string;
  transaction_type: 'purchase' | 'bonus' | 'used' | 'refund';
  credits_amount: number;
  payment_id?: string;
  amount_paid?: number;
  description?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface UnlockedProfile extends Student {
  email: string;
  unlocked_at: string;
  github_repo_url?: string;
  demo_url?: string;
  problem_title?: string;
}

export interface PlatformStats {
  totalProblems: number;
  totalSubmissions: number;
  totalCompanies: number;
  totalStudents: number;
  totalPrizes: number;
}

export interface LeaderboardEntry {
  id: string;
  full_name: string;
  college?: string;
  bio?: string;
  github_url?: string;
  linkedin_url?: string;
  skills: string[];
  wins: number;
  shortlisted: number;
  total_submissions: number;
  total_winnings: number;
}
