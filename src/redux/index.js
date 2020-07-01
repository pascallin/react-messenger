import { createStore } from "redux";

const SET_MESSAGE_LIST = "SET_MESSAGE_LIST";
const ADD_TO_MESSAGE_LIST = "ADD_TO_MESSAGE_LIST";

/** payload format:
 * { author, id, message, timestamp }
 */
const initialState = {
  messageList: [],
};

export function setMessageList(list) {
  return {
    type: SET_MESSAGE_LIST,
    list,
  };
}
export function addToMessageList(payload) {
  return {
    type: ADD_TO_MESSAGE_LIST,
    payload,
  };
}

export const messageListSelector = (state) => state.messageList;

function reducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case SET_MESSAGE_LIST:
      return Object.assign({}, state, {
        messageList: action.list,
      });
    case ADD_TO_MESSAGE_LIST:
      return Object.assign({}, state, {
        messageList: state.messageList.concat([action.payload]),
      });
    default:
      return state;
  }
}

export const store = createStore(reducer);
