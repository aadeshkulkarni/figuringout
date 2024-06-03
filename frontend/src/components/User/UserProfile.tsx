import { createContext, useState } from 'react';
import Spinner from '../Spinner';
import UserAboutTab from './UserAboutTab';
import UserHomeTab from './UserHomeTab';
import { useUser, useUserBlogs } from '../../hooks/user';
import Avatar from '../Avatar';
import { Post } from '../../types/post';

type UserProfileProps = {
  id: string;
};
type UserProfileContextType = {
  currentUser?: any;
  blogs?: Post[];
  loadingUserBlogs?: boolean;
  editingDetails?: boolean;
  isAuthorizedUser?: boolean;
  editUserDetails?: (formData: any) => void;
};
export const UserProfileContext = createContext<UserProfileContextType>({});

const UserProfile = ({ id }: UserProfileProps) => {
  const { currentUser, loading: loadingUser, isAuthorizedUser, editingDetails, editUserDetails, error } = useUser(id);
  const { blogs, loading: loadingUserBlogs } = useUserBlogs(id);

  const [currentTab, setCurrentTab] = useState('Home');

  const determineTabContent = () => {
    switch (currentTab) {
      case 'Home':
        return <UserHomeTab />;
      case 'About':
        return <UserAboutTab />;
      default:
        return <></>;
    }
  };
  return (
    <>
      {loadingUser ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className=" mt-7 flex justify-center text-3xl">User not found</div>
      ) : (
        <UserProfileContext.Provider
          value={{
            currentUser,
            isAuthorizedUser,
            blogs,
            loadingUserBlogs,
            editingDetails,
            editUserDetails,
          }}
        >
          <div>
            <div className="flex flex-row justify-center">
              <div className="flex flex-col w-full p-5 md:p-24 md:w-4/6 md:pl-36">
                <div className="text-3xl">{currentUser?.name}</div>
                <nav className="flex flex-row gap-5 mt-3 border-b">
                  <div
                    className={`cursor-pointer hover:text-black py-3 ${
                      currentTab === 'Home' ? 'text-black border-b border-black' : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentTab('Home')}
                  >
                    Home
                  </div>
                  <div
                    className={`cursor-pointer hover:text-black py-3 ${
                      currentTab === 'About' ? 'text-black border-b border-black' : 'text-gray-500'
                    }`}
                    onClick={() => setCurrentTab('About')}
                  >
                    About
                  </div>
                </nav>
                <div className="mt-3">{determineTabContent()}</div>
              </div>
              <div className="border-l border-slate-100 hidden md:block w-2/6 p-8 pr-36">
                <Avatar name={currentUser?.name || ''} size="large" imageSrc={currentUser?.profilePic} />
                <div className="text-lg mt-3">{currentUser?.name}</div>
                <div className="text-sm mt-3">{currentUser?.details}</div>
              </div>
            </div>
          </div>
        </UserProfileContext.Provider>
      )}
    </>
  );
};

export default UserProfile;
