"use client";

// pages/forum.js
import { useState, useEffect } from "react";
import { database } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { push, ref, set, get } from "firebase/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/context/UserContext";
import { format } from "date-fns";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [dbUser, setDbUser] = useState([]);
  const [newPost, setNewPost] = useState("");
  const { user } = UserAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const postRef = ref(database, "posts");
      get(postRef).then((snapshot) => {
        if (snapshot.exists()) {
          const postsArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setPosts(postsArray);
        }
      });
    };
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const postRef = ref(database, "posts");
    const newDataRef = push(postRef);
    const usersRef = ref(database, "user");
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        var filteredUsersArray = [];
        usersArray.map((users) => {
          if (users.email == user.email) {
            filteredUsersArray.push(users);
            set(newDataRef, {
              content: newPost,
              dateSent: format(new Date(), "p"),
              senderEmail: user.email,
              name: filteredUsersArray[0].name,
            });
            setNewPost("");
            get(postRef).then((snapshot) => {
              if (snapshot.exists()) {
                const postsArray = Object.entries(snapshot.val()).map(
                  ([id, data]) => ({
                    id,
                    ...data,
                  })
                );
                setPosts(postsArray);
              }
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={handlePost}>
        <div className="flex flex-col gap-y-3">
          {posts.map((post, index) => (
            <div>
              <p className="text-sm">{post.name}</p>
              <div className="bg-blue-400 w-fit p-3 rounded" key={index}>
                {post.content}
              </div>
              <p className="text-sm">{post.dateSent}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <Input
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="New Post"
          />
          <Button type="submit">Post</Button>
        </div>
      </form>
    </div>
  );
}
