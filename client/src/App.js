import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import Dashboard from "./components/views/Dashboard";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./components/views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route
                            exact
                            path="/login"
                            element={<Auth authRoute="login" />}
                        />
                        <Route
                            exact
                            path="/register"
                            element={<Auth authRoute="register" />}
                        />
                        <Route
                            exact
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/about"
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            }
                        />
                        {/* <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
                <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} /> */}
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
