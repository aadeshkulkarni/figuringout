import { CircleUser } from 'lucide-react';

interface User {
  id: string;
  html_url: string;
  profilePic: string;
  name: string;
  email: string;
}

const TopUsers = ({ topUsers }: { topUsers: [] | undefined }) => {
  return (
    <div className="lg:w-1/3 md:w-1/3 sm:w-full mb-2 lg:p-8 md:p-6 sm:p-4 ">
      <div className="flex flex-col col-span-12 md:col-span-3 border rounded shadow-sm text-main bg-main ">
        <div className="text-left p-4 overflow-scroll">
          <h4 className="text-lg font-medium pb-2 text-nowrap overflow-hidden text-ellipsis">Top Users</h4>
          {topUsers?.map((user: User) => {
            return <UserCard key={user.id} data={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ data }: { data: User }) => {
  return (
    <div
      key={data.id}
      className="relative flex flex-col text-gray-700 shadow-md w-auto mr-4 h-14 rounded-xl bg-clip-border transform transition-transform duration-300 hover:scale-105 border-2 my-2 "
    >
      <div
        role="button"
        className="flex mx-2 items-center w-full leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 "
      >
        <div className="grid mr-4 place-items-center">
          {data.profilePic ? (
            <img
              alt="candice"
              src={data.profilePic}
              className="relative inline-block h-9 w-9 !rounded-full  object-cover object-center"
            />
          ) : (
            <CircleUser size={40} />
          )}
        </div>
        <div>
          <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            {data.name}
          </h6>
          <p className="truncate block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            {data.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
