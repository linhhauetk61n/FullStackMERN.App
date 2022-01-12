import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { PostContext } from "../../../contexts/PostContext";

const AddPostModal = () => {
    //Contexts
    const { showAddPostModal, handleHide, addPost, setShowToast } =
        useContext(PostContext);
    const hideModal = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO_LEARN",
        });
        handleHide();
    };
    //State
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "TO_LEARN",
    });
    const { title, description, url } = newPost;
    const onChangeNewPostForm = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value });
    };
    //Submit
    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        hideModal();
        setShowToast({
            show: true,
            message,
            type: success ? "success" : "danger",
        });
    };
    return (
        <Modal show={showAddPostModal} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            rows="3"
                            name="description"
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModal;
