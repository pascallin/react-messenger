export const roll = () => {
  console.log("rolling");
  var div = document.getElementById("message-list");
  // NOTE: check div has been rendered
  if (div) {
    div.scrollTop = div.scrollHeight;
  }
};
