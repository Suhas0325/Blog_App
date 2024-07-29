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
    <div >
      <h2 className='font-poppins text-2xl font-semibold text-center'>Your Blogs</h2>
      <div className='flex flex-row items-center items-stretch flex-wrap justify-evenly gap-[10px] mt-5'>
        {blogs.map(blog => (
          <div key={blog.id} className='border border-black rounded-[10px] w-[600px]  p-2'>
            <div className='flex flex-row flex-wrap  gap-[10px]'>
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
            <p className='text-justify flex-grow'>{blog.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usersblogs;
