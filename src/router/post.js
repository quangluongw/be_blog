import express from "express";
import { createPosts, deletePost, detailPost, getPosts, updatePosts } from "../controller/post";
const router = express.Router();
router.get('/post',getPosts)
router.post('/post',createPosts)
router.get('/post/:slug',detailPost)
router.put('/post/:id',updatePosts)
router.delete('/post/:id',deletePost)
export default router