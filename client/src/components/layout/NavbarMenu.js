import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);
    const logout = () => logoutUser();

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Navbar.Brand className="font-weight-bolder text-white mx-5">
                <img
                    src={learnItLogo}
                    alt="learnItLogo"
                    width="32"
                    height="32"
                    className="mr-2"
                />
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/dashboard"
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/about"
                        as={Link}
                    >
                        About
                    </Nav.Link>
                </Nav>
                <Nav className="px-2">
                    <Nav.Link className="font-weight-bolder text-white" disable>
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        className="font-weight-bolder text-white"
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="learnItLogoutLogo"
                            width="32"
                            height="32"
                            className="mr-4"
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarMenu;
