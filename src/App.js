import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { async_loaduserAction } from "./store/Actions/userActions";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Forget from "./components/Forget";
import Profile from "./components/Profile";
import ProtectedRoute from "./helpers/ProtectedRoute";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(async_loaduserAction());
    }, []);

    return (
        <div>
            <Navigation />
            <hr />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/forget" element={<Forget />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
