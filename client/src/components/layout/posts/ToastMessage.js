import Toast from "react-bootstrap/Toast";
import { useContext } from "react";
import { PostContext } from "../../../contexts/PostContext";

const ToastMessage = () => {
    const {
        showToast: { show, message, type },
        hideToast,
    } = useContext(PostContext);
    return (
        <Toast
            show={show}
            className={`bg-${type} text-white`}
            style={{
                position: "fixed",
                top: "10%",
                right: "10px",
                width: "200px",
            }}
            onClose={hideToast}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    );
};

export default ToastMessage;
