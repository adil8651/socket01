import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://192.168.1.13:3000");

const App = () => {
  const [message, setMessage] = useState("");
  const [id01, setId01] = useState("00");
  const [id02, setId02] = useState("00");
  const [room, setRoom] = useState("0000");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on(
      "connect",
      () => {
        console.log(socket.id);
        socket.emit("room", room);
      },
      []
    );
  });
  useEffect(() => {
    socket.on("message", (message) => {
      let newChat = {
        who: "other",
        message: message,
      };
      setChat([...chat, newChat]);
    });
  });
  useEffect(() => {
    setRoom(`${id01}${id02}`);
    socket.emit("room", room);
  }, [id01, id02, room]);
  const handleSubmit = () => {
    let newChat = {
      who: "me",
      message: message,
    };
    setChat([...chat, newChat]);
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 position-relative">
      <div className="col-md-6 col-12 position-sticky bottom-0 px-3">
        <h4 className="text-success">Room id: {room}</h4>
        <div className="input-group">
          <select
            name="id01"
            id="id01"
            className="form-select bg-light"
            value={id01}
            onChange={(e) => setId01(e.target.value)}
          >
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
          </select>
          <select
            name="id02"
            id="id02"
            className="form-select bg-light"
            value={id02}
            onChange={(e) => setId02(e.target.value)}
          >
            <option value="00">00</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="chat-box bg-light rounded p-3">
          <div className="d-flex flex-column h-100 w-100 justify-content-end">
            {chat.map((chat, index) => (
              <div key={index} className="d-flex flex-column">
                <p
                  className={`m-0 px-3 py-2 bg-info rounded mb-2 ${
                    chat.who === "me" ? "align-self-end" : "align-self-start"
                  }`}
                >
                  {chat.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="input-group">
          <input
            type="text"
            name="message"
            id="message"
            className="form-control bg-light"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="btn btn-success input-group-text"
            onClick={() => handleSubmit()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
