import { Request, Response } from 'express'; // Import Request and Response types from Express
import { PrismaClient } from '@prisma/client';

const postClient = new PrismaClient().post;



// getAllPosts
export const getAllPosts = async (req: Request, res: Response) => { // Define types for req and res
    try {
        const allPosts = await postClient.findMany({});

        res.status(200).json({ data: allPosts });
    } catch (e) {
        console.log(e);
    }
};

// getPostById
export const getPostbyId = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id; // postId is already a string
        const post = await postClient.findUnique({
            where: {
                id: postId,
            },
        });

        res.status(200).json({ data: post });
    } catch (e) {
        console.log(e);
    }
};



// createPost
export const createPost = async (req: Request, res: Response) => { // Define types for req and res
    interface Author {
        id: string;
        name: string;
    }
    try {
        const { title, description, author, authorId } = req.body;

        const authorConnectOrCreate = author.map((authors: Author) => ({
            where: { id: authors.id },
            create: { name: authors.name }
        }));

        const post = await postClient.create({
            data: {
                title,
                description,
                author: {
                    connectOrCreate: authorConnectOrCreate
                },
                authorId
            },
        });

        res.status(201).json({ data: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// updatePost
export const updatePost = async (req: Request, res: Response) => { // Define types for req and res
    try {
        const postId = req.params.id;
        const postData = req.body;
        const post = await postClient.update({
            where: {
                id: postId
            },
            data: postData
        });

        res.status(201).json({ data: post });
    } catch (e) {
        console.log(e);
    }
};

// deletePost
export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id; // postId is already a string
        const post = await postClient.delete({
            where: {
                id: postId
            },
        });

        res.status(200).json({ data: {} });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Invalid id" });
    }
};

