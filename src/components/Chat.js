import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3030/");

const Chat = () => {
    //Room State
    const [room, setRoom] = useState("");
    const [showUser, setShowUser] = useState(true);
    const [online, setOnline] = useState([]);

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);

    const joinRoom = () => {
        if (room !== "") {
            setShowUser(false);
            socket.emit("new user", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send message", message);
        socket.on("new message", (data) => {
            setMessageReceived([...messageReceived, data]);
        });
    };

    useEffect(() => {
        socket.on("get users", function (data) {
            setOnline(data);
        });
    }, []);
    return (
        <div className="App">
            <div className="alert alert-success w-25">
                <ul>
                    {online.length > 0
                        ? online.map((user, i) => <li key={i}>{user}</li>)
                        : ""}
                </ul>
            </div>

            {showUser && (
                <>
                    <input
                        placeholder="User Name"
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join Chat</button>
                </>
            )}

            <input
                placeholder="Message..."
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}> Send Message</button>
            <h1> Message:</h1>
            {messageReceived.map((m, i) => (
                <p key={i}>
                    <strong>{m.user}:</strong>
                    {m.msg}
                </p>
            ))}
        </div>
    );
};

export default Chat;
