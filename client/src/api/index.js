import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'}); //creating an axios instance , a base url

API.interceptors.request.use((req) => { // this is going to run before all the requests below
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`// gets the user's token

  }
  return req;
});
const postUrl = '/posts';
const userUrl = '/user'; //this is very useful, ran into a bug that occured because of the users typo

export const fetchPosts = () => API.get(postUrl);
export const createPost = (newPost) => API.post(postUrl, newPost);
export const likePost = (id) => API.patch(`${postUrl}/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${postUrl}/${id}`);

export const signIn = (formData) => API.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => API.post(`${userUrl}/signup`, formData);

