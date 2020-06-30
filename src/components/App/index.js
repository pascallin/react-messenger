import React, { useRef, useEffect } from "react";
import Messenger from "../Messenger";
import { WsContext } from "../../contexts/ws";
import { WebSocketInstance } from "../../libs/websocket";

export default function App() {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocketInstance();
    ws.current.connect();
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
