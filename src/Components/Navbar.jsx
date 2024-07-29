import React from 'react';
import blog from '../assets/Images/logo_blog.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { doSignout } from '../Firebase/auth';

function Navbar() {
  const { userLoggedIn } = useAuth();
  const {currentUser} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex flex-row justify-evenly gap-[700px]  items-center">
      <img src={blog} alt="Blog Logo" className="w-[120px] h-[50px]" />
      <div className="flex flex-row justify-between items-center gap-6">
        {userLoggedIn ? (
              <ul className="flex gap-4 md:gap-14">
                        
                        
              <li>
                <NavLink to="/" className="hover:text-customGray cursor-pointer">Blog</NavLink>
              </li>
           
              <li>
                <NavLink className='hover:text-customGray cursor-pointer' to='/userblogs'> Your Blogs</NavLink>
              </li>
             
              </ul>
                
             
        ) : (
          <ul className="flex gap-4 md:gap-14">
          
       
          <li>
            <NavLink to="/" className="hover:text-customGray cursor-pointer">Blog</NavLink>
          </li>
        
        
        </ul>
        )
      }
       
        {userLoggedIn ? (

          <button onClick={handleLogout} className="rounded-full text-black border-2 border-black px-4 py-2 font-poppins">
            Logout
          </button>
          
        ) : (
          <button className="rounded-full text-black border-2 border-black px-4 py-2 font-poppins">
            <NavLink to="/login">Login/Signup</NavLink>
          </button>
          
        )}
        
      </div>
    </div>
  );
}

export default Navbar;
