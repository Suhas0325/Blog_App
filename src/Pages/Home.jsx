import React from 'react'
import Navbar from '../Components/Navbar'
import Bloglist from '../Components/Bloglist'
import Footer from '../Components/Footer'
import { useAuth } from '../AuthContext'

function Home() {
  const {userLoggedIn} = useAuth();
  const {currentUser} = useAuth();
  return (
    <>
    {userLoggedIn ?
    (
      <div>
        <h1 className="text-4xl font-bold">Welcome, {currentUser?.displayName || 'Guest'}!</h1>
   </div>
    ): (
      <div>
        <h1>Hello</h1>
      </div>

    ) }
   
    </>
  )
}

export default Home