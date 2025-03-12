import { CgSpinner } from "react-icons/cg";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useUser();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading, navigate])
    if (isLoading) return <CgSpinner />
    if (isAuthenticated) return children
}