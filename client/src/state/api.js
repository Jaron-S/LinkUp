// import { posts } from "data/posts";

export const fetchPosts = async (token) => {
  const response = await fetch(
    "https://social-media-app-server.onrender.com/posts",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  return data;
};

export const fetchUserPosts = async (token, userId) => {
  // let data;
  // if (userId === "63d3245310249c43ca38804a") {
  const response = await fetch(
    `https://social-media-app-server.onrender.com/posts/${userId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  // } else {
  //   data = posts.filter((post) => post.userId === userId);
  // }
  return data;
};
