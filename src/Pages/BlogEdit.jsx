
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(db, 'Blog', id);
      const blogDoc = await getDoc(blogRef);
      if (blogDoc.exists()) {
        setTitle(blogDoc.data().title);
        setDescription(blogDoc.data().Description);
        setLoading(false);
      } else {
        console.log('No such document!');
        navigate('/');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleUpdate = async () => {
    const blogRef = doc(db, 'Blog', id);
    await updateDoc(blogRef, {
      title,
      Description: description,
    });
    navigate('/userblogs');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='font-poppins text-2xl font-semibold text-center'>Edit Blog</h2>
      <div className='flex flex-col gap-[10px] items-center mt-10'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='p-2 border border-black rounded-md rounded-[10px] w-[600px]'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='p-2 border border-black rounded-[10px] w-[600px] h-[200px]'
      />
            <div className='flex items-center justify-center'>
                <button onClick={handleUpdate} className='m-2 p-2 bg-black font-poppins text-white rounded-md'>
                  Update
                </button>
                <button onClick={() => navigate('/userblogs')} className='rounded-md text-black border-2 border-black px-4 py-2 font-poppins'>
                  Cancel
                </button>
            </div>
      </div>
    </div>
  );
}

export default BlogEdit;

