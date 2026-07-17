import { io } from "socket.io-client";
const VITE_SOCKET_SERVICE = import.meta.env.VITE_SOCKET_SERVICE;

const socket = io(`${VITE_SOCKET_SERVICE}`, {
  transports: ["websocket"],
});

export default socket;