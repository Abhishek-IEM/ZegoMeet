import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function VideoRoom() {
  let { roomID } = useParams();
  const meetingContainerRef = useRef(null); 

  useEffect(() => {
    const appID = Number(import.meta.env.VITE_APP_ID);
    const serverSecret = import.meta.env.VITE_SERVER_SECRET;

    console.log("APP ID:", appID); 
    console.log("SERVER SECRET:", serverSecret); 

    if (!appID || !serverSecret) {
      console.error("App ID or Server Secret is missing!");
      return;
    }

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Username"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: meetingContainerRef.current, 
      sharedLinks: [
        {
          name: "copy link",
          url: `https://zego-meet/room/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [roomID]); 

  return (
    <div className="video-container">
      <div ref={meetingContainerRef} /> 
    </div>
  );
}

export default VideoRoom;
