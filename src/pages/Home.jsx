import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

function Home() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const generateRoomID = () => {
    const roomId = uuidv4().replace(/-/g, "").slice(0, 10); 
    setInput(roomId); 
  };

  const handleJoin = () => {
    if (input.trim() !== "") {
      navigate(`/room/${input}`);
    } else {
      alert("Please enter a valid Room ID!");
    }
  };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>ZegoMeet</h1>
        <p>Join an existing room or create a new one!</p>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={generateRoomID} style={{ backgroundColor: "#2196F3" }}>
          Generate Room ID
        </button>
        <button onClick={handleJoin} style={{ marginTop: "10px", backgroundColor: "#4CAF50" }}>
          Join Now
        </button>
      </div>
    </div>
  );
}

export default Home;
