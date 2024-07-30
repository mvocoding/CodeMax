import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

interface Props{
    element: ReactNode;
    isPublic ?: boolean;
}

export const ProtectedRoute: React.FC<Props> = ({ element, isPublic = false }) => {
    const { currentUser } = useApp();
    const isAuthenticated = !!currentUser?.profile.username;

    if (isPublic && isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    if (!isPublic && !isAuthenticated) {
      return <Navigate to="/signin" />;
    }
  
    return <>{element}</>;
  
};
