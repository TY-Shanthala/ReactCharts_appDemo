import '../components/navbar.scss'
import { FaBell, FaUserCircle } from 'react-icons/fa'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">🚚 Truck Dashboard</div>

      <nav className="nav-items">
        <button className="nav-btn">
          <FaBell size={18} />
        </button>
        <button className="nav-btn">
          <FaUserCircle size={20} />
        </button>
      </nav>
    </header>
  )
}
