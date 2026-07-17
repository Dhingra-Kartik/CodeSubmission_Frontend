import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function useSocket() {
  const [connectionId, setConnectionId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("connectionId", (id) => {
      setConnectionId(id);
    });

    return () => {
      socket.off("connect");
      socket.off("connectionId");
    };
  }, []);

  const setupUser = (userId) => {
    socket.emit("setUserId", userId);
  };

  const fetchConnectionId = (userId) => {
    socket.emit("getConnectionId", userId);
  };

  return {
    setupUser,
    fetchConnectionId,
    connectionId,
  };
}