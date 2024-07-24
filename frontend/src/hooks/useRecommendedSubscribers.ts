import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useRecommendedSubscribers = () => {
  const [recommendedSubscriberLoading, setRecommendedSubscriberLoading] = useState(true);
  const [recommendedSubscribers, setRecommendedSubscribers] = useState([]);

  useEffect(() => {
    const fetchRecommendedSubscribers = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/subscriber/recommended`);
        setRecommendedSubscribers(response.data.topFiveSubscribed);
      } catch (error) {
        console.error('Error fetching the recommended Subscribers: ', error);
      } finally {
        setRecommendedSubscriberLoading(false);
      }
    };
    fetchRecommendedSubscribers();
  }, []);

  return {
    recommendedSubscribers,
    recommendedSubscriberLoading,
  };
};
