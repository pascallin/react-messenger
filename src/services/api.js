import { createInstance } from "../libs/apiClient";

class APIService {
  constructor() {
    this.apiClient = createInstance({
      baseURL: `http://${process.env.REACT_APP_SERVER_HOST}:${
        process.env.REACT_APP_SERVER_PORT
      }`,
    });
  }
  getMessages() {
    return this.apiClient.get("/messages");
  }
  getMessengers() {
    return this.apiClient.get("/messengers");
  }
}

export const apiService = new APIService();
