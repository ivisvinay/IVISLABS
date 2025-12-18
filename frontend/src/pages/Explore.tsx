import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Problem } from '../types';
import { ProblemCard } from '../components/ProblemCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Explore: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrize: '',
    maxPrize: '',
  });

  useEffect(() => {
    fetchProblems();
  }, [filters]);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrize) params.append('minPrize', filters.minPrize);
      if (filters.maxPrize) params.append('maxPrize', filters.maxPrize);

      const response = await api.get(`/api/public/problems?${params.toString()}`);
      setProblems(response.data.data);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Challenges</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="">All Categories</option>
                <option value="IoT & Monitoring">IoT & Monitoring</option>
                <option value="Web Application">Web Application</option>
                <option value="AI & Analytics">AI & Analytics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Prize</label>
              <input
                type="number"
                value={filters.minPrize}
                onChange={(e) => setFilters({ ...filters, minPrize: e.target.value })}
                placeholder="₹0"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Prize</label>
              <input
                type="number"
                value={filters.maxPrize}
                onChange={(e) => setFilters({ ...filters, maxPrize: e.target.value })}
                placeholder="₹100000"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : problems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No challenges found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
