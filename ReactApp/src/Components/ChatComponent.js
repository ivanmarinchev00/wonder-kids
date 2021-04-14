import firebase from "firebase/app";
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import '../Chat.css';

const ChatComponent = props =>{
    const db = firebase.firestore();

    const messagesRef = db.collection('messages').doc('biology').collection('chats')
    const query = messagesRef.orderBy('createdAt').limit(25);

    function ChatMessage(props) {
        const { text, uid } = props.message;

        const messageClass = uid === sessionStorage.uid ? 'sent' : 'received';

        return (
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
        )
    }

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState('')

    const sendMessage = async(e) => {
        e.preventDefault();

        const uid = sessionStorage.uid;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setFormValue('')
    }

    return (
    
        <>
        <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </div>

        <form onSubmit={sendMessage} className='forms'>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

            <button type="submit" className='send'>Send</button>
        </form>
        </>
    );
}

export default ChatComponent;