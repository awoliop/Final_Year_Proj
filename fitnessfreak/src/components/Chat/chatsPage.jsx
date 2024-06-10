import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";
import React from "react";

const chatsPage = (props) => {
  const chatprops = useMultiChatLogic(
    "01c1763d-64b7-4d59-8cda-5a07ec370f8f",
    props.user.username,
    props.user.secret
  );
  return (
    <div style={{ height: "100vh", backgroundColor: "black" }}>
      <MultiChatSocket {...chatprops} />
      <MultiChatWindow {...chatprops} style={{ height: "100%" }} />
    </div>
  );
};

export default chatsPage;
