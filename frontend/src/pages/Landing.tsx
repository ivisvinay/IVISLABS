import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { PlatformStats } from '../types';
import { formatCurrency } from '../utils/format';
import {
  RocketLaunchIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export const Landing: React.FC = () => {
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/public/stats');
        setStats(response.data.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-500 dark:from-primary-900 dark:via-purple-900 dark:to-pink-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <SparklesIcon className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Connecting Talent with Opportunity</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Solve Real Problems,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Win Real Money
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Companies post coding challenges with cash prizes. Students submit <span className="font-semibold text-yellow-300">anonymous solutions</span>.
              The best solution wins!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-white/50 transition-all duration-300"
                >
                  <RocketLaunchIcon className="w-5 h-5" />
                  <span>Get Started Free</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/explore"
                  className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  <span>Explore Challenges</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              className="fill-white dark:fill-gray-900"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <StatCard
                icon={<TrophyIcon className="w-8 h-8" />}
                value={stats.totalProblems}
                label="Active Challenges"
                delay={0.1}
              />
              <StatCard
                icon={<CodeBracketIcon className="w-8 h-8" />}
                value={stats.totalSubmissions}
                label="Solutions Submitted"
                delay={0.2}
              />
              <StatCard
                icon={<UserGroupIcon className="w-8 h-8" />}
                value={stats.totalCompanies}
                label="Companies"
                delay={0.3}
              />
              <StatCard
                icon={<SparklesIcon className="w-8 h-8" />}
                value={stats.totalStudents}
                label="Students"
                delay={0.4}
              />
              <StatCard
                icon={<CurrencyDollarIcon className="w-8 h-8" />}
                value={formatCurrency(stats.totalPrizes)}
                label="Total Prizes"
                delay={0.5}
                highlight
              />
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple, fair, and rewarding for everyone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Students */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">For Students</h3>
              </div>

              <div className="space-y-6">
                <StepCard
                  number="1"
                  title="Browse Challenges"
                  description="Explore problems posted by top companies with real cash prizes"
                  icon={<CodeBracketIcon className="w-5 h-5" />}
                />
                <StepCard
                  number="2"
                  title="Submit Anonymously"
                  description="Upload your GitHub repo - your identity stays hidden"
                  icon={<ShieldCheckIcon className="w-5 h-5" />}
                />
                <StepCard
                  number="3"
                  title="Win & Get Hired"
                  description="Win prizes and get discovered by companies based on your skills"
                  icon={<TrophyIcon className="w-5 h-5" />}
                />
              </div>
            </motion.div>

            {/* For Companies */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-8 shadow-xl text-white"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <BoltIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Companies</h3>
              </div>

              <div className="space-y-6">
                <StepCard
                  number="1"
                  title="Post a Challenge"
                  description="Define your problem and set a prize (Get 2 bonus credits!)"
                  icon={<RocketLaunchIcon className="w-5 h-5" />}
                  light
                />
                <StepCard
                  number="2"
                  title="Review Anonymously"
                  description="Evaluate solutions without bias - no names, just pure code"
                  icon={<CodeBracketIcon className="w-5 h-5" />}
                  light
                />
                <StepCard
                  number="3"
                  title="Discover Talent"
                  description="Unlock profiles of top performers and hire the best"
                  icon={<UserGroupIcon className="w-5 h-5" />}
                  light
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>Join Now - It's Free</span>
                <RocketLaunchIcon className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built for fairness, transparency, and opportunity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheckIcon className="w-8 h-8" />}
              title="Anonymous Submissions"
              description="Students submit solutions anonymously, ensuring fair evaluation based purely on code quality and merit."
              gradient="from-blue-500 to-cyan-500"
              delay={0.1}
            />
            <FeatureCard
              icon={<CurrencyDollarIcon className="w-8 h-8" />}
              title="Real Cash Prizes"
              description="Companies offer genuine cash prizes ranging from ₹15,000 to ₹50,000 and beyond."
              gradient="from-green-500 to-emerald-500"
              delay={0.2}
            />
            <FeatureCard
              icon={<UserGroupIcon className="w-8 h-8" />}
              title="Direct Hiring Pipeline"
              description="Companies can unlock profiles of top performers for direct recruitment opportunities."
              gradient="from-purple-500 to-pink-500"
              delay={0.3}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-to-r from-primary to-purple-600 dark:from-primary-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx Ljc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students and companies already on the platform
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <RocketLaunchIcon className="w-6 h-6" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number | string;
  label: string;
  delay: number;
  highlight?: boolean;
}> = ({ icon, value, label, delay, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
    className={`text-center p-6 rounded-2xl ${
      highlight
        ? 'bg-gradient-to-br from-primary to-purple-600 text-white shadow-xl'
        : 'bg-gray-50 dark:bg-gray-800'
    }`}
  >
    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
      highlight ? 'bg-white/20' : 'bg-primary/10 text-primary'
    }`}>
      {icon}
    </div>
    <p className={`text-3xl font-bold mb-1 ${
      highlight ? 'text-white' : 'text-gray-900 dark:text-white'
    }`}>
      {value}
    </p>
    <p className={`text-sm ${
      highlight ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
    }`}>
      {label}
    </p>
  </motion.div>
);

const StepCard: React.FC<{
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  light?: boolean;
}> = ({ number, title, description, icon, light }) => (
  <div className="flex items-start space-x-4">
    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
      light
        ? 'bg-white/20 text-white'
        : 'bg-gradient-to-br from-primary to-purple-600 text-white'
    }`}>
      {number}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2">
        <div className={light ? 'text-white' : 'text-primary'}>
          {icon}
        </div>
        <h4 className={`font-semibold text-lg ${light ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h4>
      </div>
      <p className={light ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}>
        {description}
      </p>
    </div>
  </div>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}> = ({ icon, title, description, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -8 }}
    className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />

    <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl mb-4 text-white`}>
      {icon}
    </div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {description}
    </p>

    <div className="mt-4 flex items-center text-primary dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
      <span>Learn more</span>
      <CheckCircleIcon className="w-5 h-5 ml-2" />
    </div>
  </motion.div>
);
