import { NavLink } from 'react-router-dom'
import '../components/sidebar.scss'


export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
      <NavLink to="/table" className="nav-link">Table</NavLink>
    </div>
  );
}
