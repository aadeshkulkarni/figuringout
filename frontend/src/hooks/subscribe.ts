import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSubscribe = (userId: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string>('');
  const [subscribers, setSubscribers] = useState<any>([]);
  const [isSameUser, setIsSameUser] = useState(false);

  async function subscribe() {
    if (loading) {
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    const subscriberId = JSON.parse(localStorage.getItem('user') || '');

    if (!token) {
      navigate('/signin');
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/subscriber/subscribe`,
        {
          userId,
          subscriberId: subscriberId.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscribed(true);
      setSubscribers([...subscribers, subscriberId]);
    } catch (e) {
      setError('Failed to subscribe');
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    if (loading) {
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    const subscriberId = JSON.parse(localStorage.getItem('user') || '');
    if (!token) {
      navigate('/signin');
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/subscriber/unsubscribe`,
        {
          userId,
          subscriberId: subscriberId.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscribed(false);
      setSubscribers(subscribers.filter((subscriber: any) => subscriber.id !== subscriberId.id));
    } catch (e) {
      setError('Failed to unsubscribe');
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscribers() {
    if (loading) {
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    const subscriberId = JSON.parse(localStorage.getItem('user') || '');
    if (userId === subscriberId.id) {
      setIsSameUser(true);
    }

    if (!token) {
      navigate('/signin');
    }
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/subscriber/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const checkSubscription = response.data.subscribers.find((subscriber: any) => subscriber.id === subscriberId.id);
      if (checkSubscription) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
      setSubscribers(response.data.subscribers);
    } catch (e) {
      setError('Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return {
    loading,
    subscribed,
    error,
    subscribe,
    unsubscribe,
    subscribers,
    isSameUser,
  };
};
