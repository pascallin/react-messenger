import React, { useRef, useEffect, useState } from "react";
import Messenger from "../Messenger";
import { WsContext } from "../../contexts/ws";

export default function App() {
  const [isPaused] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/echo");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(
    () => {
      if (!ws.current) return;

      ws.current.onmessage = (message) => {
        if (isPaused) return;
        console.log(message.data);
        let data;
        try {
          data = JSON.parse(message.data);
          console.log("receive json message");
        } catch (e) {
          console.log("receive non json message");
          data = message.data;
        }
        console.log("receive message: ", data);
      };
    },
    [isPaused]
  );

  return (
    <div className="App">
      <WsContext.Provider value={ws}>
        <Messenger />
      </WsContext.Provider>
    </div>
  );
}
