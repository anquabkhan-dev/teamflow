import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import Sidebar from "../components/Sidebar/Sidebar"
import { useAuth } from "../auth/AuthContext"
import { useAppSelector } from "../store/hooks"
import { selectNotification } from "../store/selectors"


const AppLayouts = () => {
    const {logout} = useAuth()
    const notification = useAppSelector(selectNotification)


    return(
        <>
            <Header />

            {
                notification && <div>{notification}</div>
            }

            <Sidebar />

            <main>
                <Outlet />
            </main>

            <button onClick={logout}>Logout</button>
        </>
    )
}
export default AppLayouts