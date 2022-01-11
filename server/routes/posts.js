import express from 'express';

import {getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);// this should be before /:id route cos  express considers /:id as a catch all so the code in /search won't work 

router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
