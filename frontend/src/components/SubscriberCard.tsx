import React from 'react';
import Avatar from './Avatar';
import { useSubscribe } from '@/hooks/subscribe';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

interface SubscriberCardProps {
  id: string;
  name: string;
  profilePic?: string;
}

const SubscriberCard: React.FC<SubscriberCardProps> = ({ id, name, profilePic }) => {
  const {
    subscribe,
    subscribed,
    loading: loadingSubscriber,
    error: SubscriberError,
    unsubscribe,
    isSameUser,
  } = useSubscribe(id);

  const toggleSubscription = () => {
    if (!subscribed && !isSameUser) {
      subscribe();
    } else {
      unsubscribe();
    }

    if (SubscriberError.length > 0) {
      toast.error(SubscriberError);
    }
  };

  return (
    <div className="flex flex-row justify-between px-4 py-2">
      <Link to={`/profile/${id}`}>
        <div className="flex items-center text-sm">
          <Avatar name={name || ' '} imageSrc={profilePic} />
          <p className="pl-2">{name}</p>
        </div>
      </Link>
      <div className="p-2">
        <button
          className="bg-gray-50 dark:bg-gray-900 border border-gray-399 dark:border-gray-700 text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 py-2 px-4 rounded-3xl flex items-center justify-center text-xs cursor-pointer"
          disabled={loadingSubscriber}
          onClick={toggleSubscription}
        >
          {loadingSubscriber && <Spinner className="w-4 h-4" />}
          {subscribed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

export default SubscriberCard;
