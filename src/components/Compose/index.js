import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import "./Compose.css";
import { WsContext } from "../../contexts/ws";
import { addToMessageList } from "../../redux";

export default function Compose(props) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ws.current.send(message);
      // NOTE: fake mock data
      dispatch(
        addToMessageList({
          id: "fakeID",
          author: "pascal",
          message,
          timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
      );
      e.currentTarget.value = "";
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
