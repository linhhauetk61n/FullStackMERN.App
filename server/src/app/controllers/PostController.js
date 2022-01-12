const Post = require("../models/Post");

class PostController {
    //[POST] apt/posts
    async post(req, res) {
        const { title, description, url, status } = req.body;

        //Simple validation
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: "Title is required" });
        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith("https://") ? url : `https://${url}`,
                status: status || "TO_LEARN",
                user: req.userId,
            });

            await newPost.save();
            res.json({
                success: true,
                message: "Happy learning",
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    // [GET] apt/posts
    async get(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate(
                "user",
                ["username"]
            );
            res.json({ success: true, posts });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // [PUT] apt/posts/:id
    async update(req, res) {
        const { title, description, url, status } = req.body;
        //Simple validation
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: "Title is required" });
        try {
            let updatedPost = {
                title,
                description: description || "",
                url:
                    (url.startsWith("https://") ? url : `https://${url}`) || "",
                status: status || "",
            };
            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            updatedPost = await Post.findOneAndUpdate(
                postUpdateCondition,
                updatedPost,
                { new: true }
            );
            // User not authorised to update post or post not found
            if (!updatedPost)
                return res.status(401).json({
                    success: false,
                    message: "Post not found or User not authorised",
                });

            res.json({
                success: true,
                message: "Updated Post",
                post: updatedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    // [DELETE] apt/posts/:id
    async delete(req, res) {
        try {
            const postDeleteCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const deletedPost = await Post.findOneAndDelete(
                postDeleteCondition
            );

            //User not authorised or Post not found
            if (!deletedPost)
                return res.status(401).json({
                    success: false,
                    message: "Post not found or User not authorised",
                });
            res.json({
                success: true,
                message: "Deleted Post",
                post: deletedPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}
module.exports = new PostController();
