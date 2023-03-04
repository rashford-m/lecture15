import { Post as IPost } from "./main";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", "post.id"));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, doc.id })));
  };

  const removeLike = async () => {
    try {
      const likesToDelete = query(
        likesRef,
        where("postId", "==", "post.id"),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likesToDeleteQuery);
      const likeId = doc(db, "likes", likeToDeleteData.docs[0].id);
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev?.filter((like) => like.Id === likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const hasUserLike = likes?.find((like) => like.userId === user?.uid);

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
        <button onClick={hasUserLike ? removeLike : addLike}>
          {hasUserLike ? <>&#x1F44E;</> : <>&#x1F44D;</>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
