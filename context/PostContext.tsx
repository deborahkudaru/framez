import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  where,
  DocumentData 
} from "firebase/firestore";
import { db, serverTimestamp } from "../firebaseConfig";
import { useAuth } from "./AuthContext";

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  imageUrl?: string;
  createdAt: any;
}

interface PostContextType {
  posts: Post[];
  userPosts: Post[];
  createPost: (content: string, imageUrl?: string) => Promise<void>;
  loading: boolean;
}

const PostContext = createContext<PostContextType | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch all posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData: Post[] = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Fetch user's posts
  useEffect(() => {
    if (!user) {
      setUserPosts([]);
      return;
    }

    const q = query(
      collection(db, "posts"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userPostsData: Post[] = [];
      querySnapshot.forEach((doc) => {
        userPostsData.push({ id: doc.id, ...doc.data() } as Post);
      });
      setUserPosts(userPostsData);
    });

    return unsubscribe;
  }, [user]);

  const createPost = async (content: string, imageUrl?: string) => {
    if (!user) throw new Error("User must be logged in to create a post");

    await addDoc(collection(db, "posts"), {
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      content,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp()
    });
  };

  return (
    <PostContext.Provider value={{ posts, userPosts, createPost, loading }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts must be used within PostsProvider");
  return context;
};