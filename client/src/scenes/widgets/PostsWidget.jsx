import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync, fetchUserPostsAsync, setPostsSuccess } from "state";
import PostWidget from "./PostWidget";
import LoadingCircle from "./LoadingCircle";
import { default as postsData } from "data/posts";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getPosts = () => {
    if (!posts[0]) dispatch(setPostsSuccess(postsData));
    if (isProfile) dispatch(fetchUserPostsAsync(userId));
    else dispatch(fetchPostsAsync());
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* loading circle when no posts */}
      {!posts || !posts[0] ? (
        <LoadingCircle />
      ) : (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
