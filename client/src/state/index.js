import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchUserPosts } from "./api";
import users from "data/users";
import { setClientPosts } from "data/posts";

const initialState = {
  user: {
    _id: "63d3245310249c43ca38804a",
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    password: "$2b$10$.3F/Zx6uD4iGFEXkj8/Mbeohp8PITsJid7oynAybKq545XzggRJe.",
    picturePath: "p11.webp",
    friends: [
      {
        _id: "63cae259ccea636a4d97d0b9",
        firstName: "Tessa",
        lastName: "Gray",
        occupation: "Journalist",
        location: "Los Angeles, CA",
        picturePath: "p7.webp",
      },
      {
        _id: "63cae259ccea636a4d97d0ba",
        firstName: "Xavier",
        lastName: "Woods",
        occupation: "Nurse",
        location: "Hamilton, ON",
        picturePath: "p8.webp",
      },
      {
        _id: "63cae259ccea636a4d97d0b8",
        firstName: "Cameron",
        lastName: "Bailey",
        occupation: "Event Planner",
        location: "Edmonton, AB",
        picturePath: "p5.webp",
      },
      {
        _id: "63cae259ccea636a4d97d0b5",
        firstName: "Lila",
        lastName: "Fernandez",
        occupation: "Artist",
        location: "Montreal, QC",
        picturePath: "p3.webp",
      },
    ],
    location: "Toronto, ON",
    occupation: "Developer",
    viewedProfile: 23,
    impressions: 5127,
    createdAt: "2023-01-27T01:09:39.640Z",
    updatedAt: "2023-02-15T03:00:07.134Z",
  },
  posts: [
  ],
  userFriend: null,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDMyNDUzMTAyNDljNDNjYTM4ODA0YSIsImlhdCI6MTY3NzAwMDkyMX0._mj26yjzg00FQ90IVK0Shi4t3_7NoKO4xIfgJ3qo-PU",
  isMobileMenuOpen: false,
  mode: "light",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isMobileMenuOpen = false;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent");
      }
    },
    setPostsSuccess: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPostsError: (state, action) => {
      state.error = action.payload.error;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
      setClientPosts(updatedPosts);
    },
    setUserFriend: (state, action) => {
      state.userFriend = action.payload.userFriend;
    },
    toggleMobileMenuOpen: (state) => {
      state.isMobileMenuOpen = state.isMobileMenuOpen === true ? false : true;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setUserFriend,
  setFriends,
  setPostsSuccess,
  setPostsError,
  setPost,
  toggleMobileMenuOpen,
} = authSlice.actions;

export const fetchPostsAsync =
  (userId, isProfile) => async (dispatch, getState) => {
    try {
      const { token } = getState();
      const posts = await fetchPosts(token); // Call the function that fetches posts
      dispatch(setPostsSuccess({ posts }));
    } catch (error) {
      dispatch(setPostsError({ error: error.message }));
    }
  };

export const fetchUserPostsAsync = (userId) => async (dispatch, getState) => {
  try {
    const { token } = getState();
    const posts = await fetchUserPosts(token, userId); // Call the function that fetches posts
    dispatch(setPostsSuccess({ posts }));
  } catch (error) {
    dispatch(setPostsError({ error: error.message }));
  }
};

export const setFriend = (userId) => async (dispatch) => {
  // Fetch the user data here
  const friend = users.find((user) => userId === user._id);
  // Dispatch the action with the user data
  dispatch(setUserFriend({ userFriend: friend }));
};

export default authSlice.reducer;
