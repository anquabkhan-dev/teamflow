import { useSelector, useDispatch } from "react-redux";
import  { type RootState, type AppDispatch  } from "../../store/store"
import { toggleSidebar, setNotification } from "../../store/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectNotification, selectSideBarOpen } from "../../store/selectors";

const Dashboard = () => {

    const sideBarOpen = useAppSelector(selectSideBarOpen)
    const notification = useAppSelector(selectNotification)
    const dispatch = useAppDispatch()

    return(
        <div>
            <h1>Dashboard</h1>
            <p>Sidebar is: {sideBarOpen? "open":"closed"}</p>
            <button onClick={() => dispatch(toggleSidebar())}>Toogle SideBar</button>
            <button onClick={() => dispatch(setNotification("Project Created succesfully"))}>show notification</button>
            {
                notification && <p>{notification}</p>
            }
        </div>
    )
}

export default Dashboard;