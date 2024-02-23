import BlogPost from '../models/blog.model.js';

// Create new blog
export const createBlog = async (req, res) => {
    try {
        const blog = new BlogPost(req.body);
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find({});
        res.send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a blog with the ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update the blog with the ID
export const updateBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete the blog with the ID
export const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Likes
export const incrementLikes = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        blog.likes += 1;
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Dislikes
export const incrementDislikes = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        blog.dislikes += 1;
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Favorites
export const incrementFavorites = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        blog.favorites += 1;
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
};