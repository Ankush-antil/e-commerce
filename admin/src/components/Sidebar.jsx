import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../style/Sidebar.css'
import { useState } from 'react'

const Sidebar = () => {
  const [active, setActive] = useState('add')
  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <Link className={active === 'add' ? 'sidebar-link active' : 'sidebar-link'} to="/"  onClick={() => setActive('add')}>
          <img className="sidebar-icon" src={assets.add_icon} alt="Add" />
          <p className="sidebar-text">Add Items</p>
        </Link>

        <Link className={active === 'list' ? 'sidebar-link active' : 'sidebar-link'} to="/list" onClick={() => setActive('list')}>
          <img className="sidebar-icon" src={assets.order_icon} alt="List" />
          <p className="sidebar-text">List Items</p>
        </Link>

        <Link className={active === 'orders' ? 'sidebar-link active' : 'sidebar-link'} to="/orders" onClick={() => setActive('orders')}>
          <img className="sidebar-icon " src={assets.order_icon} alt="Orders" />
          <p className="sidebar-text">Orders</p>
        </Link>

      </div>
    </div>
  )
}

export default Sidebar