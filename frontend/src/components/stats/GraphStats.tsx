import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

const GraphStats = ({ data }: { data: any }) => {
  return (
    <div className="lg:w-2/3 md:w-2/3 sm:w-full mb-2 lg:p-8 md:p-6 sm:p-4">
      <div className="flex flex-col border rounded shadow-sm text-main bg-main">
        <div className="text-left p-4 overflow-scroll">
          <h4 className="text-lg font-medium pb-2 text-nowrap overflow-hidden text-ellipsis">Monthly Blog Count</h4>
          <Line
            data={data}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0, // Display whole numbers only
                  },
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Number of Blogs posted montly',
                },

                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphStats;
