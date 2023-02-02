import React from "react";
import { io } from "socket.io-client";
import { LOCAL_SOCKET_SERVER } from "../config";

export const socket = io(LOCAL_SOCKET_SERVER);
// console.log("socket", socket);
export const SocketContext = React.createContext();
