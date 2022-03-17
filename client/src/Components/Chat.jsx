import React, { useState, useEffect } from 'react';


function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const SendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":"  + new Date(Date.now()).getMinutes()
            }
            setMessageList((list) => [...list, messageData]);
            await socket.emit("send_message", messageData);
        }
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        })
        
    }, [socket]);
    return(
        <div className="chatroomActive">
            <h1> Room ID {room.toLowerCase()}</h1>
            <div className="chat-header">
                <p> Live Chat</p>
            </div>
            <div className="chat-body">
                {
                    messageList.map((messageContent) => {
                        return <p>{messageContent.author}: {messageContent.message}</p>
                    })
                }
            </div>
            <div className="chat-footer">
                <input id="room-submit-btn" type="text" placeholder="Enter message" onChange={(event) => {setCurrentMessage(event.target.value)}}></input>
                <button onClick={SendMessage} >&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;