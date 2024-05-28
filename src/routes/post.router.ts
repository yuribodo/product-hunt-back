import { Router } from "express";

import { getAllPosts, getPostbyId, createPost, updatePost, deletePost } from "../controllers/post.controllers";

const postRouter = Router()

postRouter.get('/', getAllPosts)
postRouter.get('/:id', getPostbyId)
postRouter.post('/', createPost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)

export default postRouter 