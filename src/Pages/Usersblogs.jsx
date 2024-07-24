// // import React from 'react'
// // import { useState,useEffect } from 'react';
// // import { useAuth } from '../AuthContext'
// // import { db } from '../Firebase/Firebase'
// // import { collection, query, where, getDocs } from 'firebase/firestore';
// // import pen from '../assets/Images/edit-pen.svg'
// // import bin from '../assets/Images/bin.webp'
// // import BlogEdit from './BlogEdit';
// // function Usersblogs() {
// //   const {currentUser} = useAuth();
// //   const [blogs, setBlogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   useEffect(()=>{
// //     const FetchBlogs = async ()=>{
// //       if(currentUser){
// //         const q = query(collection(db, 'Blog'), where('user_id', '==', currentUser.uid));
// //           const querySnapshot = await getDocs(q);
// //           const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //           setBlogs(blogsData);
// //           setLoading(false);
// //       }
// //     }
// //     FetchBlogs();
// //   },[currentUser])

// //     if (loading) {
// //     return <div>Loading...</div>;
// //   }


// //   return (
// //     <div >
// //       <h2 className='font-poppins text-2xl font-semibold'>Your Blogs</h2>
// //       <div className='flex flex-row justify-evenly'>
// //         {blogs.map(blog => (
// //           <div key={blog.id} className='p-4 border border-gray-300 rounded-md'>
// //             <div className='flex flex-row gap-[10px]'>
// //             <h1 className='font-poppins font-bold  '>{blog.title}</h1>
            
// //             <img src={pen} className='w-[20px] h-[20px]' onClick={()=>{<BlogEdit key ={blog.id}/>}}></img>
// //             <img src={bin} className='w-5 h-5'></img>
// //             </div>
// //             <p>{blog.Description}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Usersblogs

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../AuthContext';
// import { db } from '../Firebase/Firebase';
// import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import pen from '../assets/Images/edit-pen.svg';
// import bin from '../assets/Images/bin.webp';
// import BlogEdit from './BlogEdit';

// function Usersblogs() {
//   const { currentUser } = useAuth();
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingBlog, setEditingBlog] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       if (currentUser) {
//         const q = query(collection(db, 'Blog'), where('user_id', '==', currentUser.uid));
//         const querySnapshot = await getDocs(q);
//         const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setBlogs(blogsData);
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, [currentUser]);

//   const handleEditClick = (blog) => {
//     setEditingBlog(blog);
//   };

//   const handleDelete = async (id) => {
//     const blogRef = doc(db, 'Blog', id);
//     await deleteDoc(blogRef);
//     setBlogs(blogs.filter(blog => blog.id !== id));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2 className='font-poppins text-2xl font-semibold'>Your Blogs</h2>
//       <div className='flex flex-row justify-evenly'>
//         {blogs.map(blog => (
//           <div key={blog.id} className='p-4 border border-gray-300 rounded-md'>
//             <div className='flex flex-row gap-[10px]'>
//               <h1 className='font-poppins font-bold'>{blog.title}</h1>
//               <img
//                 src={pen}
//                 className='w-[20px] h-[20px] cursor-pointer'
//                 onClick={() => handleEditClick(blog)}
//                 alt="Edit"
//               />
//               <img
//                 src={bin}
//                 className='w-5 h-5 cursor-pointer'
//                 onClick={() => handleDelete(blog.id)}
//                 alt="Delete"
//               />
//             </div>
//             <p>{blog.Description}</p>
//           </div>
//         ))}
//       </div>
//       {editingBlog && <BlogEdit blog={editingBlog} setBlogs={setBlogs} setEditingBlog={setEditingBlog} />}
//     </div>
//   );
// }

// export default Usersblogs;


import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../Firebase/Firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import pen from '../assets/Images/edit-pen.svg';
import bin from '../assets/Images/bin.webp';

function Usersblogs() {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (currentUser) {
        const q = query(collection(db, 'Blog'), where('user_id', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentUser]);

  const handleDelete = async (id) => {
    const blogRef = doc(db, 'Blog', id);
    await deleteDoc(blogRef);
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='font-poppins text-2xl font-semibold'>Your Blogs</h2>
      <div className='flex flex-row justify-evenly'>
        {blogs.map(blog => (
          <div key={blog.id} className='p-4 border border-gray-300 rounded-md'>
            <div className='flex flex-row gap-[10px]'>
              <h1 className='font-poppins font-bold'>{blog.title}</h1>
              <img
                src={pen}
                className='w-[20px] h-[20px] cursor-pointer'
                onClick={() => handleEditClick(blog.id)}
                alt="Edit"
              />
              <img
                src={bin}
                className='w-5 h-5 cursor-pointer'
                onClick={() => handleDelete(blog.id)}
                alt="Delete"
              />
            </div>
            <p>{blog.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usersblogs;
