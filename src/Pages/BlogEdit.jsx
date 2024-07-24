// import React, { useState } from 'react';
// import { db } from '../Firebase/Firebase';
// import { doc, updateDoc } from 'firebase/firestore';

// function BlogEdit({ blog, setBlogs, setEditingBlog }) {
//   const [title, setTitle] = useState(blog.title);
//   const [description, setDescription] = useState(blog.Description);

//   const handleUpdate = async () => {
//     const blogRef = doc(db, 'Blog', blog.id);
//     await updateDoc(blogRef, {
//       title,
//       Description: description,
//     });
//     setBlogs(prevBlogs => prevBlogs.map(b => (b.id === blog.id ? { ...b, title, Description: description } : b)));
//     setEditingBlog(null);
//   };

//   return (
//     <div className='p-4 border border-gray-300 rounded-md'>
//       <input
//         type='text'
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className='p-2 border border-gray-300 rounded-md'
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className='p-2 border border-gray-300 rounded-md'
//       />
//       <button onClick={handleUpdate} className='m-2 p-2 bg-blue-500 text-white rounded-md'>
//         Update
//       </button>
//       <button onClick={() => setEditingBlog(null)} className='m-2 p-2 bg-gray-500 text-white rounded-md'>
//         Cancel
//       </button>
//     </div>
//   );
// }

// export default BlogEdit;

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
    <div className='p-4 border border-gray-300 rounded-md'>
      <h2 className='font-poppins text-2xl font-semibold'>Edit Blog</h2>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='p-2 border border-gray-300 rounded-md'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='p-2 border border-gray-300 rounded-md'
      />
      <button onClick={handleUpdate} className='m-2 p-2 bg-blue-500 text-white rounded-md'>
        Update
      </button>
      <button onClick={() => navigate('/userblogs')} className='m-2 p-2 bg-gray-500 text-white rounded-md'>
        Cancel
      </button>
    </div>
  );
}

export default BlogEdit;

