import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
    apiUrl,
    POSTS_LOADED_FAIL,
    POSTS_LOADED_SUCCESS,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {
    //State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true,
    });
    //Show Hide Modal Post
    const [showAddPostModal, setShowAddPostModel] = useState(false);
    const handleHide = () => setShowAddPostModel(false);
    const handleShow = () => setShowAddPostModel(true);
    //Show Hide Update Modal Post
    const [showUpdatePostModal, setShowUpdatePostModel] = useState(false);
    const handleUpdatePost = (status) => setShowUpdatePostModel(status);

    //Show Hide Toast Message
    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        type: null,
    });
    const hideToast = () => {
        setShowToast({
            show: false,
            message: "",
            type: null,
        });
    };
    //Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL });
        }
    };
    //Add Post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };
    //Delete Post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };
    //Find post when user updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        // console.log(`Post is finded: ${post}`);
        dispatch({ type: FIND_POST, payload: post });
    };
    //Update Post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
            );
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    //Posts context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        handleShow,
        handleHide,
        showUpdatePostModal,
        setShowUpdatePostModel,
        handleUpdatePost,
        addPost,
        showToast,
        setShowToast,
        hideToast,
        deletePost,
        findPost,
        updatePost,
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};
export default PostContextProvider;
