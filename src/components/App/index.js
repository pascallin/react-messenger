import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import Messenger from "../Messenger";
import { WsContext } from "../../contexts/ws";
import { WebSocketInstance } from "../../libs/websocket";
import { addToMessageList } from "../../redux";

export default function App() {
  const ws = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ws.current = new WebSocketInstance();
    ws.current.connect({
      // NOTE: fake mock data
      receiveHookFunc: (message) =>
        dispatch(
          addToMessageList({
            id: "fakeId",
            author: "system",
            message,
            timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
          })
        ),
    });
    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <div className="App">
      <WsContext.Provider value={ws}>
        <Messenger />
      </WsContext.Provider>
    </div>
  );
}
