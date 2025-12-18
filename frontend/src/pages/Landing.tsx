import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PlatformStats } from '../types';
import { formatCurrency } from '../utils/format';

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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Solve Real Problems,<br />Win Real Money
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Companies post coding challenges with cash prizes. Students submit anonymous solutions.
              The best solution wins!
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/explore"
                className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors border border-white/20"
              >
                Explore Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{stats.totalProblems}</p>
                <p className="text-gray-600 mt-2">Active Challenges</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{stats.totalSubmissions}</p>
                <p className="text-gray-600 mt-2">Solutions Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{stats.totalCompanies}</p>
                <p className="text-gray-600 mt-2">Companies</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{stats.totalStudents}</p>
                <p className="text-gray-600 mt-2">Students</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{formatCurrency(stats.totalPrizes)}</p>
                <p className="text-gray-600 mt-2">Total Prizes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">For Students</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Browse Challenges</h4>
                    <p className="text-gray-600">Explore problems posted by top companies with cash prizes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Submit Your Solution</h4>
                    <p className="text-gray-600">Upload your GitHub repo - your identity stays anonymous</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Win Prizes & Get Hired</h4>
                    <p className="text-gray-600">Get selected, win money, and companies can unlock your profile</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">For Companies</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Post a Challenge</h4>
                    <p className="text-gray-600">Define your problem and set a prize amount (Get 2 bonus credits!)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review Anonymous Submissions</h4>
                    <p className="text-gray-600">Evaluate solutions without bias - no names, just code</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Discover Talent</h4>
                    <p className="text-gray-600">Unlock profiles of top performers and hire the best</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Join Now - It's Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Anonymous Submissions</h3>
              <p className="text-gray-600">
                Students submit solutions anonymously, ensuring fair evaluation based purely on code quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Real Cash Prizes</h3>
              <p className="text-gray-600">
                Companies offer genuine cash prizes ranging from ₹15,000 to ₹50,000 and beyond.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Direct Hiring Pipeline</h3>
              <p className="text-gray-600">
                Companies can unlock profiles of top performers for direct recruitment opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
