import { createInstance } from "../libs/apiClient";

class APIService {
  constructor() {
    this.apiClient = createInstance({ baseURL: "http://localhost:8080" });
  }
  getMessages() {
    return this.apiClient.get("/messages");
  }
  getMessengers() {
    return this.apiClient.get("/messengers");
  }
}

export const apiService = new APIService();
