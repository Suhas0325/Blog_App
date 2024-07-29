import React, { useState } from 'react'
import { useAuth } from '../AuthContext'
import { Link } from 'react-router-dom'
import AI from '../assets/Images/AI_pic.webp'
import p1 from '../assets/Images/p1.webp'
import p2 from '../assets/Images/p2.jpg'
import { addDoc,collection } from 'firebase/firestore'
import { db } from '../Firebase/Firebase'

function Bloglist() {
  const {userLoggedIn,currentUser}  = useAuth();
  const [title,setTitle] = useState('');
  const [Description,setDescription] = useState('');
  const [Error,SetError] = useState(null);
   
 

  const onSubmit = async(e) => {
    if(Description.split(' ').length >=100){
    e.preventDefault();
    await addDoc(collection(db,'Blog'),{
      
      title,
      Description,
      user_id:currentUser.uid
    });
    setTitle('');
    setDescription('');
    SetError(null);
  }
  else if(Description==='' || title==''){
    e.preventDefault()
    SetError("Fields are Empty ")
  }
  else{
    e.preventDefault()
    SetError("Enter Minimum Characters of 100");
   
  }
   
  }

  return (
   
   <>
   {userLoggedIn
   ?(
          <div className='flex flex-col  items-center '>
            <div>
            <h1 className='font-poppins text-3xl weigth-200 font-semibold'>Add New Blog</h1>
            </div>
           
           <form className='flex flex-col space-y-4 mt-4' onSubmit={onSubmit} type='POST'>
            <input type='text' placeholder='Enter Blog title' className='p-2 border border-gray-300 rounded-[10px] w-[500px]' 
           value={title} onChange={(e)=>setTitle(e.target.value)} />
            <textarea placeholder='Enter Description' className=' p-2  border border-gray-300 rounded-[10px] w-[500px] h-[100px]'
             value={Description} onChange={(e)=>setDescription(e.target.value)}></textarea>
              {/* <p className='text-xs text-customGray '>{Description.split(' ').length}</p> */}
            <button className='bg-black border-2 border-black  text-white  font-poppins rounded-[10px] py-3 hover:bg-customGray border-none' type='submit'>Post It</button>
           
           </form>
               {Error && <div className="text-red-500 mt-4">{Error}</div>}
          </div>
   )
   :
   (
    <div>
       <div className='text-center mt-10 font-poppins'>
          <h1 className='text-3xl font-bold '>Add your Blog</h1>
       </div>
       <div className=' flex flex-row items-center gap-5 mt-10'>
        <h2 className='font-poppins text-xl'>Wanna add your Blogs and make other people see it then </h2 >
       <button className='rounded-full border-2 border-black px-4 py-2 bg-black text-white font-poppins'>
        <Link to='/login'> Login</Link>
       
        </button>
       </div>

       <div className='flex items-center justify-center gap-4 relative mt-5'> 
        <div className='absolute font-poppins text-xl text-white top-10 left-12 ml-2'>
          <h1 className='text-4xl '>Blogs on Different Categories</h1>
          <h1 className='text-4xl'> like AI </h1>
        </div>
        <img src={AI} className='w-[800px] h-[600px]'></img>
        <div className='grid gap-3 '>
          <img src={p1} className='w-[300px] h-[300px] '>
          </img>
          <img src={p2} className='w-[300px] h-[280px]'></img>
        </div>
       </div>

       
    </div>
      
   )
   }
   </>
  )
}

export default Bloglist