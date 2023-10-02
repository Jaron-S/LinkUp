import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import FlexBetween from "components/FlexBetween";
import FriendToggle from "components/FriendToggle";
import WidgetWrapper from "components/WidgetWrapper";
import fileNames from "data/fileNames";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `https://linkup-server.fly.dev/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // Check if photos exists locally (for faster loading times)
  if (fileNames.find((name) => name === picturePath)) {
    picturePath = `/assets/${picturePath.replace(/\.[^/.]+$/, "")}`;
  } else if (picturePath) {
    picturePath = `https://social-media-app-server.onrender.com/assets/${picturePath.replace(
      /\.[^/.]+$/,
      ""
    )}`;
  }

  return (
    <WidgetWrapper m="2rem 0" maxWidth="50rem">
      <FriendToggle
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <picture
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        >
          <source
            media="(min-width: 1024px) and (max-width: 1920px)"
            srcSet={`${picturePath}_large.webp`}
          />
          <source
            media="(min-width: 992px) and (max-width: 1023px)"
            srcSet={`${picturePath}_large.webp`}
          />
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            srcSet={`${picturePath}_large.webp`}
          />
          <source
            media="(min-width: 465px) and (max-width: 767px)"
            srcSet={`${picturePath}_medium.webp`}
          />
          <source
            media="(max-width: 464px)"
            srcSet={`${picturePath}_small.webp`}
          />
          <img
            className="post-img"
            src={`${picturePath}.webp`}
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        </picture>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween fap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
