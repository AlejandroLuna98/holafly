import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import { convertKBtoGB } from '@/utils/convertKBtoGB';

interface DonutChartProps {
  plan: string;
  totalConsumptionKB: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  plan,
  totalConsumptionKB,
}): JSX.Element => {
  const totalConsumptionGB = convertKBtoGB(totalConsumptionKB);
  const planData = plan.match(/(\d+)\GB/);
  const planGB = planData ? parseFloat(planData[1]) : 0;
  const data: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [totalConsumptionGB, planGB - totalConsumptionGB],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    maintainAspectRatio: false,
    cutout: '80%',
  };

  return (
    <>
      <Doughnut data={data} options={options} />
      <p className="text-center text-xs text-gray-500 pt-1 ">
        {totalConsumptionGB}/{planGB} GB
      </p>
    </>
  );
};

export default DonutChart;
