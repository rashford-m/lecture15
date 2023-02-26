import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { async } from "@firebase/util";
import { string } from "yup";

interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);

  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  getPosts();
  return <div>This is the home page</div>;
};
