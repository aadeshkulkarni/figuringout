import Appbar from '@/components/Appbar';
import Spinner from '@/components/Spinner';
import GraphStats from '@/components/stats/GraphStats';
import StatsCard from '@/components/stats/StatsCard';
import TagCard from '@/components/stats/TagCard';
import TopUsers from '@/components/stats/TopUsers';
import useGetStats from '@/hooks/useGetStats';
import { useEffect, useState } from 'react';

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

const data: GraphData = {
  labels: [],
  datasets: [
    {
      label: 'Blogs this month',
      data: [0, 10, 20],
      borderWidth: 1,
    },
  ],
};

const Stats = () => {
  const { stats, loading } = useGetStats();

  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    if (!stats || !stats.postByMonth) return;

    // Extract labels and data from stats
    const labels = stats.postByMonth.map((row: PostByMonth) => row.month);
    const data = stats.postByMonth.map((row: PostByMonth) => Number(row.post_count));

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
        },
      ],
    };

    setChartData(graphData);
  }, [stats]);

  return (
    <div>
      <Appbar skipAuthCheck />
      <div className="p-4 flex flex-col justify-center items-center w-screen">
        <h1 className="text-2xl mb-4">Statistics</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="w-screen lg:px-24 px-4">
            <div className="flex flex-col flex-wrap lg:flex-row md:flex-row sm:justify-center justify-between">
              {
                <>
                  <StatsCard data={stats?.userCount} name="Total Users" />
                  <StatsCard data={stats?.blogsCount} name="Total Blogs" />
                  <StatsCard data={stats?.contributorsCount} name="Total Contributors" />
                  <TagCard tagList={stats?.topTags} />
                </>
              }
            </div>

            <div className="flex flex-col flex-wrap lg:flex-row md:flex-row sm:justify-center justify-between">
              {
                <>
                  <GraphStats data={chartData} />
                  <TopUsers topUsers={stats?.topUsers} />
                </>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
