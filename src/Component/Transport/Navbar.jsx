import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
          
    localStorage.removeItem('type');
    navigate('/login');
  }
  const navItems = [
    { path: '/transport/request', title: 'Request' },
    { path: '/transport/approved', title: 'Approved' },
    { path: '/transport/compliants', title: 'Complaints' },
    { path: '/transport/payments', title: 'Payments' }
  ];

  return (
    <nav className="bg-white  w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://firebasestorage.googleapis.com/v0/b/busapp-6cd14.appspot.com/o/logo%2F12.png?alt=media&token=a0adc527-32e6-443b-a65a-6577b095d7e1" 
        className="h-12 w-full  border rounded-full items-center" alt="Ride Right Logo" />
        <span className="self-center text-2xl font-bold text-[#0F6CC7] ">Transport</span>
      </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={toggleProfile} type="button" className="w-9 h-10 border rounded-full ">
            <img
              className='w-full h-full'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTio0ZN4jHisKktUjrHiPzvRmfCKPfAdsaewcQxfb7q_6h4u186fE4yxo8qVg&s" />
          </button>
          {/* Profile Icon */}
          <div className="relative">
            <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none " aria-controls="navbar-sticky" aria-expanded={isMenuOpen ? "true" : "false"}>
              <span className="sr-only">Open main menu</span>

              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            {/* Profile Dropdown */}
            <div className={`absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${isProfileOpen ? '' : 'hidden'}`}>
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900' onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            {navItems.map(({ path, title }) => (
              <li key={path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                <NavLink to={path} className={({ isActive }) => isActive ? "active text-blue-600" : ""}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
