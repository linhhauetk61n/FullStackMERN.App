import { PostContext } from "../../contexts/PostContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SinglePost from "../layout/posts/SinglePost";
import AddPostModal from "../layout/posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg";
import ToastMessage from "../layout/posts/ToastMessage";
import UpdatePostModal from "../layout/posts/UpdatePostModal";

const Dashboard = () => {
    //Contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const {
        postState: { post, posts, postsLoading },
        getPosts,
        handleShow,
        // showToast: { show, message, type },
        // setShowToast,
    } = useContext(PostContext);

    //START: get all post
    useEffect(() => getPosts(), []);
    let body = null;
    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to
                            learn
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className="my-2">
                                <SinglePost post={post} />
                            </Col>
                        );
                    })}
                </Row>
                {/* Open Add Post Modal */}
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>Add a new thing to learn!</Tooltip>}
                >
                    <Button className="btn-floating" onClick={handleShow}>
                        <img
                            src={addIcon}
                            alt="add-post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }
    return (
        <>
            {body}
            {post !== null && <UpdatePostModal />}
            <AddPostModal />
            <ToastMessage />
        </>
    );
};

export default Dashboard;
