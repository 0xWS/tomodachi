import React, { createContext, ReactNode, useContext } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

type NotificationType = 'info' | 'success' | 'error' | 'warning';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, options?: ToastOptions) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
    children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const showNotification = (message: string, type: NotificationType = 'info', options?: ToastOptions) => {
        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'success':
                toast.error(message, options);
                break;
            case 'success':
                toast.warning(message, options);
                break;
            default:
                toast.info(message, options);
        }
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider context');
    }
    return context;
}

export default NotificationProvider;