import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // Seed credit packages
    console.log('Adding credit packages...');
    await pool.query(`
      INSERT INTO credit_packages (name, credits, price, discount_percentage, is_active)
      VALUES
        ('Starter Pack', 20, 800000, 20, true),
        ('Professional Pack', 50, 1800000, 28, true),
        ('Enterprise Pack', 100, 3000000, 40, true)
      ON CONFLICT DO NOTHING
    `);

    // Create sample company users
    console.log('Creating sample companies...');
    const companyPassword = await bcrypt.hash('password123', 10);

    const company1 = await pool.query(`
      INSERT INTO users (email, password_hash, user_type)
      VALUES ('contact@ivislabs.com', $1, 'company')
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `, [companyPassword]);

    await pool.query(`
      INSERT INTO companies (user_id, company_name, industry, website, description, credit_balance)
      VALUES ($1, 'IVIS LABS', 'Industrial IoT & Automation', 'https://ivislabs.com',
              'Leading provider of industrial IoT solutions and CNC machine monitoring systems', 10)
      ON CONFLICT (user_id) DO UPDATE SET company_name = EXCLUDED.company_name
    `, [company1.rows[0].id]);

    const company2 = await pool.query(`
      INSERT INTO users (email, password_hash, user_type)
      VALUES ('hr@techcorp.in', $1, 'company')
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `, [companyPassword]);

    await pool.query(`
      INSERT INTO companies (user_id, company_name, industry, website, description, credit_balance)
      VALUES ($1, 'TechCorp India', 'Software Development', 'https://techcorp.in',
              'Innovative software solutions for modern businesses', 5)
      ON CONFLICT (user_id) DO UPDATE SET company_name = EXCLUDED.company_name
    `, [company2.rows[0].id]);

    // Get company IDs
    const ivis = await pool.query('SELECT id FROM companies WHERE company_name = $1', ['IVIS LABS']);
    const techcorp = await pool.query('SELECT id FROM companies WHERE company_name = $1', ['TechCorp India']);

    // Create sample problems
    console.log('Creating sample problems...');
    const deadline1 = new Date();
    deadline1.setDate(deadline1.getDate() + 30);

    const deadline2 = new Date();
    deadline2.setDate(deadline2.getDate() + 45);

    const deadline3 = new Date();
    deadline3.setDate(deadline3.getDate() + 60);

    await pool.query(`
      INSERT INTO problems (company_id, title, description, requirements, prize_amount, deadline, status, category, tech_stack)
      VALUES
        ($1, 'Build a CNC Machine Monitoring Dashboard',
         'Create a real-time dashboard for monitoring CNC machines in a factory. The dashboard should display machine status, production metrics, downtime alerts, and historical data visualization.',
         'Requirements:\n- Real-time data visualization\n- Support for multiple machines\n- Alert system for machine failures\n- Historical data analysis\n- Responsive design for mobile and desktop\n- Authentication and role-based access',
         25000, $2, 'active', 'IoT & Monitoring',
         '["React", "Node.js", "WebSocket", "Chart.js", "PostgreSQL"]'),

        ($3, 'Design a Real-time Visitor Management System',
         'Build a comprehensive visitor management system for corporate offices. Include visitor registration, badge printing, host notification, and visitor tracking.',
         'Requirements:\n- Visitor pre-registration and walk-in registration\n- QR code badge generation\n- SMS/Email notifications to hosts\n- Visitor log and analytics\n- Photo capture integration\n- Multi-location support',
         15000, $4, 'active', 'Web Application',
         '["React", "TypeScript", "Express", "MongoDB", "Twilio"]'),

        ($1, 'Create an AI-powered Student Performance Analytics Tool',
         'Develop an analytics platform that uses AI to analyze student performance data and provide insights to educators. Include predictive analytics for identifying at-risk students.',
         'Requirements:\n- Data import from various sources\n- AI/ML models for performance prediction\n- Interactive dashboards and reports\n- Student performance trends\n- Automated recommendations\n- Export functionality',
         30000, $5, 'active', 'AI & Analytics',
         '["Python", "React", "TensorFlow", "FastAPI", "PostgreSQL", "D3.js"]')
      ON CONFLICT DO NOTHING
    `, [ivis.rows[0].id, deadline1.toISOString(), techcorp.rows[0].id, deadline2.toISOString(), ivis.rows[0].id, deadline3.toISOString()]);

    // Create sample student users
    console.log('Creating sample students...');
    const studentPassword = await bcrypt.hash('student123', 10);

    const student1 = await pool.query(`
      INSERT INTO users (email, password_hash, user_type)
      VALUES ('john.doe@student.com', $1, 'student')
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `, [studentPassword]);

    await pool.query(`
      INSERT INTO students (user_id, full_name, college, graduation_year, phone, github_url, linkedin_url, bio, skills, is_profile_public)
      VALUES ($1, 'John Doe', 'MIT', 2025, '+91-9876543210', 'https://github.com/johndoe', 'https://linkedin.com/in/johndoe',
              'Full-stack developer passionate about building scalable web applications',
              '["React", "Node.js", "Python", "PostgreSQL", "Docker"]', true)
      ON CONFLICT (user_id) DO UPDATE SET full_name = EXCLUDED.full_name
    `, [student1.rows[0].id]);

    const student2 = await pool.query(`
      INSERT INTO users (email, password_hash, user_type)
      VALUES ('jane.smith@student.com', $1, 'student')
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING id
    `, [studentPassword]);

    await pool.query(`
      INSERT INTO students (user_id, full_name, college, graduation_year, phone, github_url, linkedin_url, bio, skills, is_profile_public)
      VALUES ($1, 'Jane Smith', 'Stanford University', 2024, '+91-9876543211', 'https://github.com/janesmith', 'https://linkedin.com/in/janesmith',
              'AI/ML enthusiast with experience in data science and machine learning projects',
              '["Python", "TensorFlow", "React", "FastAPI", "Data Science"]', true)
      ON CONFLICT (user_id) DO UPDATE SET full_name = EXCLUDED.full_name
    `, [student2.rows[0].id]);

    console.log('✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Company 1: contact@ivislabs.com / password123');
    console.log('Company 2: hr@techcorp.in / password123');
    console.log('Student 1: john.doe@student.com / student123');
    console.log('Student 2: jane.smith@student.com / student123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
