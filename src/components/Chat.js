import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3030/");

const Chat = () => {
    const [online, setOnline] = useState([]);
    const [user, setUser] = useState("");
    const [showBox, setShowBox] = useState(true);
    const [message, setMessage] = useState("");
    const [recievedMessage, setRecievedMessage] = useState([]);
    useEffect(() => {
        socket.on("get users", (data) => {
            setOnline(data);
        });
        socket.on("new message", (data) => {
            setRecievedMessage(data);
        });
    }, []);

    const UserHandler = (e) => {
        e.preventDefault();
        socket.emit("new user", user);
        setShowBox(false);
    };

    const MessageHandler = (e) => {
        e.preventDefault();
        socket.emit("send message", message);
        socket.on("new message", (data) => {
            setRecievedMessage(data);
        });
    };

    return (
        <div className="container mt-5 bg-light p-5">
            {showBox ? (
                <form onSubmit={UserHandler}>
                    <h1 className="f-1 fw-light mb-5">Add User</h1>

                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                    <button>Go Online</button>
                </form>
            ) : (
                <div>
                    <ul className="alert alert-success w-25 ">
                        {online.map((u, i) => (
                            <li className="ps-3" key={i}>
                                {u}
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <form onSubmit={MessageHandler}>
                        <h1 className="f-1 fw-light mb-5">Chats</h1>

                        <input
                            type="text"
                            placeholder="Enter Message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button>Send Message</button>
                    </form>
                    <hr />
                    <div>
                        {recievedMessage.map((m, i) => (
                            <p key={i}>
                                <strong>{m.user}:</strong>
                                <span>{m.msg}</span>
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
