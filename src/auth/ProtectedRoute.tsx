import { useAuth } from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom"
import UnautharizedPage from "./UnauthorizedPage"

type RoutesProps = {
    "allowedRoles": Array<string>
}

const ProtectedRoute = ({allowedRoles}: RoutesProps) => {
    const {isAuthenticated, user }  = useAuth()

    if(!isAuthenticated){
       return <Navigate to="/login" />
    }

    if(!user || !allowedRoles.includes(user.role)){
        return <UnautharizedPage />
    }

    return <Outlet />
}
export default ProtectedRoute