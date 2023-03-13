import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { async_loaduserAction } from "./store/Actions/userActions";
import { toast } from "react-toastify";
const App = () => {
    const { apperror } = useSelector((state) => state.userReducer);
    console.log(apperror);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(async_loaduserAction());
    }, []);

    if (apperror.length > 0) {
        apperror.forEach((err) => toast.error(err));
    }

    return <div>App</div>;
};

export default App;
