import { createContext, useState, useEffect } from 'react';

import {io} from "socket.io-client";

export interface SocketContextData {
    dashboardNotification: any
}

const ENDPOINT = '' + process.env.REACT_APP_SOCKET_HOST;

const SocketContext = createContext<SocketContextData>({dashboardNotification: {}});
export default SocketContext;

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ 
    // eslint-disable-next-line react/prop-types
    children,}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dashboardNotification, setDashboardNotification] = useState({});

    useEffect(() => {
        const socket = io(ENDPOINT, {
          path: "/socket.io", forceNew: true, reconnectionAttempts: 3, timeout: 2000, withCredentials: true
        });
      
        socket.on('message', (data:any) => {
          setDashboardNotification(data)
        });
      }, []);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <SocketContext.Provider value={{dashboardNotification}}>
          {loading ? null : children}
        </SocketContext.Provider>
    );
};