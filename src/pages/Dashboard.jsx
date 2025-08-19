import {
  PieChart,
  BarChart,
  LineChart
} from '@mui/x-charts';
import { users } from '../data/users';
import {
  Box,
  Typography,
  Grid
} from '@mui/material';
import { useState } from 'react';
import TableComponent from '../components/TableComponent';

export default function Dashboard() {
  const [reversed, setReversed] = useState(false);
  const pieData = users.slice(0, 5).map(user => ({
    id: user.id,
    value: user.tasksCompletedPerDay,
    label: user.name,
  }));
  const handleChartClick = () => {
    setReversed(prev => !prev);
  };
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
        label: 'User ID',
      },
    ],
    series: [
      {
        data: users.slice(0, 10).map(user => user.tasksCompletedPerDay),
        label: 'Tasks/Day',
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Driver Dashboard</Typography>
      {/* Chart Row */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4} onClick={handleChartClick}>
          <Typography variant="subtitle1" gutterBottom>Tasks Completed</Typography>
          <PieChart series={[{ data: pieData }]} width={250} height={180} />
        </Grid>
        <Grid item xs={12} sm={4} onClick={handleChartClick}>
          <Typography variant="subtitle1" gutterBottom>Avg Hours/Day</Typography>
          <BarChart {...barData} width={250} height={180} />
        </Grid>
        <Grid item xs={12} sm={4} onClick={handleChartClick}>
          <Typography variant="subtitle1" gutterBottom>Tasks Per Day</Typography>
          <LineChart {...lineData} width={250} height={180} />
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h5" gutterBottom>Users Table</Typography>
        <TableComponent
          showCheckbox={false}
          showActions={false}
          tablerow={users}
          headCells={[
            { id: "col1", label: "ID", },
            { id: "name", label: "Name", },
            { id: "age", label: "Age", },
            { id: "truckNumber", label: "Truck Number", },
            { id: "averageTimeSpentPerDay", label: "Avg Time (hrs)", },
            { id: "tasksCompletedPerDay", label: "Tasks/Day" },
          ]}
          filterselectInitialData={{
            name: [],
          }}
        />

      </Box>
    </Box>
  );
}
