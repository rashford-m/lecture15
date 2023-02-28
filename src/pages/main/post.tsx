import { Post as IPost } from "./main";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likeAmount, setLikeAmount] = useState<number | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", "post.id"));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikeAmount(data.docs.length);
  };

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, postId: post.id });
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <footer>@{post.username}</footer>
        <button onClick={addLike}>&#x1F44D;</button>
        {likeAmount && <p>Likes: {likeAmount}</p>}
      </div>
    </div>
  );
};
