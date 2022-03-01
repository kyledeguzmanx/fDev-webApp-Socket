import React, { useState, useEffect } from 'react';


function Chat({socket, username, room}){
    const [currentMessage, setCurrentMessage] = useState("");
    const SendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":"  + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
        }
    };
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        })
        
    }, [socket]);
    return(
        <div>
            <p> You are in Room ID {room}</p>
            <div className="chat-header">
                <p> Live Chat</p>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Enter message" onChange={(event) => {setCurrentMessage(event.target.value)}}></input>
                <button onClick={SendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat;