"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { db, serverTimestamp, storage } from "../firebaseConfig";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// ---------- TYPES ---------- //

export interface Post {
  id: string;
  text: string;
  imageUrl: string | null;
  authorId: string;
  authorName: string | null;
  authorAvatar: string | null;
  createdAt: any; // Firestore timestamp
}

export interface CreatePostInput {
  text?: string;
  imageUri?: string | null;
  author: {
    uid: string;
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
}

interface PostsContextType {
  posts: Post[];
  createPost: (data: CreatePostInput) => Promise<void>;
}

interface ProviderProps {
  children: ReactNode;
}

// ---------- CONTEXT ---------- //

const PostsContext = createContext<PostsContextType | undefined>(undefined);

// ---------- PROVIDER ---------- //

export function PostsProvider({ children }: ProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

   const unsub = onSnapshot(q, (snapshot) => {
  const data: Post[] = snapshot.docs.map((d) => {
    const doc = d.data() as DocumentData;

    return {
      id: d.id,
      text: doc.text ?? "",
      imageUrl: doc.imageUrl ?? null,
      authorId: doc.authorId ?? "",
      authorName: doc.authorName ?? null,
      authorAvatar: doc.authorAvatar ?? null,
      createdAt: doc.createdAt ?? null, 
    };
  });

  setPosts(data);
});


    return unsub;
  }, []);

  const createPost = async ({ text, imageUri, author }: CreatePostInput) => {
    let imageUrl: string | null = null;

    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const name = uuidv4();
      const imageRef = ref(storage, `posts/${name}`);

      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newPost = {
      text: text || "",
      imageUrl,
      authorId: author.uid,
      authorName: author.displayName || author.email || null,
      authorAvatar: author.photoURL || null,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "posts"), newPost);
  };

  return (
    <PostsContext.Provider value={{ posts, createPost }}>
      {children}
    </PostsContext.Provider>
  );
}

// ---------- HOOK ---------- //

export const usePosts = (): PostsContextType => {
  const ctx = useContext(PostsContext);
  if (!ctx) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return ctx;
};
