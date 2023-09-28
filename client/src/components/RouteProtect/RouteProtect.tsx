import { useSelector } from "react-redux";
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import Admin from "../../pages/admin/admin";
import ProfileUser from "../../pages/profile/ProfileUser";

export const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    function IsAuthenticated() {
        const handleLoginAndCart = useSelector((state: RootState) => state.auth)
        if (handleLoginAndCart.token && handleLoginAndCart.user.role === "admin") {
            return true
        }
        return false;
    }
    if (IsAuthenticated()) {
        return <div><Admin>{children}</Admin></div>;
    } else {
        return <Navigate to="/admin/login" />;
    }
};
export function ProtectedUserRoute({ children }: { children: React.ReactNode }) {
    function IsAuthenticated() {
        const handleLoginAndCart = useSelector((state: RootState) => state.auth)
        if (handleLoginAndCart.token) {
            return true
        }
        return false;
    }

    if (IsAuthenticated()) {
        return <div>{children}</div>;
    } else {
        return <Navigate to="/account/login" />;
    }
}
