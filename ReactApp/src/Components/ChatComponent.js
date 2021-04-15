import firebase from "firebase/app";
import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from 'react-router-dom';
import "../Chat.css";

const ChatComponent = (props) => {
  const db = firebase.firestore();

  const messagesRef = db
    .collection("messages")
    .doc(props.topic)
    .collection("chats");
  const query = messagesRef.orderBy("createdAt").limit(25);

  function ChatMessage(props) {
    const { text, uid } = props.message;

    const messageClass = uid === sessionStorage.uid ? "sent" : "received";

    return (
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    );
  }

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = sessionStorage.uid;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setFormValue("");
  };

  const returnToConvsHandler = () => {
      
  }

  return (
    <>
      <Link to="/menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
          onClick={returnToConvsHandler}
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
      </Link>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage} className="forms">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />

        <button type="submit" className="send">
          Send
        </button>
      </form>
    </>
  );
};

export default ChatComponent;
