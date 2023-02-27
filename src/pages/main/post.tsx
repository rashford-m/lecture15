import { Post as IPost } from "./main";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

interface Props {
  post: IPost;
}

export const Post = (props: Props) => {
  const { post } = props;

  const likesRef = collection(db, "likes");

  const onCreatePost = async (data: createFormData) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };


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
        <button>&#x1F44D;
</button>
      </div>
    </div>
  );
};
