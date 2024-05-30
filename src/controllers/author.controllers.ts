import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const authorClient = new PrismaClient().user;

// getAllAuthors
export const getAllAuthors = async (req: Request, res: Response) => { // Define types for req and res
    try {
        const allAuthors = await authorClient.findMany({});

        res.status(200).json({ data: allAuthors });
    } catch (e) {
        console.log(e);
    }
};

// getPostById
export const getAuthorbyId = async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id, 10); // assuming id is a number // authorId is already a string
        const author = await authorClient.findUnique({
            where: {
                id: authorId,
            },
        });

        res.status(200).json({ data: author });
    } catch (e) {
        console.log(e);
    }
};



// createPost
export const createAuthor = async (req: Request, res: Response) => {
    interface Post {
        id: string;
        title: string;
        hashtag: string;
        upvotes: number;
        description?: string;
    }

    try {
        const { name, email, posts } = req.body;

        // Prepare connectOrCreate logic only if posts are provided
        const postsConnectOrCreate = Array.isArray(posts) ? posts.map((post: Post) => ({
            where: { id: post.id },
            create: { 
                title: post.title,
                hashtag: post.hashtag,
                upvotes: post.upvotes,
                description: post.description // this is optional
            }
        })) : undefined;

        const authorData: any = {
            name,
            email
        };

        if (postsConnectOrCreate) {
            authorData.posts = {
                connectOrCreate: postsConnectOrCreate
            };
        }

        const author = await authorClient.create({
            data: authorData,
        });

        res.status(201).json({ data: author });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// updatePost
export const updateAuthor = async (req: Request, res: Response) => { // Define types for req and res
    try {
        const authorId = parseInt(req.params.id, 10);
        const authorData = req.body;
        const author = await authorClient.update({
            where: {
                id: authorId
            },
            data: authorData
        });

        res.status(201).json({ data: author });
    } catch (e) {
        console.log(e);
    }
};

// deletePost
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.params.id, 10); // postId is already a string
        const author = await authorClient.delete({
            where: {
                id: authorId
            },
        });

        res.status(200).json({ data: {} });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Invalid id" });
    }
};