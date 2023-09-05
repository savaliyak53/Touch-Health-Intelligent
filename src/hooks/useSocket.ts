import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import AuthContext, { AuthContextData } from "contexts/AuthContext";
import SocketContext from "../contexts/SocketContext";
import { socketMessageType, socketNotificationTypes } from "interfaces";

const ENDPOINT = process.env.REACT_APP_SOCKET_HOST || "";

const useSocket = () => {
  const dashboardNotification: any = useRef();
  const socketMessage: any = useRef();

  const contextData = useContext(SocketContext) as any;
  const { setDashboardNotification, setSocketMessage, setLoading } = contextData;
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const sessionId = context?.session ?? localStorage.getItem('sessionId')

  dashboardNotification.current = (message: socketNotificationTypes) => {
    try {
      setDashboardNotification(message);
    } catch (error) {
      console.error("🔴 Error getting dashboard info " + error);
    }
  };

  socketMessage.current = (message: socketMessageType) => {
    try {
      setSocketMessage(message);
    } catch (error) {
      console.error("🔴 Error getting socket message " + error);
    }
  };

  useEffect(() => {
    if (!sessionId ) {
      return;
    }

    const initSession = async () => {
      const socket = io(ENDPOINT, {
        path: "/socket.io",
        forceNew: true,
        reconnectionAttempts: 3,
        timeout: 2000,
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('🟢 Socket connected');
        setLoading(false);
      });

      socket.on('info', (message: socketNotificationTypes) => {
        console.log('Server info: ', message)
        dashboardNotification.current(message);
      });
      
      socket.on('message', (message: socketMessageType) => {
        console.log('Server message: ', message)
        socketMessage.current(message);
      });

      socket.on('error', (message: socketNotificationTypes) => {
        console.log('Server error: ', message);
        dashboardNotification.current(message);
      });

      socket.on('disconnect', () => {
        console.log('🔴 Socket disconnected');
        setLoading(true);
      });
    }
    initSession();
  }, [sessionId]);
}

export default useSocket;
