import { users } from '../data/users'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

export default function TablePage() {
  return (
    <div>
      <h2>Users Table</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Truck Number</TableCell>
              <TableCell>Avg Time (hrs)</TableCell>
              <TableCell>Tasks/Day</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.truckNumber}</TableCell>
                <TableCell>{user.averageTimeSpentPerDay}</TableCell>
                <TableCell>{user.tasksCompletedPerDay}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
