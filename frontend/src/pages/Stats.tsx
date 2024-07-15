import Appbar from '@/components/Appbar';
import Spinner from '@/components/Spinner';
import useGetStats from '@/hooks/useGetStats';
import { CircleUser } from 'lucide-react';
import {  Line } from "react-chartjs-2";
import {Chart, CategoryScale} from "chart.js/auto";
import { useEffect, useState } from 'react';

interface User{
  id: string;
  html_url: string;
  profilePic: string;
  name : string,
  email : string,
}

interface GraphData {
  labels: string[] | undefined;
  datasets: Dataset[] | undefined;
}

interface PostByMonth {
  month: string;
  post_count: number;
}

interface Dataset {
  label: string;
  data: number[] | undefined;
  borderWidth: number;
}

Chart.register(CategoryScale);

const data : GraphData = {
  labels: [],
  datasets: [
      {
        label: 'Blogs this month',
        data: [0, 10, 20],
        borderWidth: 1,
      }
  ]
}

const Stats = () => {
    const { stats, loading } = useGetStats();

    const [chartData, setChartData] = useState(data);


    useEffect(() => {
      if (!stats || !stats.postByMonth) return;

  // Extract labels and data from stats
  const labels = stats.postByMonth.map(( row : PostByMonth ) => row.month);
  const data = stats.postByMonth.map((row : PostByMonth) => Number(row.post_count));

  // Ensure at least 8 months are displayed
  const allMonths: string[] = [];
  const allData: number[] = [];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Note: getMonth() returns 0-indexed month

  // Generate labels for the past 7 months
  for (let i = 6; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1 - i, 1); // Subtract i months from current month
    const formattedMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    allMonths.push(formattedMonth);
  }

  // Populate data with fetched or zero values
  allMonths.forEach((month, index) => {
    const dataIndex = labels.indexOf(month);
    allData[index] = dataIndex !== -1 ? data[dataIndex] : 0;
  });

  // Create the graph data object
  const graphData: GraphData = {
    labels: allMonths,
    datasets: [
      {
        label: 'Blogs this month',
        data: allData,
        borderWidth: 1,
      }
    ]
  };

  setChartData(graphData);

    }, [stats])
    

  return (
    <div>
       <Appbar  skipAuthCheck />
       <div className="p-4 flex flex-col justify-center items-center w-screen">
        <h1 className="text-2xl mb-4">Statistics</h1>
      
      {loading ? (
          <Spinner
           />
        ) : (
        <div className='w-screen lg:px-24 px-4'>
          <div className="flex flex-wrap lg:flex-row md:flex-row sm:flex-col justify-between"> 
            { 
            <>
               <StatsCard data={stats?.userCount} name='Total Users'  />
               <StatsCard data={stats?.blogsCount} name='Total Blogs' />
               <StatsCard data={stats?.contributorsCount} name='Total Contributors' />
               <TagList data={stats?.topTags} name='Top Tags'  />
            </>
              
            }
            
          </div>

          <div className="flex flex-col lg:flex-row sm:flex-col justify-between">
            { 
            <>
               <Graph  data = {chartData}/>
               <UserList data={stats?.topUsers}  name='Top Users'  />
            </>
            }
          </div>
        </div>
        )
      }
      </div>
    </div>
  )
}

const StatsCard = ({data, name } : {data : number | undefined, name : string}) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full xs:w-full mb-2 lg:p-8 md:p-6 sm:p-4">
      <div className='flex flex-col h-28 col-span-12 md:col-span-3 transform transition-transform duration-300 hover:scale-105 border rounded-md shadow-sm text-main bg-main'>
      <div className="text-left p-4">
        <h4 className="text font-medium text-nowrap overflow-hidden text-ellipsis">{name}</h4>
        <h2 className="text-lg font-medium text-nowrap overflow-hidden text-ellipsis">{data}</h2>
      </div>
      </div>
    </div>
  );
};

const UserList = ({data, name } : {data : [] | undefined, name : string}) => {
  return (
    <div className="lg:w-1/3 sm:w-full lg:p-8 ">
      <div className='flex flex-col col-span-12 md:col-span-3 border shadow-sm text-main bg-main'>
      <div className="text-left p-4 overflow-scroll">
        <h4 className="text-lg font-medium pb-2 text-nowrap overflow-hidden text-ellipsis">{name}</h4>
          {
            data?.map((user) => {
              return <UserCard data = {user}/>
            })
          }
      </div>
      </div>
    </div>
  );
};

const TagList = ({data, name } : {data : [] | undefined, name : string}) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full xs:w-full mb-2 lg:p-8 md:p-6 sm:p-4 ">
      <div className='flex flex-col h-28 col-span-12 md:col-span-3 transform transition-transform duration-300 hover:scale-105 border rounded-md shadow-sm text-main bg-main'>
      <div className="text-left p-4">
        <h4 className="text-lg font-medium text-nowrap overflow-hidden text-ellipsis">{name}</h4>
        <div className="flex justify-center max-w-fit items-center m-1 font-medium py-1 px-2 bg-transparent rounded-full text-whi bg-gray-100 border ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">Hello</div>
        </div>
          {
            data?.map((tags) => {
              return  <span className="py-2.2 px-3.6 text-xs rounded-1.8 inline-block whitespace-nowrap text-center bg-slate-650 text-slate-750 align-baseline font-bold uppercase leading-none">{tags['tagName']}</span>
            })
          }
      </div>
      </div>
    </div>
  );
};

const UserCard = ({data } : {data : User}) => {
  return (
    <div key={data.id} className="relative flex flex-col text-gray-700 shadow-md w-auto mr-4 h-14 rounded-xl bg-clip-border transform transition-transform duration-300 hover:scale-105 border-2 my-2 ">
      <div role="button"
           className="flex mx-2 items-center w-full leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 ">
        <div className="grid mr-4 place-items-center">
        { data.profilePic ? 
          <img alt="candice" src={data.profilePic}
            className="relative inline-block h-9 w-9 !rounded-full  object-cover object-center" />
          :
          <CircleUser size={40}  /> 
          
          }
        </div>
        <div>
          <h6
            className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            {data.name}
          </h6>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            {data.email}
          </p>
        </div>
      </div>
    </div>
  )
}

const Graph = ({data } : {data : any}) => {
  return (
    <div className="lg:w-2/3 sm:w-full mb-8 p-8 ">
      <div className='flex  flex-col col-span-12 md:col-span-3 border shadow-sm text-main bg-main'>
        <div className="text-left p-4 overflow-scroll">
          <h4 className="text-lg font-medium pb-2 text-nowrap overflow-hidden text-ellipsis">Monthly Blog Count</h4>
          <Line data={data} 
            options={{
              scales : {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0, // Display whole numbers only
                  },
                }
            },
            plugins: {
              title: {
                display: true,
                text: "Number of Blogs posted montly"
              },

              legend: {
                display: false
              }
            }
        }} />
        </div>
      </div>
    </div>
  )
}


export default Stats