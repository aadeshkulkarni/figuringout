import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Stats {
  userCount: number;
  blogsCount: number;
  contributorsCount: number;
  topUsers: [];
  topPosts: [];
  topTags: [];
  postByMonth: [];
}

const useGetStats = () => {
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/stats`);
        console.log(response.data.postByMonth);
        const statsData = {
          userCount: response.data.userCount,
          blogsCount: response.data.blogCount,
          contributorsCount: response.data.contributorsCount,
          topUsers: response.data.topUsers,
          topPosts: response.data.topPosts,
          topTags: response.data.topTags,
          postByMonth: response.data.postByMonth,
        };
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading };
};

export default useGetStats;
