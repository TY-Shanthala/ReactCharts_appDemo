import { PieChart, BarChart, LineChart } from '@mui/x-charts'
import { users } from '../data/users'

export default function Dashboard() {
  const pieData = users.slice(0, 5).map(user => ({
    id: user.id,
    value: user.tasksCompletedPerDay,
    label: user.name,
  }));

  const barData = {
    xAxis: [
      {
        scaleType: 'band',
        data: users.slice(0, 10).map(user => user.name),
      },
    ],
    series: [
      {
        data: users.slice(0, 10).map(user => user.averageTimeSpentPerDay),
        label: 'Avg Hours/Day',
      },
    ],
  };

  const lineData = {
    xAxis: [
      {
        data: users.slice(0, 10).map(user => user.id),
        label: 'User ID'
      }
    ],
    series: [
      {
        data: users.slice(0, 10).map(user => user.tasksCompletedPerDay),
        label: 'Tasks/Day',
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Pie Chart - Tasks Completed (Top 5 Users)</h3>
      <PieChart series={[{ data: pieData }]} width={500} height={300} />

      <h3>Bar Chart - Average Time Spent</h3>
      <BarChart
        {...barData}
        width={600}
        height={300}
      />

      <h3>Line Chart - Tasks Completed</h3>
      <LineChart
        {...lineData}
        width={600}
        height={300}
      />
    </div>
  );
}

