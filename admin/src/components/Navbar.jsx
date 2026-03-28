import '../style/Navbar.css'

const Navbar = ({setToken}) => {
  return (
    <div className="navbar">
      <div className='navbar-logo'>
        E-Commerce
      </div>
      <button className="logout-btn" onClick={() => {
        localStorage.removeItem("token")
        setToken('')
      }}>
        Logout
      </button>
    </div>
  )
}

export default Navbar