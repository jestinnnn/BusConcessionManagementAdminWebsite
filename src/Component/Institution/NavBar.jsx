import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const [institute ,setInstitute] = useState("")
    
    useEffect(() => {
      const institutionname = localStorage.getItem('institutionname');
      console.log('Institution Name:', institutionname);
      setInstitute(institutionname);
  }, []);
  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('type');
        localStorage.removeItem('user');
        localStorage.removeItem('institutionname')
        navigate('/login');
        setIsProfileOpen(!isProfileOpen);
    };

    const navItems = [
        { path: '/institute/home', title: 'Home' },
        { path: '/institute/request', title: 'Request' },
        { path: '/institute/approved', title: 'Approved' },
        { path: '/institute/rejected', title: 'Rejected' },
    ];

    return (
        <nav className="bg-white shadow w-full z-10 top-0 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                    <img src="https://firebasestorage.googleapis.com/v0/b/busapp-6cd14.appspot.com/o/logo%2F12.png?alt=media&token=a0adc527-32e6-443b-a65a-6577b095d7e1" className="h-8 w-auto" alt="Logo" />
                    <span className="text-xl font-bold text-[#0F6CC7] hidden md:block">Institute</span>
                </div>
                <div className="flex items-center">
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map(({ path, title }) => (
                                <NavLink key={path} to={path} className={({ isActive }) => isActive ? "text-[#0F6CC7] px-3 py-2 rounded-md text-sm font-medium" : "text-gray-600 hover:text-[#0F6CC7] px-3 py-2 rounded-md text-sm font-medium"}>
                                    {title}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ml-3 relative">
                    <button onClick={toggleProfile} className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:shadow-solid">
                        <img className="h-8 w-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqQy1CZEAA4XlT6Jz25XHAqUly_XHAi7C0mvvchv8uxHDmcWdqo5BZMZu6FCyB_eehUQo&usqp=CAU" alt="" />
                        
                    </button>
                    {/* Profile dropdown */}
                    <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 ${isProfileOpen ? '' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                    </div>
                </div>
                {/* Mobile menu button */}
                <div className="-mr-2 flex md:hidden">
                    <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                        {/* Icon for menu open */}
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map(({ path, title }) => (
                        <NavLink key={path} to={path} className={({ isActive }) => isActive ? "bg-[#0F6CC7] text-white block px-3 py-2 rounded-md text-base font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-[#0F6CC7] block px-3 py-2 rounded-md text-base font-medium"}>
                            {title}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
