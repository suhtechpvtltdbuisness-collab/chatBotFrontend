import { Activity, BarChart3, BookOpen, Clock, MessageSquare, Star, TrendingUp } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { tenantAPI } from '../lib/api.js';
import { useAuth } from '../lib/auth.jsx';

const Analytics = () => {
  const { isAgent } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await tenantAPI.getAnalytics(days);
        setData(res.data);
      } catch (err) {
        // handled by axios interceptor toast
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [days]);

  const dailySeries = useMemo(() => {
    const arr = data?.messages?.daily || [];
    return arr.map(d => ({ date: d._id, count: d.count }));
  }, [data]);

  if (isAgent) {
    return (
      <div className="p-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>
          <p className="text-sm text-gray-600 mt-2">Analytics are available for admins. Ask an admin for access.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const statusArray = data?.conversations?.statusBreakdown || [];
  const activeCount = Array.isArray(statusArray)
    ? statusArray.filter(s => s === 'active' || s === 'transferred').length
    : 0;

  const stats = [
    {
      name: 'Total Conversations',
      value: data?.conversations?.totalConversations || 0,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Active/Handoff',
      value: activeCount,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Avg. Satisfaction',
      value: typeof data?.conversations?.avgSatisfaction === 'number'
        ? `${data.conversations.avgSatisfaction.toFixed(1)}/5`
        : 'N/A',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Avg. Duration',
      value: typeof data?.conversations?.avgDuration === 'number'
        ? `${Math.round((data.conversations.avgDuration || 0) / 60)}m`
        : 'N/A',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">Usage, performance, and trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Period</label>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
          >
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message Volume */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Message Volume</h3>
            <TrendingUp className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-2 max-h-80 overflow-auto pr-2">
            {dailySeries.length === 0 ? (
              <div className="text-sm text-gray-500">No data</div>
            ) : (
              dailySeries.map(item => (
                <div key={item.date} className="flex items-center justify-between border-b border-gray-100 py-2">
                  <span className="text-sm text-gray-600">{item.date}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Knowledge Base Summary */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
            <BookOpen className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total items</span>
              <span className="font-medium text-gray-900">{data?.knowledgeBase?.totalItems || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average usage</span>
              <span className="font-medium text-gray-900">{Math.round(data?.knowledgeBase?.avgUsage || 0)}</span>
            </div>
            <div className="mt-4">
              <div className="text-xs uppercase text-gray-500 mb-2">Top categories</div>
              <div className="flex flex-wrap gap-2">
                {(data?.knowledgeBase?.topCategories || []).slice(0, 8).map((c, i) => (
                  <span key={`${c}-${i}`} className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-700">{c}</span>
                ))}
                {(!data?.knowledgeBase?.topCategories || data.knowledgeBase.topCategories.length === 0) && (
                  <span className="text-xs text-gray-500">No categories</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw payload (debug) */}
      <div className="card mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Raw Analytics</h3>
          <BarChart3 className="h-5 w-5 text-gray-500" />
        </div>
        <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-auto max-h-64">
{JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Analytics;
