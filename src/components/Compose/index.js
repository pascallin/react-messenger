import React, { useState, useContext } from "react";
import "./Compose.css";
import { WsContext } from "../../contexts/ws";

export default function Compose(props) {
  const [message, setMessage] = useState("");
  const onEnter = (e) => {
    if (e.key === "Enter") {
      console.log(message);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(message);
      }
    }
  };

  const ws = useContext(WsContext);

  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        onKeyDown={onEnter}
        onChange={(e) => setMessage(e.target.value)}
      />

      {props.rightItems}
    </div>
  );
}
