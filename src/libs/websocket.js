export class WebSocketInstance {
  connect(options) {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_SERVER_HOST}:${
        process.env.REACT_APP_SERVER_PORT
      }/communication`
    );
    this.ws = ws;
    ws.onopen = () => console.log("ws opened");
    ws.onclose = () => {
      console.log("ws closed");
      // Try to reconnect in 5 seconds
      setTimeout(() => {
        this.connect();
      }, 5000);
    };
    ws.onmessage = (message) => {
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
      if (options.receiveHookFunc) {
        options.receiveHookFunc(data);
      }
    };
  }
  close() {
    this.ws.close();
  }
  send(message) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }
}
