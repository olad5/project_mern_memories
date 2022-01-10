import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPosts = (page) => async (dispatch) => { // actions are asynchronous causing you're using redux thunk
  try {
    dispatch({ type: START_LOADING }); // basically makes the UI show a CircularProgress element that says it's currently running a process
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });// stops showing the CircularProgress element when the user is done with the process
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => { // actions are asynchronous causing you're using redux thunk
  try {
    dispatch({ type: START_LOADING });// basically makes the UI show a loading bar that says it's currently running a process
    // console.log(searchQuery);
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });// stops showing the CircularProgress element when the user is done with the process
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    navigate(`/posts/${data._id}`);// immediately redirects the user to the newly created post
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
