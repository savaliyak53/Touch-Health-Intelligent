import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AuthContext, { AuthContextData } from "contexts/AuthContext";
import SocketContext from "../contexts/SocketContext";
import { socketMessageType, socketNotificationTypes } from "interfaces";
import DashboardContext from "contexts/DashboardContext";
import { socketPath } from "./../constants";
import { conditionDimensionsInfluencer, lifestyleDimensionsInfluencer } from "helpers/socketHelper";

const ENDPOINT = process.env.REACT_APP_SOCKET_HOST || "";

const useSocket = () => {
  const dashboardNotification: any = useRef();
  const contextData = useContext(SocketContext) as any;
  const { setDashboardNotification, setLoading } = contextData;
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const sessionId = context?.session ?? localStorage.getItem('sessionId');
  const dashboardContextData = useContext(DashboardContext) as any;
  const contextRef: any = useRef(dashboardContextData);

  useEffect(() => {
    contextRef.current = dashboardContextData
  },[dashboardContextData])

  dashboardNotification.current = (message: socketNotificationTypes) => {
    try {
      setDashboardNotification(message);
    } catch (error) {
      console.error("🔴 Error getting dashboard info " + error);
    }
  };

  const dashboardEventHandler = (message:any) => {
    switch(message.payload.path) {
      case socketPath.LIFESTYLE_DIMENSION_INFLUENCERS:
        lifestyleDimensionsInfluencer(message.payload.body, contextRef.current)
        break;
      case socketPath.CONDITON_DIMENSION_INFLUENCERS: 
        conditionDimensionsInfluencer(message.payload.body, contextRef.current)
        break;
      default:
        break;
    }
  }

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
        dashboardEventHandler(message);
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
