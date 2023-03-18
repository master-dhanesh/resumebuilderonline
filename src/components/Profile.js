import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { async_uploadavatar, _loading } from "../store/Actions/userActions";

const Profile = () => {
    const imgref = useRef();
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.userReducer);
    const [avatar, setAvatar] = useState(null);
    const ChangeHandler = (e) => {
        const file = e.target.files[0];
        imgref.current.src = URL.createObjectURL(file);
        setAvatar(file);
    };

    const Uploadhandler = async () => {
        const formData = new FormData();
        formData.set("avatar", avatar);
        dispatch(_loading());
        dispatch(async_uploadavatar(formData));
    };

    return isLoading ? (
        "Loading"
    ) : (
        <div>
            <h3>Profile</h3>
            <p>{JSON.stringify(user)}</p>
            <img height="200" src={user.avatar.url} alt="" />

            <div className="bg-light p-5 container mt-3">
                <input type="file" onChange={ChangeHandler} />
                <button onClick={Uploadhandler} className="btn btn-success">
                    Upload Image
                </button>
                <hr />
                <img ref={imgref} width="100" src="" alt="" /> <br />
            </div>
        </div>
    );
};

export default Profile;
