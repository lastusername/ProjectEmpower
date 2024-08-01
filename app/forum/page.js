// pages/forum.js
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => doc.data());
      setPosts(postList);
    };
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'posts'), { content: newPost });
    setNewPost('');
    // Refresh posts
  };

  return (
    <div>
      <form onSubmit={handlePost}>
        <input value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="New Post" />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post, index) => (
          <div key={index}>{post.content}</div>
        ))}
      </div>
    </div>
  );
}