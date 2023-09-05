import { socketMessageType, socketNotificationTypes } from 'interfaces';
import { createContext, useState } from 'react';

const SocketContext = createContext({});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({children}:any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboardNotification, setDashboardNotification] = useState<socketNotificationTypes | null>();
  const [socketMessage, setSocketMessage] = useState<socketMessageType | null>(null);
  // console.log("Socket message received: ", socketMessage);

  const contextValue = {
    dashboardNotification,
    setDashboardNotification,
    setLoading,
    socketMessage,
    setSocketMessage,
  };
  
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SocketContext.Provider value={{...contextValue}}>
      {loading ? null : children}
    </SocketContext.Provider>
  );
};

export default SocketContext;