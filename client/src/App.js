import io from 'socket.io-client'; //used to backend to front end
import {useState} from 'react';
import Chat from './Components/Chat'

const socket = io.connect("http://localhost:3001")

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
      if(username !== "" && room !== ""){
        socket.emit("join_room", room);
        setShowChat(true);
      }
    }
  return (
    <div className="App">
      { !showChat ?
        (<section className='joinChat'>
          <h3>Join a Chatroom</h3>
          <input type="text" placeholder="Enter name" onChange = {(event) => {setUsername(event.target.value);}}></input>
          <input type="text" placeholder="Enter Room ID" onChange = {(event) => {setRoom(event.target.value);}}></input>
          <button onClick={joinRoom}>Join A Room</button>
        </section>)
      : 
        (<Chat socket={socket} username={username} room={room}/>)
      }
    </div>
  );
}

export default App;
